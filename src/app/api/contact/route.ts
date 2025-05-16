// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import sendEmail from '../../../lib/sendmail'; // Import the email sending function

export async function POST(request: Request) {
  const { name, email, phone, subject, message } = await request.json();

  await sendEmail(name, email, phone, subject, message);

  return NextResponse.json({ success: true });
}
