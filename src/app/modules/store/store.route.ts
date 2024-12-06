import express from 'express'
import requestValidator from '../../middlewares/requestValidator'
import { StoreValidation } from './store.validation'
import verifyUserAuth from '../../middlewares/verifyUserAuth'
import { StoreController } from './store.controller'
const router = express.Router()

router.post(
  '/',
  requestValidator(StoreValidation.addNewStoreZodSchema),
  verifyUserAuth(),
  StoreController.addNewStore
)

router.get('/:id', StoreController.getSingleStore)

router.get('/', verifyUserAuth(), StoreController.getAllStores)

router.patch('/:id', verifyUserAuth(), StoreController.updateStore)

router.delete('/:id', verifyUserAuth(), StoreController.deleteStore)

export const StoreRoutes = router
