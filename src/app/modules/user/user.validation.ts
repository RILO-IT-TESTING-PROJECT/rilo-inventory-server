import { z } from 'zod'

const updateProfileZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    photoUrl: z.string().optional(),
  }),
})
export const UserValidation = {
  updateProfileZodSchema,
}
