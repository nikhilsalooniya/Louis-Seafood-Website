import nodemailer from 'nodemailer';

const sendEmail = async (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
): Promise<void> => {
  // Create a transporter using the Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address
      pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
    },
  });

  // Email to admin/site owner
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient-email@example.com', // Admin's email
    subject: `New Contact Form Submission: ${subject}`,
    text: `You have received a new message from the contact form.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone}\n` +
          `Subject: ${subject}\n\n` +
          `Message:\n${message}`,
  };

  // Confirmation email to user
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thank you for contacting us, ${name}!`,
    text: `Hi ${name},\n\nThank you for reaching out to us regarding "${subject}".\n` +
          `We have received your message and our team will get back to you shortly.\n\n` +
          `Best regards,\nYour Company Name`,
  };

  try {
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent:', adminInfo.response);

    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('User confirmation email sent:', userInfo.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

export default sendEmail;
