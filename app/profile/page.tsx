"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, LucideLogOut, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { useUserStore } from "@/store/user";
import { logout } from "@/lib/auth/logout";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { useForm } from "react-hook-form";

type ProfileFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
};

export default function UserProfile() {
  const { user, setUser } = useUserStore();
  const [loggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact: user.contact ?? "",
    },
  });

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      await new Promise((res) => setTimeout(res, 2000));
      setUser({ first_name: "", last_name: "", email: "", contact: "" });
      router.push("/");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // TODO: call API to save updates
      console.log("Form submitted:", data);
      setUser(data); // update local store
    } catch (err) {
      console.error("Save profile error", err);
    }
  };

  useEffect(() => {
    if (!user.email) router.push("/signin");
    else reset(user); // reset form if user changes
  }, [user, reset, router]);

  if (!user.email) return <Loading />;

  return (
    <>
      <Header color="black" />
      <div className="bg-white overflow-hidden px-6 sm:px-10 lg:px-50 py-10">
        <div className="relative h-48 bg-gradient-to-r from-zinc-200 via-zinc-900/20 to-gray-200 rounded-t-xl" />

        <div className="relative px-6 pb-6 -mt-10">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage
              src="/professional-woman-with-braids.png"
              alt="Profile"
            />
            <AvatarFallback className="text-xl font-semibold bg-gray-100 uppercase">
              {user.first_name
                ? `${user.first_name[0]}${user.last_name?.[0] ?? ""}`
                : user.email[0]}
            </AvatarFallback>
          </Avatar>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <h1 className="text-2xl font-bold text-black mb-2">
              {[user.first_name, user.last_name].filter(Boolean).join(" ") ||
                " "}
            </h1>
            <p className="text-gray-600 mb-6">{user.email}</p>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <Label className="text-sm font-medium text-black mb-3 block">
                  Name
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    id="firstName"
                    placeholder="First name"
                    className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
                    {...register("first_name")}
                  />
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
                    {...register("last_name")}
                  />
                </div>
              </div>

              {/* Email + Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-black mb-3 block">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-black mb-3 block">
                    Contact Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="+251 912 345 678"
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
                      {...register("contact")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2 w-full sm:w-auto py-6 min-w-[100px]"
                onClick={handleLogout}
              >
                {loggingOut ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <LucideLogOut size={16} />
                    <span>Log out</span>
                  </>
                )}
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto py-6"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
