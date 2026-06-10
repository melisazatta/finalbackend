import express from "express";
import {
    getAllApi,
    getByIdApi,
    createApi,
    updateApi,
    deleteProductApi
} from "../../controllers/api/productApiController.js";

const router = express.Router();

router.get("/", getAllApi);
router.get("/:pid", getByIdApi);

router.post("/", createApi);

router.put("/:pid", updateApi);

router.delete("/:pid", deleteProductApi);
export default router;