import { z } from 'zod'

const signupUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First Name is required',
    }),
    lastName: z.string({
      required_error: 'Last Name is required',
    }),
    companyName: z.string({
      required_error: 'Company name is required',
    }),
    phone: z.string({
      required_error: 'Company name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const logInZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  signupUserZodSchema,
  logInZodSchema,
  refreshTokenZodSchema,
}
