// app/api/session/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh")?.value || null;
  const access = cookieStore.get("access")?.value || null;
  return Response.json({ refresh, access });
}
