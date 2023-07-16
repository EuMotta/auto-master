import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
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
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Maintenance = mongoose.models.Maintenance
  || mongoose.model('Maintenance', maintenanceSchema);

export default Maintenance;
