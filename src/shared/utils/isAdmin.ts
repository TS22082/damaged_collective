import { type Signal } from "@builder.io/qwik";
import { type Session } from "@auth/qwik";

const checkIsAdmin = (
  session: Readonly<Signal<null>> | Readonly<Signal<Session>>
) => {
  const adminList = ["ts22082@gmail.com"];

  if (!session.value?.user?.email) return false;
  if (typeof session.value.user.email !== "string") return false;

  console.log("dafuq?");
  return adminList.includes(session.value.user.email);
};

export default checkIsAdmin;
