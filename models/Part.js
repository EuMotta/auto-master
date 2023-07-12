import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    title: { type: String, required: false },
    options: [
      {
        title: { type: String, required: false },
        value: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Part = mongoose.models.Part || mongoose.model('Part', userSchema);

export default Part;
