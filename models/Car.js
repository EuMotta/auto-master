import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    fueltype: { type: String, required: true },
    hodometro: { type: Number, required: true },
    color: { type: String, required: true },
    year: { type: String, required: true },
    licensePlate: { type: String, required: true, unique: true },
    chassis: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;
