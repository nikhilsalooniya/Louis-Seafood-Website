// app/api/hero/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

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
        const heading = formData.get('heading') as string;
        const description = formData.get('description') as string;
        const file = formData.get('video') as File;

        if (!file || typeof file === 'string') {
            return NextResponse.json({ error: 'Invalid video file' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), 'public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uniqueName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, uniqueName);

        await writeFile(filePath, buffer);
        const videoUrl = `/uploads/${uniqueName}`;

        await pool.query(
            'INSERT INTO whoarewe (heading, description, video_url) VALUES ($1, $2, $3)',
            [heading, description, videoUrl]
        );


        return NextResponse.json({ message: 'Hero section saved successfully!' }, { status: 201 });
    } catch (err) {
        console.error('Error inserting into the database:', err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM whoarewe ORDER BY id DESC LIMIT 1');
        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (err) {
        console.error('Error fetching from database:', err);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
