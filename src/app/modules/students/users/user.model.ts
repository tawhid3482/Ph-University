import { Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  id: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, required: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user', 'faculty'],
      message: 'Role is required',
    },
  },
  status: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});
