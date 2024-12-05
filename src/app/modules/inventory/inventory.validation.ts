import { z } from 'zod'

const addNewInventoryZodSchema = z.object({
  body: z.object({
    sku: z.string({ required_error: 'Sku is required' }),
    name: z.string({ required_error: 'Name is required' }),
    type: z.union([z.literal('Single-Use'), z.literal('Multi-Use')]),
    price: z.number().optional(),
    available: z.number().optional(),
  }),
})

export const InventoryValidation = {
  addNewInventoryZodSchema,
}
