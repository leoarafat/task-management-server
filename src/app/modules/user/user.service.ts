/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiError from '../../../errors/Apierror';
import { IUser } from './user.interface';
import User from './user.model';

//! create user
const createUser = async (userData: IUser): Promise<IUser | null> => {
  const isEmailExist = await User.findOne({ email: userData.email });

  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }
  const newUser = await User.create(userData);
  return newUser;
};
//! Get Users
const getUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};
//! Get Single User
const getSingleUser = async (id: any): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
//! Update user
const updateUser = async (
  id: any,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'User does not found!');
  }

  const { ...UserData } = payload;

  const updatedUserData: Partial<IUser> = { ...UserData };

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

//! Delete User
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
export const UserService = {
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getUsers,
};
