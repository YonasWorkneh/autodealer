import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";

interface HeaderProps {
  color?: string;
}

export default function Header({ color }: HeaderProps) {
  const { user } = useUserStore();
  return (
    <header
      className={`relative z-10 flex items-center justify-between px-40 py-4 ${
        color === "black" && "border-b"
      }`}
    >
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

      <div className="flex items-center space-x-6">
        <Link
          href={"/listing"}
          className={` ${
            color === "black"
              ? "text-black hover:text-black/60"
              : "text-white hover:text-white/80"
          }  p-2 px-4 rounded-md cursor-pointer`}
        >
          All-listing
        </Link>{" "}
        <Link
          href={"/favorites"}
          className={` ${
            color === "black"
              ? "text-black hover:text-black/60"
              : "text-white hover:text-white/80"
          }  p-2 px-4 rounded-md cursor-pointer`}
        >
          Favourites
        </Link>
        <Link
          href={user.email ? "profile" : "/signin"}
          className={` ${
            color === "black"
              ? "text-black hover:text-black/60"
              : "text-white hover:text-white/80"
          }  p-2 px-4 rounded-md cursor-pointer`}
        >
          {user.email ? (
            <span
              className={`${
                color === "black"
                  ? "bg-zinc-800 hover:bg-zinc-900 text-white"
                  : " bg-white/10 hover:bg-white/20"
              } size-10 flex justify-center items-center rounded-full uppercase`}
            >
              {user.email[0]}
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
              console.log("prevented");
              e.preventDefault();
              toast.error("Log in or create an account to sell your car.");
            }
          }}
        >
          Sell my Car
        </Link>
      </div>
    </header>
  );
}
