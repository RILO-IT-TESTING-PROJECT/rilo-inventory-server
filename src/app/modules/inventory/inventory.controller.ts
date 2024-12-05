import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { InventoryService } from './inventory.service'
import { IInventory } from './inventory.interface'
import pick from '../../../shared/pick'
import { InventoryFilterableFields } from './inventory.constant'
import { paginationFields } from '../../../constants/pagination'

const addNewInventory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const result = await InventoryService.addNewInventory(data)

    sendResponse<IInventory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Inventory added successfully',
      data: result,
    })
  }
)

const getAllInventories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, InventoryFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await InventoryService.getAllInventories(
    filters,
    paginationOptions
  )

  sendResponse<IInventory[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Inventories retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleInventory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await InventoryService.getSingleInventory(id)

  sendResponse<IInventory>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Inventories retrieved successfully',
    data: result,
  })
})

const updateInventory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await InventoryService.updateInventory(id, payload)

  sendResponse<IInventory>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Inventory updated successfully',
    data: result,
  })
})

const deleteInventory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await InventoryService.deleteInventory(id)

  sendResponse<IInventory>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Inventory deleted successfully',
    data: result,
  })
})

export const InventoryController = {
  addNewInventory,
  getAllInventories,
  getSingleInventory,
  updateInventory,
  deleteInventory,
}
