import mongoose, { Schema, models, model } from "mongoose";

interface IGrocery {
    id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const grocerySchema = new Schema<IGrocery>({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Fruits & Vegetables",
            "Dairy & Eggs",
            "Rice, Atta & Grains",
            "Snacks & Biscuits",
            "Spices & Masalas",
            "Beverages & Drinks",
            "Personal Care",
            "Household Essentials",
            "Instant & Packaged Food",
            "Baby & Pet Care"
        ]
    },
    price: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ["kg", "g", "litre", "ml", "piece", "pack"]
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Grocery = models.Grocery || model("Grocery", grocerySchema);

export default Grocery;