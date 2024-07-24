import { z } from 'zod';

export const RegisterUserSchema = z
	.object({
		name: z
			.string({
				required_error: 'Name is required'
			})
			.min(1, 'Full name is required'),
		email: z
			.string({
				required_error: 'Email is required'
			})
			.min(1, 'Email is required')
			.email('Email is invalid'),
		photo: z.string().optional(),
		password: z
			.string({
				required_error: 'Password is required'
			})
			.min(1, 'Password is required')
			.min(8, 'Password must be more than 8 characters')
			.max(32, 'Password must be less than 32 characters'),
		passwordConfirm: z
			.string({
				required_error: 'Confirm your password'
			})
			.min(1, 'Confirm your password')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords do not match'
	});

export const LoginUserSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	password: z
		.string({
			required_error: 'Password is required'
		})
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
});
// schemas.js

export const LoginCharitySchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	password: z
		.string({
			required_error: 'Password is required'
		})
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
});

export const charityRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  organization: z.string().min(1, 'Organization details are required')
});

export const charityProfileSchema = z.object({
  mission: z.string().optional(),
  projects: z.string().optional(),
  financialInfo: z.string().optional()
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;

export type LoginCharityInput = z.infer<typeof LoginCharitySchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

export type charityProfileInput = z.infer<typeof charityProfileSchema>;

export type charityRegisterInput = z.infer<typeof charityRegisterSchema>;
