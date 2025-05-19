import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Category to table mapping - whitelist to avoid SQL injection
const categoryToTable: Record<string, string> = {
  fish: 'fish_products',
  meat: 'meat_products',
  shellfish: 'shellfish_products',
  mollusks: 'mollusks_products',
  'frozen-vegetables': 'frozen_vegetables_products',
  'dry-canned-goods': 'dry_canned_goods_products',
  'intl-ingredients': 'intl_ingredients_products',
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;
    const category = formData.get('category') as string;

    if (!title || !description || !file || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate category
    const tableName = categoryToTable[category];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    if (typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `products/${category}` },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // Use parameterized query but table name must be hardcoded from whitelist
    const query = `
      INSERT INTO ${tableName} (title, description, image_url)
      VALUES ($1, $2, $3)
    `;

    await pool.query(query, [title, description, imageUrl]);

    return NextResponse.json({ message: `${category} product added successfully!` }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database:', err);
    return NextResponse.json({ error: 'Server error while inserting data' }, { status: 500 });
  }
}
