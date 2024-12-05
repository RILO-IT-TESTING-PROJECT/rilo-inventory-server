import { Model, Types } from 'mongoose'

export type IReview = {
  user: Types.ObjectId
  review: string
  rating: number
}

export type IProduct = {
  image: string
  name: string
  category:
    | 'Processor'
    | 'Motherboard'
    | 'RAM'
    | 'Power Supply'
    | 'Storage'
    | 'Monitor'
    | 'Graphics Card'
    | 'Casing'
    | 'CPU Cooler'
    | 'UPS'
    | 'Accessories'

  status: 'In Stock' | 'Out of Stock'
  price: number
  brand: string
  model: string
  description?: string
  specification?: string
  individualRating?: number
  averageRating?: number
  reviews?: IReview[]
  featured?: boolean
}

export type IProductFilters = {
  searchTerm?: string
  category?: string
  status?: string
  featured?: boolean
}

export type ProductModel = Model<IProduct>
