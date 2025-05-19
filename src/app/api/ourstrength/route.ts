import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

// PostgreSQL config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const mainHeading = formData.get('mainHeading') as string;

    // Get 2 images
    const image1 = formData.get('image1') as File;
    const image2 = formData.get('image2') as File;

    if (!image1 || !image2 || typeof image1 === 'string' || typeof image2 === 'string') {
      return NextResponse.json({ error: 'Invalid image files' }, { status: 400 });
    }

    // Convert images to buffers
    const buffer1 = Buffer.from(await image1.arrayBuffer());
    const buffer2 = Buffer.from(await image2.arrayBuffer());

    // Upload image1 to Cloudinary
    const uploadImage1 = new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'our_strength' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer1);
    });

    // Upload image2 to Cloudinary
    const uploadImage2 = new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'our_strength' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer2);
    });

    // Await both uploads
    const [result1, result2] = await Promise.all([uploadImage1, uploadImage2]);

    const image1Url = result1.secure_url;
    const image2Url = result2.secure_url;

    // Get 4 subheadings and descriptions
    const subHeadings = [
      formData.get('subHeading1') as string,
      formData.get('subHeading2') as string,
      formData.get('subHeading3') as string,
      formData.get('subHeading4') as string,
    ];

    const subDescriptions = [
      formData.get('subDescription1') as string,
      formData.get('subDescription2') as string,
      formData.get('subDescription3') as string,
      formData.get('subDescription4') as string,
    ];

    await pool.query(
      `INSERT INTO our_strength (
        main_heading, image1_url, image2_url,
        subheading1, subdescription1,
        subheading2, subdescription2,
        subheading3, subdescription3,
        subheading4, subdescription4
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        mainHeading,
        image1Url,
        image2Url,
        subHeadings[0],
        subDescriptions[0],
        subHeadings[1],
        subDescriptions[1],
        subHeadings[2],
        subDescriptions[2],
        subHeadings[3],
        subDescriptions[3],
      ]
    );

    return NextResponse.json({ message: 'Our Strength section added successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM our_strength');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching data:', err);
    return NextResponse.json({ error: 'Failed to fetch Our Strength data' }, { status: 500 });
  }
}
