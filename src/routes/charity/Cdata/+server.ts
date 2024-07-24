import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const id = params.charitypage; // Ensure the param name matches the dynamic segment
    console.log(id);
    
    try {
        // Fetch the charity with the given id from the database
        const charity = await prisma.charity.findUnique({
            where: { id: id }
        });

        if (!charity) {
            return json({ message: 'Charity not found' }, { status: 404 });
        }

        const { password, ...charityData } = charity;

        return json(charityData);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.error('Error fetching charity:', error);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
