import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: false },
    cpf: { type: String, required: false },
    rg: { type: String, required: false },
    email: { type: String, required: true },
    endereco: { type: String, required: false },
    cidade: { type: String, required: false },
    estado: { type: String, required: false },
    password: { type: String, required: true },
    cep: { type: String, required: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
