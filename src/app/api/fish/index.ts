import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db'; // Import the pool

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch all products from the database
    const result = await pool.query('SELECT * FROM fish_products');
    
    // Send the products in the response
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
}
