import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GetApp() {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-20 pb-56">
      {/* Heading */}
      <div className="flex justify-center mb-10 relative">
        <h1 className="text-xl sm:text-2xl text-center uppercase relative">
          Get App
          <span className="absolute top-1/2 left-[-80px] w-16 border-t border-black/20 -translate-y-1/2 hidden md:inline-block" />
          <span className="absolute top-1/2 right-[-80px] w-16 border-t border-black/20 -translate-y-1/2 hidden md:inline-block" />
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-40 mt-10">
        {/* Text Section */}
        <div className="text-center lg:text-left">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-800">
            Get our top rated app!
          </p>
          <p className="mt-4 mb-4 text-lg sm:text-xl">
            Over <span className="underline">1000+</span> downloads
          </p>

          {/* Store Buttons */}
          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            <Link href={"#"}>
              <Image
                src={"/app.svg"}
                alt="download-on-app-store"
                width={150}
                height={50}
                className="w-[120px] sm:w-[140px] md:w-[150px] h-auto"
              />
            </Link>
            <Link href={"#"}>
              <Image
                src={"/google.svg"}
                alt="download-on-play-store"
                width={150}
                height={50}
                className="w-[120px] sm:w-[140px] md:w-[150px] h-auto"
              />
            </Link>
          </div>
        </div>

        {/* App Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={"/mobile.jpg"}
            alt="app-image"
            width={350}
            height={700}
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
