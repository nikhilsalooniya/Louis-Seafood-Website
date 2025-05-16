import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

// Database connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'seafood-website', // Update with your database name
  password: 'postgres', // Update with your password
  port: 5432, // Default PostgreSQL port
});

// Category to table mapping
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
    // Parse form data
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;
    const category = formData.get('category') as string;

    // Check if all required fields are provided
    if (!title || !description || !file || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if category is valid
    if (!categoryToTable[category]) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    // Handle file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the file
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${file.name}`;
    const tableName = categoryToTable[category];

    // Insert product into the appropriate table
    await pool.query(
      `INSERT INTO ${tableName} (title, description, image_url) VALUES ($1, $2, $3)`,
      [title, description, imageUrl]
    );

    return NextResponse.json({ message: `${category} product added successfully!` }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database:', err);
    return NextResponse.json({ error: 'Server error while inserting data' }, { status: 500 });
  }
}
