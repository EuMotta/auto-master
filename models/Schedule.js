import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    partId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part',
      required: true,
    },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    isReocurrent: { type: Boolean, required: true },
    status: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

export default Schedule;
