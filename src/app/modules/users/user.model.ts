import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, unique: true, required: true },
    password: { type: String },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
        message: 'Role is required',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: 'status is required',
      },
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
// pre save middleware/hook : will work on create() save()
userSchema.pre('save', async function (next) {
  // hashing password and save into db

  const user = this; // ai this mane holo current j document post hote jaitase seta
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save middleware/hook
userSchema.post('save', function (doc, next) {
  (doc.password = ''), // document save hobar por password empty string dakhabe krn password kau k dakhano jabe na.
    next();
});

export const userModel = model<TUser>('user', userSchema);
