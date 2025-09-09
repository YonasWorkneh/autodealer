"use client";

import { getUser } from "@/lib/auth/signin";
import { useUserStore } from "@/store/user";
import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "./loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Session({ children }: { children: ReactElement }) {
  const { setUser } = useUserStore();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (err: any) {
        alert("Error setting user");
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {isLoadingUser ? <Loading /> : <>{children}</>}
    </QueryClientProvider>
  );
}
