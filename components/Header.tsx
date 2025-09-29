"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/store/user";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/profile";

interface HeaderProps {
  color?: string;
}

export default function Header({ color }: HeaderProps) {
  const { user } = useUserStore();
  const { data: profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (isBtn?: boolean) =>
    `${
      color === "black"
        ? "text-black hover:text-black/60"
        : "text-white hover:text-white/80"
    } p-2 px-4 rounded-md cursor-pointer ${isBtn ? "" : ""}`;

  const { toast } = useToast();

  return (
    <header
      className={`relative z-20 flex items-center justify-between px-6 md:px-40 py-4 ${
        color === "black" && "border-b"
      }`}
    >
      {/* Logo */}
      <Link href={"/"} className="flex items-center space-x-2 cursor-pointer">
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <Image
            src={color === "black" ? "/wheel.png" : "/wheel copy.png"}
            alt="wheel"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
        <span
          className={`${
            color === "black" ? "text-black" : "text-white"
          } text-xl font-semibold`}
        >
          AUTO&mdash;DEALER
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href={"/listing"} className={linkClasses()}>
          All-listing
        </Link>
        <Link href={"/auction"} className={linkClasses()}>
          Auctions
        </Link>
        <Link href={"/favorites"} className={linkClasses()}>
          Favourites
        </Link>
        <Link href={"/mylistings"} className={linkClasses()}>
          My Ads
        </Link>
        <Link
          href={user.email ? "profile" : "/signin"}
          className={linkClasses()}
        >
          {user.email || profile?.first_name ? (
            <span
              className={`${
                color === "black"
                  ? "bg-zinc-800 hover:bg-zinc-900 text-white"
                  : " bg-white/10 hover:bg-white/20"
              } size-10 flex justify-center items-center rounded-full uppercase`}
            >
              {profile?.first_name[0] || user.email[0]}
            </span>
          ) : (
            "Signin"
          )}
        </Link>
        <Link
          href={"/place-add"}
          className={`text-white ${
            color === "black"
              ? " bg-zinc-800 hover:bg-zinc-900"
              : " bg-white/10 hover:bg-white/20"
          } p-2 px-4 rounded-md cursor-pointer`}
          onClick={(e) => {
            if (!user.email) {
              e.preventDefault();
              toast({
                // title: "",
                description:
                  "❌   Log in or create an account to sell your car.",
              });
            }
          }}
        >
          Sell my Car
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden"
        aria-label="Open Menu"
      >
        <Menu
          className={`h-7 w-7 ${
            color === "black" ? "text-black" : "text-white"
          }`}
        />
      </button>

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-30 flex">
            {/* Overlay */}
            <motion.div
              className="flex-1 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }} // enter from right
              animate={{ x: 0 }}
              exit={{ x: "100%" }} // leave to left
              transition={{ type: "tween", duration: 0.4 }}
              className="w-64 h-full bg-white p-6 flex flex-col space-y-6 shadow-xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-gray-700"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6" />
              </button>

              <Link
                href={"/listing"}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-gray-500"
              >
                All-listing
              </Link>
              <Link
                href={"/auction"}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-gray-500"
              >
                Auctions
              </Link>
              <Link
                href={"/favorites"}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-gray-500"
              >
                Favourites
              </Link>
              <Link
                href={user.email ? "profile" : "/signin"}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-gray-500"
              >
                {user.email ? `Profile (${user.email})` : "Signin"}
              </Link>
              <Link
                href={"/place-add"}
                onClick={(e) => {
                  if (!user.email) {
                    e.preventDefault();
                    toast({
                      // title: "",
                      description:
                        "❌ Log in or create an account to sell your car.",
                    });
                    return;
                  }
                  setIsOpen(false);
                }}
                className="bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-zinc-900"
              >
                Sell my Car
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
