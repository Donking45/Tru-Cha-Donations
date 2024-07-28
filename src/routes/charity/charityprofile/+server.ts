import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';
import { verifyJWT } from '$lib/server/token';

export async function GET({ cookies }) {
    let authToken = cookies.get('token');
    
    if (!authToken) {
        return json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { sub } = await verifyJWT<{ sub: string }>(authToken);

        // Fetch the charity from the database where the id matches the sub
        const charity = await prisma.charity.findUnique({
            where: { id: sub }
        });

        if (!charity) {
            return json({ message: 'Charity not found' }, { status: 404 });
        }

        // Fetch donors where charity_id matches the charity's paymail
        const donors = await prisma.donor.findMany({
            where: { charity_id: charity.paymail?.toString() }
        });


        console.log(donors,"sdfadsf");

        // Return the donors in the response
        
        return json(donors);
    } catch (error) {
        console.error('Error fetching charity and donors:', error);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
