import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    options: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Part = mongoose.models.Part || mongoose.model('Part', userSchema);

export default Part;
