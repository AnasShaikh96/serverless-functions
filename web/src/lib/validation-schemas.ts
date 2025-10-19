import { z } from 'zod'

export const emailSchema = z.string().email({ message: 'Invalid email address' })

export const passwordSchema = z
  .string()
  .min(1, { message: 'Password is required' })

export const usernameSchema = z
  .string()
  .min(2, { message: 'Username must be at least 2 characters long' })

// phone is not part of backend user schema; omit for registration

export const messageSchema = z
  .string()
  .min(10, { message: 'Message must be at least 10 characters long' })

export const contactFormSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  message: messageSchema,
})

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerFormSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export const profileFormSchema = z
  .object({
    username: usernameSchema.optional(),
    email: emailSchema.optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => {
    if (!data.password && !data.confirmPassword) return true
    return data.password === data.confirmPassword
  }, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export const resetPasswordFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })