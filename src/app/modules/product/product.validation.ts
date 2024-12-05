import { z } from 'zod'

const addNewProductZodSchema = z.object({
  body: z.object({
    image: z.string({ required_error: 'Image is required' }),
    name: z.string({ required_error: 'Name is required' }),
    category: z.union([
      z.literal('Processor'),
      z.literal('Motherboard'),
      z.literal('RAM'),
      z.literal('CPU Cooler'),
      z.literal('Storage'),
      z.literal('Power Supply'),
      z.literal('Graphics Card'),
      z.literal('Casing'),
      z.literal('Monitor'),
      z.literal('Mouse'),
      z.literal('Keyboard'),
      z.literal('UPS'),
    ]),
    status: z.union([z.literal('In Stock'), z.literal('Out of Stock')]),
    price: z.number({ required_error: 'Price is required' }),
    brand: z.string(),
    model: z.string(),
    description: z.string().optional(),
    specification: z.string().optional(),
    individualRating: z.number().optional(),
    averageRating: z.number().optional(),
    reviews: z
      .array(
        z.object({
          user: z.string(),
          review: z.string(),
          rating: z.number(),
        })
      )
      .optional(),
  }),
})

const addReviewZodSchema = z.object({
  body: z.object({
    review: z.string({ required_error: 'Review text is required' }),
    rating: z.number({ required_error: 'Rating text is required' }),
  }),
})

export const ProductValidation = {
  addNewProductZodSchema,
  addReviewZodSchema,
}
