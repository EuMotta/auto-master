import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    partId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part',
        required: true,
      },
    ],
    total: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
