import { z } from 'zod'

const addNewStoreZodSchema = z.object({
  body: z.object({
    url: z.string({ required_error: 'Sku is required' }),
    name: z.string({ required_error: 'Name is required' }),
    status: z.boolean().optional(),
    consumerKey: z.string({ required_error: 'Consumer Key is required' }),
    consumerSecret: z.string({ required_error: 'Consumer Secret is required' }),
  }),
})

export const StoreValidation = {
  addNewStoreZodSchema,
}
