import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    type: String,
    payload: Object,
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
