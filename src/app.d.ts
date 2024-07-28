// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, User,Charity } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			charity: Charity | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient;
}

export {};
