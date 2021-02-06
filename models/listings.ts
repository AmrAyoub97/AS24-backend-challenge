import mongoose from "mongoose";
const MongoSchema = mongoose.Schema;

// Create User Mongo Schema
const ListingsSchema = new MongoSchema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  make: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  seller_type: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Listings", ListingsSchema);
