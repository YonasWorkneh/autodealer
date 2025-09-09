"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, LucideLogOut, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { useUserStore } from "@/store/user";
import { logout } from "@/lib/auth/logout";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { user, setUser } = useUserStore();
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);
  const [email, setEmail] = useState<string>(user.email);

  const [loggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      const wait = (t: number) =>
        new Promise<void>((res) => setTimeout(res, t * 1000));
      await wait(2);
      setUser({ first_name: "", last_name: "", email: "" });
      router.push("/");
    } catch (err) {
      // toast error message
      console.error("error ");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Header color="black" />
      <div className="bg-white overflow-hidden px-70 py-10">
        {/* Header with gradient background */}

        <div className="relative h-48 bg-gradient-to-r from-zinc-200 via-zinc-900/20 to-gray-200 rounded-t-xl" />

        {/* Profile section */}
        <div className="relative px-6 pb-6 -mt-10">
          {/* Avatar positioned to overlap header */}
          <div className="relative">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src="/professional-woman-with-braids.png"
                  alt="Sienna Hewitt"
                />
                <AvatarFallback className="text-xl font-semibold bg-gray-100 uppercase">
                  {user.first_name
                    ? user.first_name?.[0] + user.last_name?.[0]
                    : user.email[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* User info */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-black">
                {user.first_name &&
                  user.first_name + " " + user.last_name &&
                  user.last_name}
              </h1>
            </div>
            <p className="text-gray-600 mb-6">{email}</p>

            {/* Form fields */}
            <div className="space-y-6">
              {/* Name fields */}
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-black mb-3 block"
                >
                  Name
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-8"
                  />
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-8"
                  />
                </div>
              </div>

              {/* Email field & phone number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-black mb-3 block"
                  >
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-8"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="contact"
                    className="text-sm font-medium text-black mb-3 block"
                  >
                    Contact Phone
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="contact"
                      type="contact"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-6 mt-8 pt-6 border-t border-gray-200">
              <Button
                className="bg-gray-50 text-black hover:bg-gray-100 p-6 cursor-pointer text-base rounded-sm flex items-center gap-2 border border-gray-200 w-[120px]"
                onClick={handleLogout}
              >
                {loggingOut ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <LucideLogOut />
                    <span>Log out</span>
                  </>
                )}
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 p-6 cursor-pointer text-base rounded-sm">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
