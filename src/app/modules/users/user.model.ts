import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
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

// checking
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id }).select('+password');
};

// userSchema.statics.isUserExistsByCustomId = async function (id: string){
//   return await bcrypt.compare(payload?.password, isUserExists?.password)
// };

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const userModel = model<TUser, UserModel>('user', userSchema);
