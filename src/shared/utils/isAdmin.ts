import { type Signal } from "@builder.io/qwik";
import { type Session } from "@auth/qwik";

const checkIsAdmin = (
  session: Readonly<Signal<null>> | Readonly<Signal<Session>>
) => {
  const adminList = ["ts22082@gmail.com"];
  return adminList.includes(session.value?.user?.email as string);
};

export default checkIsAdmin;
