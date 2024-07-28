import { redirect } from "@sveltejs/kit";
import NeucronSDK from "neucron-sdk";

import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {

    login: async ({request}) => {
        const data = await request.formData();

        const neucron = new NeucronSDK();
        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        try {
            const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
            console.log(loginResponse);

            const DefaultWalletBalance = await walletModule.getWalletBalance({});
            console.log(DefaultWalletBalance);

            return {
                status: 200, // Status code for successful request
                body: { success: true, balance: DefaultWalletBalance.data.balance.summary }
            };
        } catch (error) {
            console.error(error);
            return {
                status: 400, // Bad Request if login fails
                body: { success: false, message: 'Login failed' }
            };
        }
    },

    signup: async ({request, cookies}) => {
        const data = await request.formData();
        
        let email = cookies.get('email');
        console.log(email);
        console.log(data.get('email'), data.get('password'),email);
        const neucron = new NeucronSDK();
        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        try {
            const signUpResponse = await authModule.signUp({ email: data.get('email'), password: data.get('password') });
            console.log(signUpResponse);

            console.log( signUpResponse.data.paymail_id);

            const userUpdateData = {
                where: {
                    email: email,
                },
                data: {
                    paymail: signUpResponse.data.paymail_id,
                }
            };

            await prisma.charity.update(userUpdateData);

            return {
                status: 200, // Status code for successful request
                body: { success: true, paymail: signUpResponse.data.paymail_id }
            }; // Use 302 for redirection
        } catch (error) {
            console.error(error);
            return {
                status: 400, // Bad Request if signup fails
                body: { success: false, message: 'Signup failed' }
            };
        }
    },
};
