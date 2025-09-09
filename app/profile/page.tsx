"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, LucideLogOut, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { useUserStore } from "@/store/user";
import { logout } from "@/lib/auth/logout";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { user, setUser } = useUserStore();
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);
  const [email, setEmail] = useState<string>(user.email);
  const [contact, setContact] = useState<string>(user.contact ?? "");

  const [loggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      await new Promise((res) => setTimeout(res, 2000)); // simulate delay
      setUser({ first_name: "", last_name: "", email: "", contact: "" });
      router.push("/");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Header color="black" />
      <div className="bg-white overflow-hidden px-6 sm:px-10 lg:px-20 py-10">
        {/* Header background */}
        <div className="relative h-48 bg-gradient-to-r from-zinc-200 via-zinc-900/20 to-gray-200 rounded-t-xl" />

        {/* Profile section */}
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

          {/* User info */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-black mb-2">
              {[user.first_name, user.last_name].filter(Boolean).join(" ") ||
                " "}
            </h1>
            <p className="text-gray-600 mb-6">{email}</p>

            {/* Form */}
            <div className="space-y-6">
              {/* Name fields */}
              <div>
                <Label className="text-sm font-medium text-black mb-3 block">
                  Name
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
                  />
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
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
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+251 912 345 678"
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black py-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto py-6"
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
              <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto py-6">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
