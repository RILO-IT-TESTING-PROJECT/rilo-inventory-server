import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'
import pick from '../../../shared/pick'
import { productFilterableFields } from './product.constant'
import { paginationFields } from '../../../constants/pagination'

const addNewProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const result = await ProductService.addNewProduct(data)

    sendResponse<IProduct>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product added successfully',
      data: result,
    })
  }
)

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ProductService.getAllProducts(filters, paginationOptions)

  sendResponse<IProduct[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await ProductService.getSingleProduct(id)

  sendResponse<IProduct>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body

  const result = await ProductService.updateProduct(id, payload)

  sendResponse<IProduct>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  })
})

const addReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const newReview = { ...payload, user: req?.user?.userId }

  const result = await ProductService.addReview(id, newReview)

  sendResponse<IProduct>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review added successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ProductService.deleteProduct(id)

  sendResponse<IProduct>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  })
})

export const ProductController = {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  addReview,
  deleteProduct,
}
