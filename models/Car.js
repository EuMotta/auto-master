import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    brand: { type: String, required: false },
    model: { type: String, required: false },
    fueltype: { type: String, required: false },
    hodometro: { type: Number, required: false },
    color: { type: String, required: false },
    year: { type: String, required: false },
    licensePlate: { type: String, required: false, unique: true},
    chassis: { type: String, required: false },
    headlights: {
      model: { type: String, required: false },
      buyDate: { type: String, required: false },
    },
    tires: {
      brand: { type: String, required: false },
      frontSize: { type: Number, required: false },
      rearSize: { type: Number, required: false },
    },
    test: [
      {
        title: { type: String, required: false },
        options: [
          {
            title: { type: String, required: false },
            value: { type: String, required: false },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;
