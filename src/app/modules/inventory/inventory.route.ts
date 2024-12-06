import express from 'express'
import requestValidator from '../../middlewares/requestValidator'
import { InventoryValidation } from './inventory.validation'
import verifyUserAuth from '../../middlewares/verifyUserAuth'
import { InventoryController } from './inventory.controller'
const router = express.Router()

router.post(
  '/',
  requestValidator(InventoryValidation.addNewInventoryZodSchema),
  verifyUserAuth(),
  InventoryController.addNewInventory
)

router.get('/:id', InventoryController.getSingleInventory)

router.get('/', verifyUserAuth(), InventoryController.getAllInventories)

router.patch('/:id', verifyUserAuth(), InventoryController.updateInventory)

router.delete('/:id', verifyUserAuth(), InventoryController.deleteInventory)

export const InventoryRoutes = router
