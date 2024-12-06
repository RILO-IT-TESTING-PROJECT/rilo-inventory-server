import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { StoreService } from './store.service'
import { IStore } from './store.interface'
import pick from '../../../shared/pick'
import { StoreFilterableFields } from './store.constant'
import { paginationFields } from '../../../constants/pagination'

const addNewStore: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const result = await StoreService.addNewStore(data)

    sendResponse<IStore>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Store added successfully',
      data: result,
    })
  }
)

const getAllStores = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, StoreFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await StoreService.getAllStores(filters, paginationOptions)

  sendResponse<IStore[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Stores retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleStore = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StoreService.getSingleStore(id)

  sendResponse<IStore>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Stores retrieved successfully',
    data: result,
  })
})

const updateStore = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await StoreService.updateStore(id, payload)

  sendResponse<IStore>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Store updated successfully',
    data: result,
  })
})

const deleteStore = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StoreService.deleteStore(id)

  sendResponse<IStore>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Store deleted successfully',
    data: result,
  })
})

export const StoreController = {
  addNewStore,
  getAllStores,
  getSingleStore,
  updateStore,
  deleteStore,
}
