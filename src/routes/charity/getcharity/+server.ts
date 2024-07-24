import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    // Fetch all charities from the database
    const charities = await prisma.charity.findMany();

    // Remove sensitive information (e.g., passwords) from each charity
    const sanitizedCharities = charities.map(({ password, ...rest }) => rest);

    // Return the sanitized charities in the response as an array
    return json(sanitizedCharities);
  } catch (error) {
    // Log the error and return a 500 Internal Server Error response
    console.error('Error fetching charities:', error);
    return json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
