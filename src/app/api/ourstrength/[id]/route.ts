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
    const strengthId = Number(id);
    if (Number.isNaN(strengthId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const formData = await req.formData();
    const mainHeading = formData.get('mainHeading') as string;
    const subHeadings = [
      formData.get('subHeading1') as string,
      formData.get('subHeading2') as string,
      formData.get('subHeading3') as string,
      formData.get('subHeading4') as string,
    ];
    const subDescriptions = [
      formData.get('subDescription1') as string,
      formData.get('subDescription2') as string,
      formData.get('subDescription3') as string,
      formData.get('subDescription4') as string,
    ];

    const image1 = formData.get('image1') as File | null;
    const image2 = formData.get('image2') as File | null;

    if (!mainHeading || subHeadings.some(sh => !sh) || subDescriptions.some(sd => !sd)) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existing = await pool.query('SELECT * FROM our_strength WHERE id = $1', [strengthId]);
    if (existing.rowCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    const existingData = existing.rows[0];

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });

    let image1Url = existingData.image1_url;
    if (image1 && typeof image1 !== 'string') {
      const bytes = await image1.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = `${Date.now()}-image1-${image1.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);
      image1Url = `/uploads/${safeName}`;
    }

    let image2Url = existingData.image2_url;
    if (image2 && typeof image2 !== 'string') {
      const bytes = await image2.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeName = `${Date.now()}-image2-${image2.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);
      image2Url = `/uploads/${safeName}`;
    }

    const result = await pool.query(
      `UPDATE our_strength SET
        main_heading = $1,
        image1_url = $2,
        image2_url = $3,
        subheading1 = $4,
        subheading2 = $5,
        subheading3 = $6,
        subheading4 = $7,
        subdescription1 = $8,
        subdescription2 = $9,
        subdescription3 = $10,
        subdescription4 = $11
      WHERE id = $12
      RETURNING *`,
      [
        mainHeading,
        image1Url,
        image2Url,
        ...subHeadings,
        ...subDescriptions,
        strengthId,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err) {
    console.error('Error updating our_strength:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = await context.params as { id: string };

  try {
    const strengthId = Number(id);
    if (Number.isNaN(strengthId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const deleteResult = await pool.query('DELETE FROM our_strength WHERE id = $1 RETURNING *', [strengthId]);
    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Strength record deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting our_strength:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
