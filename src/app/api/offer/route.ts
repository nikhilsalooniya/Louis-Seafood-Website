// app/api/mollusks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { writeFile } from 'fs/promises';
import path from 'path';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'seafood-website',
  password: 'postgres',
  port: 5432,
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

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${file.name}`;

    await pool.query(
      'INSERT INTO whatweoffer (title, description , image_url) VALUES ($1, $2, $3)',
      [title, description, imageUrl]
    );

    return NextResponse.json({ message: 'offer added successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Error inserting into the database', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
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
