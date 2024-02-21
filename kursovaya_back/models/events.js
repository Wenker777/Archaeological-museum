import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  title: String,
	description: String,
	shortDescription: String,
	plannedEventDay: Number,
	plannedEventWday: Number,
	plannedEventMonth: Number,
	plannedEventTime: String,
	organizer: String,
	imageUrl: String,
}, {
	timestamps: true,
});

export default mongoose.model('Event', eventsSchema)
