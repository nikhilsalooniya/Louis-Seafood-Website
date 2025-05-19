import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // for Neon
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const heading = formData.get('heading') as string;
    const subheading = formData.get('subheading') as string;
    const file = formData.get('video') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid video file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload video to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'hero_videos', // optional folder
          public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`, // optional unique id without extension
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const videoUrl = uploadResult.secure_url;

    await pool.query(
      'INSERT INTO hero_section2 (heading, subheading, video_url) VALUES ($1, $2, $3)',
      [heading, subheading, videoUrl]
    );

    return NextResponse.json({ message: 'Hero section saved successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database or uploading video:', err);
    return NextResponse.json({ error: 'Database or upload error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM hero_section2 ORDER BY id DESC LIMIT 1');
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error('Error fetching from database:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
