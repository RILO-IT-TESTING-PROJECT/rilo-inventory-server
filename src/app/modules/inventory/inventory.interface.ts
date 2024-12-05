import { Model } from 'mongoose'

export type IInventory = {
  sku: string
  name: string
  type: 'Single-Use' | 'Multi-Use'
  price?: number
  available?: number
}

export type IInventoryFilters = {
  searchTerm?: string
  type?: string
}

export type InventoryModel = Model<IInventory>
