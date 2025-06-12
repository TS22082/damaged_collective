import type { UserType } from "../types";

export const setUser = (
  user: { value: null | UserType },
  localStoredUser: null | UserType
) => {
  user.value = localStoredUser;
};
