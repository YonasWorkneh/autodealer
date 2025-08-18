import React from "react";
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
  console.log(user);
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
        <div className="relative">
          <Input
            placeholder="Search..."
            className={`w-64  ${
              color === "black"
                ? "text-black placeholder:text-black/70"
                : "text-white placeholder:text-white/70 bg-white/10 border-white/20"
            }  pr-10`}
          />
          <Search
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              color === "black" ? "text-black/70" : "text-white/70"
            } `}
          />
        </div>
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
          href={user.first_name ? "profile" : "/signin"}
          className={` ${
            color === "black"
              ? "text-black hover:text-black/60"
              : "text-white hover:text-white/80"
          }  p-2 px-4 rounded-md cursor-pointer`}
        >
          {user.first_name ? (
            <span
              className={`${
                color === "black"
                  ? "bg-zinc-800 hover:bg-zinc-900 text-white"
                  : " bg-white/10 hover:bg-white/20"
              } size-10 flex justify-center items-center rounded-full`}
            >
              {user.first_name[0] + user.last_name[0]}
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
            if (!user.first_name) {
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
