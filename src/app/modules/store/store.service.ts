import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IStore, IStoreFilters } from './store.interface'
import { Store } from './store.model'
import { StoreFilterableFields } from './store.constant'

const addNewStore = async (store: IStore): Promise<IStore | null> => {
  const createdStore = await Store.create(store)

  if (!createdStore) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add store')
  }
  return await Store.findOne({ _id: createdStore._id })
}

const getAllStores = async (
  filters: IStoreFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStore[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: StoreFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: { $regex: value, $options: 'i' } }
      }),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Store.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Store.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStore = async (_id: string): Promise<IStore | null> => {
  const result = await Store.findOne({ _id })
  return result
}

const updateStore = async (
  _id: string,
  payload: Partial<IStore>
): Promise<IStore | null> => {
  const isExist = await Store.findOne({ _id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store is not found!')
  }

  const result = await Store.findOneAndUpdate({ _id }, payload, {
    new: true,
  })

  return result
}

const deleteStore = async (_id: string): Promise<IStore | null> => {
  const isExist = await Store.findOne({ _id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store is not found!')
  }

  const result = await Store.findByIdAndDelete(_id)
  return result
}

export const StoreService = {
  addNewStore,
  getAllStores,
  getSingleStore,
  updateStore,
  deleteStore,
}
