import { Schema, model, connect } from 'mongoose';

export type TStudent = {
    name: {
        firstName:string;
        middleName:string;
        lastName:string;
    };
    email: string;
    gender:"male"|"female";
    avatar?: string;
  }