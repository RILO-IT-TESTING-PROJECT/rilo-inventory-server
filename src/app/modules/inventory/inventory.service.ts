import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IInventory, IInventoryFilters } from './inventory.interface'
import { Inventory } from './inventory.model'
import { InventoryFilterableFields } from './inventory.constant'

const addNewInventory = async (
  inventory: IInventory
): Promise<IInventory | null> => {
  const createdInventory = await Inventory.create(inventory)

  if (!createdInventory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add inventory')
  }
  return await Inventory.findOne({ _id: createdInventory._id })
}

const getAllInventories = async (
  filters: IInventoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IInventory[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: InventoryFilterableFields.map(field => ({
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

  const result = await Inventory.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Inventory.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleInventory = async (_id: string): Promise<IInventory | null> => {
  const result = await Inventory.findOne({ _id })
  return result
}

const updateInventory = async (
  _id: string,
  payload: Partial<IInventory>
): Promise<IInventory | null> => {
  const isExist = await Inventory.findOne({ _id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory is not found!')
  }

  const result = await Inventory.findOneAndUpdate({ _id }, payload, {
    new: true,
  })

  return result
}

const deleteInventory = async (_id: string): Promise<IInventory | null> => {
  const isExist = await Inventory.findOne({ _id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory is not found!')
  }

  const result = await Inventory.findByIdAndDelete(_id)
  return result
}

export const InventoryService = {
  addNewInventory,
  getAllInventories,
  getSingleInventory,
  updateInventory,
  deleteInventory,
}
