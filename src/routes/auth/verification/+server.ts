import { RegisterUserSchema, type RegisterUserInput } from '$lib/validations/user.schema.js';
import { GOOGLE_EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";

import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '$lib/server/prisma';

export async function POST({ request }) {
	try {
		const body = (await request.json());
		

		
		console.log(body);
        let subject = 'TrueCharity Verification code'
        let html = `<h2>This is your verification code </h2><pre>${body.verificationCode}</pre>>`
        console.log(html);

        
        const message = {
            from: GOOGLE_EMAIL,
            to: body.email,
            bcc: "hello@webjeda.com",
            subject:subject ,
            text: '',
            html: html,
        };
        
        const sendEmail = async (message) => {
            await new Promise((resolve, reject) => {
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(info);
                    }
                });
            });
        };

        await sendEmail(message);

		return json({ status: 'success'});
    }
        catch (error: any) {
		
		return json({ message: error.message }, { status: 500 });
	}
}
