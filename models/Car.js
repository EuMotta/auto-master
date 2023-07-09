import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  { 
    brand: { type: String, required: false },
    model: { type: String, required: false },
    fueltype: { type: String, required: false },
    hodometro:  { type: Number, required: false },
    color: { type: String, required: false },
    year: { type: String, required: false },
    licensePlate:  { type: String, required: false },
    chassis:  { type: String, required: false },
    headlights: {
        model: { type: String, required: false },
        buyDate:  { type: String, required: true }
    },
    tires: {
        brand:  { type: String, required: true },
        frontSize:  { type: Number, required: true },
        rearSize:  { type: Number, required: true }
    },
    test: [
        {
            title: { type: String, required: true },
            options: [
                {
                    title: { type: String, required: true },
                    value: { type: String, required: true }
                }
            ]
        }
    ] 
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;
