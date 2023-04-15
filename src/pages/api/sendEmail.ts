import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: `${name} <lee.jungro@yopmail.com>`,
      subject: 'New message from the contact form',
      text: message,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: unknown) {
      console.error('Error sending email:', error); // Keep this line
      if (error instanceof Error) {
        // You can access the 'message' property since the error is now of type Error
        console.error('Error details:', error.message);
      }
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
