"use server";
import { cookies } from "next/headers";

export const logout = async () => {
  const cokiess = await cookies();
  cokiess.delete("access");
  cokiess.delete("refresh");
};
