import mongoose from "mongoose";

const articlesSchema = new mongoose.Schema({
  title: String,
	description: String,
	shortDescription: String,
	dayOfPublication: Number,
	monthOfPublication: Number,
	yearOfPublication: Number,
	author: String,
	bigImage: String,
	smallImage: String,
}, {
	timestamps: true,
});

export default mongoose.model('Article', articlesSchema)
