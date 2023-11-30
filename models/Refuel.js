import mongoose from 'mongoose';

const refuelSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    local: { type: String },
    distance: { type: String, required: false },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const Refuel = mongoose.models.Refuel || mongoose.model('Refuel', refuelSchema);

export default Refuel;
