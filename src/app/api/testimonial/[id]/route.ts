import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Helper to save image file and return URL
async function saveImageFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, file.name);

  await writeFile(filePath, buffer);
  return `/uploads/${file.name}`;
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = await context.params as { id: string };

  try {
    const formData = await req.formData();

    const name = formData.get('name') as string | null;
    const comment = formData.get('comment') as string | null;
    const imageFile = formData.get('image') as File | null;

    // Fetch current testimonial from DB
    const currentResult = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
    if (currentResult.rows.length === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    const currentTestimonial = currentResult.rows[0];

    let imageUrl = currentTestimonial.image_url;

    // If new image uploaded, save and delete old image
    if (imageFile && typeof imageFile !== 'string') {
      // Save new image
      const newImageUrl = await saveImageFile(imageFile);

      // Delete old image file
      if (imageUrl) {
        const oldImagePath = path.join(process.cwd(), 'public', imageUrl);
        try {
          await unlink(oldImagePath);
        } catch {
          // ignore error if file doesn't exist
        }
      }

      imageUrl = newImageUrl;
    }

    // Update testimonial in DB (only update provided fields)
    await pool.query(
      `UPDATE testimonials
       SET name = COALESCE($1, name),
           comment = COALESCE($2, comment),
           image_url = COALESCE($3, image_url)
       WHERE id = $4`,
      [name, comment, imageUrl, id]
    );

    return NextResponse.json({ message: 'Testimonial updated successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = await context.params as { id: string };

  try {
    // Get testimonial to delete image file
    const currentResult = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
    if (currentResult.rows.length === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    const testimonial = currentResult.rows[0];

    // Delete image file if exists
    if (testimonial.image_url) {
      const imagePath = path.join(process.cwd(), 'public', testimonial.image_url);
      try {
        await unlink(imagePath);
      } catch {
        // Ignore if file doesn't exist
      }
    }

    // Delete from DB
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
