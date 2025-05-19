import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const heading = formData.get('heading') as string;
    const description = formData.get('description') as string;
    const file = formData.get('video') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid video file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload video to Cloudinary
    const uploadedVideo = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'hero_videos',
          resource_type: 'video',
          public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}`,
        },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    const videoUrl = uploadedVideo.secure_url;

    // Insert into DB
    await pool.query(
      'INSERT INTO whoarewe (heading, description, video_url) VALUES ($1, $2, $3)',
      [heading, description, videoUrl]
    );

    return NextResponse.json({ message: 'Hero section saved successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM whoarewe ORDER BY id DESC LIMIT 1');
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error('Error fetching from database:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
