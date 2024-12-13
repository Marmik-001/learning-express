import { Router } from "express";
import userRouter from "./users.mjs"
import productsRouter from "./products.mjs"
import authRouter from "./auth.mjs"
const routes = Router()

routes.use(userRouter)
routes.use(productsRouter)
routes.use(authRouter)

export default routes