import express from 'express'
import { getAll, create, createForm, editForm, update, deleteProduct } from '../controllers/productController.js'
import { detailProduct } from '../controllers/detailProductController.js'
import catchAsync from '../utils/catchAsync.js'
const router = express.Router()

//CRUD
router.get("/", catchAsync(getAll) )

router.get("/create", createForm)
router.post("/", catchAsync(create) )
router.get("/edit/:id", editForm)
router.put("/:id", update)
router.delete("/:id", deleteProduct)

router.get("/:id", detailProduct);
export default router