// pages/api/fetchMessages.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { drizzle } from '@drizzle-orm/postgres';
import { db } from '../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {

      const user = await db.select('users').where('id', userId).execute();
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }


      if (user.daily_tokens > 0) {
        const messages = await db
          .select('messages')
          .orderBy('timestamp', 'desc')
          .execute();

        await db.update('users').set({ daily_tokens: user.daily_tokens - 1 }).where('id', userId);

        const filteredMessages = messages.map((msg) => {
          if (new Date() < new Date(msg.cooldown_expiry)) {
            return { id: msg.id, author: msg.author, timestamp: msg.timestamp, cooldown: true };
          } else {
            return { ...msg, cooldown: false };
          }
        });

        res.status(200).json({ messages: filteredMessages });
      } else {
        res.status(403).json({ error: 'No tokens left for today' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
