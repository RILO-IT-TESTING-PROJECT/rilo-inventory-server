import { Schema, model } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IStore, StoreModel } from './store.interface'

export const storeSchema = new Schema<IStore>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: Boolean, default: true },
    consumerKey: { type: String, required: true },
    consumerSecret: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

storeSchema.pre('save', async function (next) {
  const storeExist = await Store.findOne({
    name: this.name,
    consumerKey: this.consumerKey,
    consumerSecret: this.consumerSecret,
  })
  if (storeExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${storeExist.name} is already exist with same consumer key '${storeExist.consumerKey}' and consumer secret '${storeExist.consumerSecret}'`
    )
  }
  next()
})

export const Store = model<IStore, StoreModel>('Store', storeSchema)
