
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { author, content } = req.body;

    const cooldownExpiry = new Date(Date.now() + 3600000); // 1 hour cooldown

    try {
      await db.insert('messages').values({
        author,
        content,
        timestamp: new Date(),
        cooldown_expiry: cooldownExpiry,
      });

      res.status(200).json({ message: 'Message posted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error posting message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
