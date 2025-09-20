"use server";

import { cookies } from "next/headers";

export const getCredentials = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;
  return { access, refresh };
};
