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

// POST method to add a new product to the special food category
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;

    // Validation
    if (!title || !description || !file || typeof file === 'string') {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'products/special_food' },
        (err, result) => {
          if (err) return reject(err);
          resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // Insert into DB
    await pool.query(
      'INSERT INTO special_food_products (title, description, image_url) VALUES ($1, $2, $3)',
      [title, description, imageUrl]
    );

    return NextResponse.json({ message: 'Special food product added successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// GET method to fetch all special food products
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM special_food_products ORDER BY id DESC');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching from database:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
