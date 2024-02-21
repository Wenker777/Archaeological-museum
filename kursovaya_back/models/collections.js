import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
}, {
	timestamps: true,
	
});

export default mongoose.model('Collection', collectionSchema)
