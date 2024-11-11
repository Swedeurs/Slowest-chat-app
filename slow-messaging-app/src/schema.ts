import { pgTable, text, timestamp } from '@drizzle-orm/postgres';

export const messages = pgTable('messages', {
  id: text().primaryKey(),
  author: text(),
  content: text(),
  timestamp: timestamp(),
  cooldown_expiry: timestamp(),
});

export const users = pgTable('users', {
  id: text().primaryKey(),
  username: text(),
  daily_tokens: text(), // store token count as number or text
  weekly_tokens: text(),
});
