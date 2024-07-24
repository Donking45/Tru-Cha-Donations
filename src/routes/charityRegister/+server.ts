// src/routes/auth/register-charity/+server.js
import { charityRegisterSchema, type charityRegisterInput } from '$lib/validations/user.schema.js';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '$lib/server/prisma';

export async function POST({ request, cookies }) {
  try {
    const body = (await request.json()) as charityRegisterInput;
    const data = charityRegisterSchema.parse(body);

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const cookieOptions = {
      httpOnly: false,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 12000000000
    };

    const charity = await prisma.charity.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        organization: data.organization,
        emailVerified: false
      }
    });

    // Optionally, send a confirmation email here

    cookies.set('email', data.email.toString(), cookieOptions);
    console.log(cookies.get('email'));

    return json({ status: 'success', data: { ...charity, password: undefined } }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return json({ message: 'failed validations', error: error.flatten() }, { status: 400 });
    }

    if (error.code === 'P2002') {
      return json({ message: 'charity with that email already exists' }, { status: 409 });
    }

    return json({ message: error.message }, { status: 500 });
  }
}



