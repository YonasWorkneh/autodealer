import { Smile } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen px-40 py-20">
      <div className="flex justify-center mb-10">
        <h1 className="text-xl text-center w-fit after:content-[''] after:inline-block after:w-[100px] after:absolute after:right-[-120px] after:top-[15px] after:border after:h-[1px] before:content-[''] before:inline-block before:w-[100px] before:absolute before:left-[-120px] before:top-[15px] before:border before:h-[1px] before:border-black/20 after:border-black/20 relative uppercase">
          About us
        </h1>
      </div>
      <div className="grid grid-cols-[3fr_1fr]">
        <h2 className="text-5xl mt-10 w-fit">
          Instant, accurate, and reliable dealership <br /> of any vehicle you
          want at your fingertips
        </h2>
        <div className="mt-10">
          <div className="flex">
            <Image
              src={"/sales.jpeg"}
              alt="user-img"
              className="size-10 border border-black/10 object-cover rounded-full inline-block"
              width={10}
              height={10}
            />
            <Image
              src={"/sales3.jpg"}
              alt="user-img"
              className="size-10 border border-black/10 object-cover -ml-3 rounded-full inline-block"
              width={10}
              height={10}
            />
            <Image
              src={"/sales2.jpeg"}
              alt="user-img"
              className="size-10 border border-black/10 object-cover -ml-3 rounded-full inline-block"
              width={10}
              height={10}
            />
          </div>
          <p className="text-sm w-[280px] mt-4 text-black/40">
            Our professional team will help you make an informed decision before
            purchase of any vehicle{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <div className="relative">
          <Image
            src={"/white.avif"}
            //   src={"/invincible.jpg"}
            //   src={"/purple-jetour.jpg"}
            alt="white-audi"
            width={100}
            height={100}
            className="w-[1000px] bg-black/10"
          />
          <div className="bg-white w-[250px] border border-black/10 p-4 rounded-xl absolute top-1/4 left-1/5">
            <span className="flex justify-center items-center bg-black rounded-2xl p-3 w-fit">
              <Smile className="text-white" />
            </span>
            <h3 className="mt-5 mb-2 text-xl font-semibold">Easy to use</h3>
            <p className="text-sm text-black/60">
              Simply search for your favourite vehicle , gather as many
              information as possible and contact our sales or the dealer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
