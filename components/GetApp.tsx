import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GetApp() {
  return (
    <div className="px-40 py-20 pb-56">
      <div className="flex justify-center mb-10">
        <h1 className="text-xl text-center w-fit after:content-[''] after:inline-block after:w-[100px] after:absolute after:right-[-120px] after:top-[15px] after:border after:h-[1px] before:content-[''] before:inline-block before:w-[100px] before:absolute before:left-[-120px] before:top-[15px] before:border before:h-[1px] before:border-black/20 after:border-black/20 relative uppercase">
          Get App
        </h1>
      </div>
      <div className="flex items-center gap-40 lg:flex-row flex-col mt-10 ">
        <div>
          <p className="text-5xl font-bold text-zinc-800">
            Get our top rated app !
          </p>
          <p className="mt-4 mb-4 text-xl">
            Over <span className="underline">1000+</span> downloads
          </p>
          <div className="flex gap-2 items-center -ml-[10px] mt-10 ">
            <Link href={"#"}>
              <Image
                src={"/app.svg"}
                alt="download-on-app-store"
                width={20}
                height={20}
                className="w-[150px] h-[100px]"
              />
            </Link>
            <Link href={"#"}>
              <Image
                src={"/google.svg"}
                alt="download-on-play-store"
                width={20}
                height={20}
                className="w-[150px] h-[100px]"
              />
            </Link>
          </div>
        </div>
        <Image
          src={"/mobile.jpg"}
          alt="app-image"
          width={100}
          height={100}
          className="w-[350px] h-auto"
        />
      </div>
    </div>
  );
}
