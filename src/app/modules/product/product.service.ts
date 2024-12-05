import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IProduct, IProductFilters, IReview } from './product.interface'
import { Product } from './product.model'
import { productSearchableFields } from './product.constant'

const addNewProduct = async (product: IProduct): Promise<IProduct | null> => {
  const createdProduct = await Product.create(product)

  if (!createdProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add product')
  }
  return await Product.findOne({ _id: createdProduct._id }).populate({
    path: 'reviews',
    populate: [{ path: 'user', select: { password: 0 } }],
  })
}

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    if (filtersData.featured) {
      andConditions.push({ featured: filtersData.featured })
    } else {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => {
          return { [field]: { $regex: value, $options: 'i' } }
        }),
      })
    }
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Product.find(whereConditions)
    .populate({
      path: 'reviews',
      populate: [{ path: 'user', select: { password: 0 } }],
    })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Product.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleProduct = async (_id: string): Promise<IProduct | null> => {
  const result = await Product.findOne({ _id }).populate({
    path: 'reviews',
    populate: [{ path: 'user', select: { password: 0 } }],
  })
  return result
}

const updateProduct = async (
  _id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const isExist = await Product.findOne({ _id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product is not found!')
  }

  const result = await Product.findOneAndUpdate({ _id }, payload, {
    new: true,
  }).populate({
    path: 'reviews',
    populate: [{ path: 'user', select: { password: 0 } }],
  })

  return result
}

const addReview = async (
  _id: string,
  newReview: IReview
): Promise<IProduct | null> => {
  const isExist = await Product.findOne({ _id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product is not found!')
  }

  let reviewQuery = {}
  let reviewData = {}

  const reviewExist = await Product.findOne({
    _id,
    'reviews.user': newReview.user,
  })

  if (reviewExist) {
    reviewQuery = { _id, 'reviews.user': newReview.user }
    reviewData = {
      $set: {
        'reviews.$.review': newReview.review,
        'reviews.$.rating': newReview.rating,
      },
    }
  } else {
    reviewQuery = { _id }
    reviewData = { $push: { reviews: newReview } }
  }

  const result = await Product.findOneAndUpdate(reviewQuery, reviewData, {
    new: true,
  }).populate({
    path: 'reviews',
    populate: [{ path: 'user', select: { password: 0 } }],
  })

  return result
}

const deleteProduct = async (_id: string): Promise<IProduct | null> => {
  const isExist = await Product.findOne({ _id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product is not found!')
  }

  const result = await Product.findByIdAndDelete(_id).populate({
    path: 'reviews',
    populate: [{ path: 'user', select: { password: 0 } }],
  })
  return result
}

export const ProductService = {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview,
}
