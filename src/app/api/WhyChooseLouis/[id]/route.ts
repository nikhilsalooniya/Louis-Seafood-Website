import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export async function PUT(req: NextRequest, context: any) {
  const { id } = await context.params as { id: string };

  try {
    const offerId = Number(id);
    if (Number.isNaN(offerId)) {
      return NextResponse.json({ error: 'Invalid offer ID' }, { status: 400 });
    }

    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const existingResult = await pool.query('SELECT * FROM whychooselouis WHERE id = $1', [offerId]);
    if (existingResult.rowCount === 0) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    const existingOffer = existingResult.rows[0];

    const updateResult = await pool.query(
      'UPDATE whychooselouis SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, offerId]
    );

    return NextResponse.json(updateResult.rows[0], { status: 200 });
  } catch (err) {
    console.error('Error updating offer', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params as { id: string };

  try {
    const offerId = Number(id);
    if (Number.isNaN(offerId)) {
      return NextResponse.json({ error: 'Invalid offer ID' }, { status: 400 });
    }

    const deleteResult = await pool.query('DELETE FROM whychooselouis WHERE id = $1 RETURNING *', [offerId]);
    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting offer', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
