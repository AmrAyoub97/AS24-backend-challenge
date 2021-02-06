import mongoose from "mongoose";
const MongoSchema = mongoose.Schema;

// Create User Mongo Schema
const ContactsSchema = new MongoSchema({
  listing_id: {
    type: Number,
    required: true,
  },
  contact_date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Contacts", ContactsSchema);
