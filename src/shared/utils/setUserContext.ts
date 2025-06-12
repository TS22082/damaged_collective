import type { UserType } from "../types";

export const setUserContext = (
  user: { value: null | UserType },
  localStoredUser: null | UserType
) => {
  user.value = localStoredUser;
};
