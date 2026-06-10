import express from "express";

import {
    createCartApi,
    getCartApi,
    addProductApi,
    removeProductApi,
    clearCartApi,
    updateQuantityApi,
    updateCartApi
} from "../../controllers/api/cartApiController.js"

const router = express.Router();

// Crear carrito
router.post("/", createCartApi);

// Obtener carrito por ID
router.get("/:cid", getCartApi);

// Agregar producto al carrito
router.post("/:cid/products/:pid", addProductApi);

// Actualizar todos los productos del carrito
router.put("/:cid", updateCartApi);

// Actualizar cantidad de un producto
router.put("/:cid/products/:pid", updateQuantityApi);

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", removeProductApi);

// Vaciar carrito
router.delete("/:cid", clearCartApi);

export default router;