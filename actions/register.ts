'use server';

import { db } from '@/lib/db';
import bcrpyt from 'bcryptjs';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas';
import { generateFromEmail, generateUsername } from 'unique-username-generator';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrpyt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const username = !!email
    ? generateFromEmail(email, 3)
    : generateUsername('', 0, 8);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
