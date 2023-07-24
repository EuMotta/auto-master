import mongoose from 'mongoose';

const functionalitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    isEnabled: { type: Boolean, required: true, default: false },
  },
);

const Functionality = mongoose.models.Functionality || mongoose.model('Functionality', functionalitySchema);

export default Functionality;
