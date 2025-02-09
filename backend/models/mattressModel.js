import mongoose from "mongoose";

const mattressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    dimensions: { type: String, required: true },
    material: { type: String, required: true },
    materialType: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
  },
  { versionKey: false }
);

// Mattress Model
const Mattress = mongoose.model("Mattress", mattressSchema);

export default Mattress;
