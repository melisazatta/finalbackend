import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     title: {
        type: String,
        required: [true, "El título es obligatorio."],
        minlength: [3, "El título debe tener mínimo 3 caracteres."],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "La descripción es obligatoria."],
        trim: true,
    },

    code: {
        type: String,
        required: [true, "El código es obligatorio."],
        unique: true,
        trim: true,
    },

    price: {
        type: Number,
        required: [true, "El precio es obligatorio."],
        min: [0, "El precio no puede ser negativo."],
    },

    status: {
        type: Boolean,
        default: true,
    },

    stock: {
        type: Number,
        required: [true, "El stock es obligatorio."],
        min: [0, "El stock no puede ser negativo."],
    },

    category: {
        type: String,
        required: [true, "La categoría es obligatoria."],
        trim: true,
    },

    thumbnails: {
        type: [String],
        default: [],
    },
})

const Product = mongoose.model("Product", productSchema)

export default Product