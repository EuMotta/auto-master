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
    /* headlights: {
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
    ], */
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;
