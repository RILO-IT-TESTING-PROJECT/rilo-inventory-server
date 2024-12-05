import { Schema, model } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IProduct, ProductModel } from './product.interface'

export const productSchema = new Schema<IProduct>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Processor',
        'Motherboard',
        'RAM',
        'Power Supply',
        'Storage',
        'Monitor',
        'Graphics Card',
        'Casing',
        'CPU Cooler',
        'UPS',
        'Accessories',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Out of Stock'],
      default: 'In Stock',
      required: true,
    },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    description: { type: String },
    specification: { type: String },
    individualRating: { type: Number },
    averageRating: { type: Number },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        review: { type: String, required: true },
        rating: { type: Number, required: true },
      },
      { required: false },
    ],
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

productSchema.pre('save', async function (next) {
  const productExist = await Product.findOne({
    title: this.name,
    model: this.model,
    brand: this.brand,
  })
  if (productExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${productExist.name} is already exist with same model ${productExist.model} for the brand ${productExist.brand}`
    )
  }
  next()
})

export const Product = model<IProduct, ProductModel>('Product', productSchema)
