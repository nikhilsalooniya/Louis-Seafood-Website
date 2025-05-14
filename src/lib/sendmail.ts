import nodemailer from 'nodemailer';

const sendEmail = async (name: string, email: string, message: string): Promise<void> => {
  // Create a transporter using the Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail email address
      pass: process.env.EMAIL_PASS,  // Your Gmail password (or App Password if 2FA is enabled)
    },
  });

  // Setup email data
  const mailOptions = {
    from: process.env.GMAIL_EMAIL, // Sender address
    to: 'recipient-email@example.com', // Recipient email
    subject: `New Contact Form Submission from ${name}`,
    text: `You have received a message from ${name} (${email}):\n\n${message}`,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

export default sendEmail;
