import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// === Cloudinary Config ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//check if env working



// === PostgreSQL Connection ===
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// === POST Handler: Add Product ===
export async function POST(req: NextRequest) {
  try {
    // === Check required ENV variables ===
    const requiredEnv = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'DATABASE_URL'];
    for (const key of requiredEnv) {
      if (!process.env[key]) {
        return NextResponse.json({ error: `Missing environment variable: ${key}` }, { status: 500 });
      }
    }

    // === Parse Form Data ===
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;

    // === Validate Fields ===
    if (!title || !description || !file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'Title, description, and a valid image are required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length === 0) {
      return NextResponse.json({ error: 'Empty file received.' }, { status: 400 });
    }

    // === Upload Image to Cloudinary ===
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'fish_products' }, (err, result) => {
        if (err || !result) return reject(new Error('Failed to upload image to Cloudinary'));
        resolve(result);
      });
      uploadStream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // === Save Product to PostgreSQL ===
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO fish_products (title, description, image_url) VALUES ($1, $2, $3)',
        [title, description, imageUrl]
      );
      return NextResponse.json({ message: 'Product added successfully!', imageUrl }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('POST Error:', err);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// === GET Handler: Fetch Products ===
export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM fish_products ORDER BY id DESC');
      return NextResponse.json(result.rows, { status: 200 });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        details: err instanceof Error ? err.message : 'Unknown database error'
      },
      { status: 500 }
    );
  }
}







// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg';
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary with environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export async function POST(req: NextRequest) {
//   try {
//     // Verify all required environment variables are set
//     if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.DATABASE_URL) {
//       throw new Error('Missing required environment variables');
//     }

//     const formData = await req.formData();

//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;
//     const file = formData.get('image') as File;

//     if (!file || !(file instanceof Blob)) {
//       return NextResponse.json(
//         { error: 'Invalid image file. Please upload a valid image.' },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Validate buffer
//     if (!buffer || buffer.length === 0) {
//       return NextResponse.json(
//         { error: 'Invalid file data' },
//         { status: 400 }
//       );
//     }

//     // Upload to Cloudinary with better error handling
//     const uploadResult = await new Promise((resolve, reject) => {
//   const uploadStream = cloudinary.uploader.upload_stream(
//     { folder: 'fish_products' },
//     (error, result) => {
//       if (error) {
//         console.error('Cloudinary upload error:', error);
//         reject(new Error('Failed to upload image to Cloudinary'));
//       } else {
//         resolve(result);
//       }
//     }
//   );

//   uploadStream.on('error', (error) => {
//     console.error('Upload stream error:', error);
//     reject(new Error('Image upload stream failed'));
//   });

//   uploadStream.end(buffer);
// });


//     const imageUrl = (uploadResult as any).secure_url;

//     // Database operation with connection management
//     const client = await pool.connect();
//     try {
//       await client.query(
//         'INSERT INTO fish_products (title, description, image_url) VALUES ($1, $2, $3)',
//         [title, description, imageUrl]
//       );
//       return NextResponse.json(
//         { message: 'Product added successfully!', imageUrl },
//         { status: 201 }
//       );
//     } finally {
//       client.release();
//     }
//   } catch (err) {
//     console.error('API Error:', err);
//     return NextResponse.json(
//       { 
//         error: 'Internal server error',
//         details: err instanceof Error ? err.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     // Verify database connection
//     if (!process.env.DATABASE_URL) {
//       throw new Error('Database connection string missing');
//     }

//     const client = await pool.connect();
//     try {
//       const result = await client.query('SELECT * FROM fish_products');
//       return NextResponse.json(result.rows, { status: 200 });
//     } finally {
//       client.release();
//     }
//   } catch (err) {
//     console.error('Database fetch error:', err);
//     return NextResponse.json(
//       { 
//         error: 'Failed to fetch products',
//         details: err instanceof Error ? err.message : 'Database error'
//       },
//       { status: 500 }
//     );
//   }
// }





// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg';
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary with environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // for Neon or similar
//   },
// });

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;
//     const file = formData.get('image') as File;

//     if (!file || typeof file === 'string') {
//       return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Upload to Cloudinary - using the upload_stream method to handle Buffer
//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: 'fish_products' }, // optional folder in your Cloudinary account
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       // Write buffer to stream
//       uploadStream.end(buffer);
//     });

//     const imageUrl = uploadResult.secure_url; // Cloudinary URL

//     // Save product data with Cloudinary image URL in the DB
//     await pool.query(
//       'INSERT INTO fish_products (title, description, image_url) VALUES ($1, $2, $3)',
//       [title, description, imageUrl]
//     );

//     return NextResponse.json({ message: 'Product added successfully!' }, { status: 201 });
//   } catch (err) {
//     console.error('Error inserting into the database or uploading image:', err);
//     return NextResponse.json({ error: 'Database or upload error' }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const result = await pool.query('SELECT * FROM fish_products');
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (err) {
//     console.error('Error fetching from database:', err);
//     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//   }
// }
