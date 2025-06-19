import { type Signal } from "@builder.io/qwik";
import { type UserType } from "../types";

const isAdmin = (user: Signal<UserType | null>) => {
  const adminList = ["ts22082@gmail.com"];
  if (!user.value?.email) return false;
  return adminList.includes(user.value.email);
};

export default isAdmin;
