import express from 'express'
import requestValidator from '../../middlewares/requestValidator'
import { ProductValidation } from './product.validation'
import verifyUserAuth from '../../middlewares/verifyUserAuth'
import { ProductController } from './product.controller'
const router = express.Router()

router.post(
  '/',
  requestValidator(ProductValidation.addNewProductZodSchema),
  verifyUserAuth(),
  ProductController.addNewProduct
)

router.get('/:id', ProductController.getSingleProduct)

router.get('/', ProductController.getAllProducts)

router.patch('/:id', verifyUserAuth(), ProductController.updateProduct)

router.patch(
  '/review/:id',
  requestValidator(ProductValidation.addReviewZodSchema),
  verifyUserAuth(),
  ProductController.addReview
)

router.delete('/:id', verifyUserAuth(), ProductController.deleteProduct)

export const ProductRoutes = router
