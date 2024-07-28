import NeucronSDK from "neucron-sdk";
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {

    login: async ({ request }) => {
        try {
            const data = await request.formData();

            const neucron = new NeucronSDK();
            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;

            const loginResponse = await authModule.login({
                email: data.get('email'),
                password: data.get('password')
            });

            console.log(loginResponse);

            // For Default wallet balance
            const DefaultWalletBalance = await walletModule.getWalletBalance({});
            console.log(DefaultWalletBalance);

            return {
                success: true,
                balance: DefaultWalletBalance.data.balance.summary
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'Login failed. Please try again.'
            };
        }
    },

    pay: async ({ request, locals }) => {
        try {
            const data = await request.formData();

            const neucron = new NeucronSDK();
            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;

            const loginResponse = await authModule.login({
                email: data.get('email'),
                password: data.get('password')
            });

            console.log(loginResponse);

            const options = {
                outputs: [
                    {
                        address: data.get('paymail'),
                        note: 'donations',
                        amount: Number(data.get('amount'))
                    }
                ]
            };
            console.log(options);

            const payResponse = await neucron.pay.txSpend(options);
            console.log(payResponse);

            const user = locals.user;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const donation = await prisma.donor.create({
                data: {
                    charity_id: String(data.get('paymail')),
                    donor_id: String(user.id),
                    amount:data.get('amount'),
                    id: payResponse.data.txid,
                    
                }
            });

            console.log(donation);

            return {
                success: true,
                payment: payResponse.data.txid
            };
        } catch (error) {
            console.error('Payment error:', error);
            return {
                success: false,
                error: 'Payment failed. Please try again.'
            };
        }
    }
};
