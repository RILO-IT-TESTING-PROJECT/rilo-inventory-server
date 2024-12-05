import { Schema, model } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IInventory, InventoryModel } from './inventory.interface'

export const inventorySchema = new Schema<IInventory>(
  {
    sku: { type: String, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['Single-Use', 'Out of Stock'],
      default: 'Multi-Use',
      required: true,
    },
    price: { type: Number, required: false, default: 0 },
    available: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  }
)

inventorySchema.pre('save', async function (next) {
  const productExist = await Inventory.findOne({
    name: this.name,
    sku: this.sku,
  })
  if (productExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${productExist.name} is already exist with same model ${productExist.model} for the sku ${productExist.sku}`
    )
  }
  next()
})

export const Inventory = model<IInventory, InventoryModel>(
  'Product',
  inventorySchema
)
