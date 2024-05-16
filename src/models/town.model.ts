import { Schema, model } from "mongoose";

const townSchema = new Schema({
  name: { type: String, required: true },
  geolocation: { type: Object },
  cityId: { type: Schema.Types.ObjectId, required: true, ref: "City" },
});

const TownModel = model("Town", townSchema);

export default TownModel;
