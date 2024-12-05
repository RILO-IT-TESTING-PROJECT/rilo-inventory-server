import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { InventoryRoutes } from '../modules/inventory/inventory.route'
import { AuthRoutes } from '../modules/auth/auth.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/inventories',
    route: InventoryRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
