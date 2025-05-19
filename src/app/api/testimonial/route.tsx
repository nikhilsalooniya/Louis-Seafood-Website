import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST: Add a testimonial
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const comment = formData.get('comment') as string;
    const file = formData.get('image') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload image to Cloudinary
    const uploadedImage = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'testimonials' },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadedImage.secure_url;

    // Insert testimonial into DB
    await pool.query(
      'INSERT INTO testimonials (name, comment, image_url) VALUES ($1, $2, $3)',
      [name, comment, imageUrl]
    );

    return NextResponse.json({ message: 'Testimonial added successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// GET: Fetch all testimonials
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY id DESC');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching from database:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
