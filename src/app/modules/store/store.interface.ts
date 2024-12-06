import { Model } from 'mongoose'

export type IStore = {
  name: string
  url: string
  status: boolean
  consumerKey: string
  consumerSecret: string
}

export type IStoreFilters = {
  searchTerm?: string
  status?: boolean
}

export type StoreModel = Model<IStore>
