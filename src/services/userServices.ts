import { User } from "../models/user";

const createuserService = async (email: string, password: string) => {
  const user = new User({ email, password });
  return user.save();
};

const findUser = async (id: string) => {
  return await User.findById(id);
};

const findUserByEmailService = async (email: string) => {
  return await User.findOne({ email });
};

export { createuserService, findUserByEmailService, findUser };
