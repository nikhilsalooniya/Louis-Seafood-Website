import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Helper to upload buffer to Cloudinary using a promise
function uploadToCloudinary(buffer: Buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'seafood-products' }, // optional folder in Cloudinary
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

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

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer) as any;

    const imageUrl = uploadResult.secure_url;

    // Insert into DB with Cloudinary URL
    await pool.query(
      'INSERT INTO dry_canned_goods_products (title, description, image_url) VALUES ($1, $2, $3)',
      [title, description, imageUrl]
    );

    return NextResponse.json({ message: 'Product added successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM dry_canned_goods_products');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching from database:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
