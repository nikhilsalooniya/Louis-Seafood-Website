import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'whatweoffer' }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    await pool.query(
      'INSERT INTO whatweoffer (title, description, image_url) VALUES ($1, $2, $3)',
      [title, description, imageUrl]
    );

    return NextResponse.json({ message: 'Offer added successfully!', imageUrl }, { status: 201 });
  } catch (err) {
    console.error('Error uploading image or inserting into database:', err);
    return NextResponse.json({ error: 'Database or Upload error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM whatweoffer');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching from database:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
