import express from "express"
import {
    createCart,
    getCart,
    removeProduct,
    clearCart, 
    updateQuantity
} from "../controllers/cartController.js"
import { addProduct } from "../controllers/cartController.js"

import Cart from "../models/Cart.js"
const router = express.Router()

router.get("/", getCart)
router.post("/", createCart)
router.get("/:id", getCart)

router.post("/:cid/products/:pid", addProduct)

// eliminar product
router.delete("/:cid/products/:pid", removeProduct)

// vaciar carrito
router.delete("/:cid", clearCart)

// actualizar cantidad
router.put("/:cid/products/:pid", updateQuantity)

router.get("/crear", async (req, res) => {

    const cart = await Cart.create({
        products: []
    });

    console.log(cart);

    res.send(cart);
});

export default router