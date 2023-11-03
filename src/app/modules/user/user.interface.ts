/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  _id?: string;
  name: UserName;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  role: string;

  // test: Types.ObjectId | ITest
};
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
