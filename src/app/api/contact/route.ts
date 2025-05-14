// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import sendEmail from '../../../lib/sendmail'; // Import the email sending function

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Call the function to send the email
  await sendEmail(name, email, message);

  return NextResponse.json({ success: true });
}
