import { Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['UPCOMING', 'ONGOING', 'ENDED'],
        message: '{VALUE} is required',
      },
      default: 'UPCOMING',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    maxCredit: {
      type: Number,
      default: 3,
    },
    minCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);
