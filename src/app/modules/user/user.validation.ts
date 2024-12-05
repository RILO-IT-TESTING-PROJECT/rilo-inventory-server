import { z } from 'zod'

const updateProfileZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    photoUrl: z.string().optional(),
    companyName: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),
})
export const UserValidation = {
  updateProfileZodSchema,
}
