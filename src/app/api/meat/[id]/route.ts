// app/api/meat/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export async function DELETE(req: NextRequest) {
  try {
    // Extract the product ID from the URL path
    const { pathname } = new URL(req.url);
    const productId = pathname.split('/').pop();  // Assuming the URL will be something like /api/meat/{id}

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Delete the product from the meat_products table
    const deleteResult = await pool.query('DELETE FROM meat_products WHERE id = $1', [productId]);

    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting product:', err);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
