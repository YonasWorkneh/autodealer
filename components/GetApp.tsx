import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GetApp() {
  return (
    <div className="px-40 py-20 pb-56">
      <h4 className="text-xl flex items-center gap-2">
        <span className="inline-block size-3 bg-black rounded-full"></span>
        <span>Get App</span>
      </h4>
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
