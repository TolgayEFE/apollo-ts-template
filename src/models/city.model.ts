import { Schema, model } from 'mongoose';

const citySchema = new Schema({
  name: { type: String, required: true },
  geolocation : { type: Object },
});

const CityModel = model('City', citySchema);

export default CityModel;
