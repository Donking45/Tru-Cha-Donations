import NeucronSDK from "neucron-sdk";

/** @type {import('./$types').Actions} */
export const actions = {

    login: async ({request}) => {
	    const data = await request.formData();
        

    const neucron = new NeucronSDK();

    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;


    const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
    console.log(loginResponse);

 

    // For Default wallet balance
    const DefaultWalletBalance = await walletModule.getWalletBalance({});
    console.log(DefaultWalletBalance);


        
        return { success: true, balance: DefaultWalletBalance.data.balance.summary };
	},
    pay: async ({request}) => {
	    const data = await request.formData();
        
    const neucron = new NeucronSDK();

    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
    console.log(loginResponse);


    const options = {
        outputs: [
        {
            address: data.get('paymail'),
            note: 'gurudakshina',
            amount: Number(data.get('amount'))
        }
        ]
    };
    console.log(options)
    const payResponse = await neucron.pay.txSpend(options)
    console.log(payResponse)

    return { success: true, payment: payResponse.data.txid };
    }
};