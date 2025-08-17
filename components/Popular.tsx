import React from "react";
import CarCard from "./CarCard";
import { Card } from "./ui/card";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Popular() {
  const cars = [
    {
      id: "vw-id6",
      title: "Volkswagen-ID6",
      backgroundTitle: "Volkswagen",
      km: 0,
      transmission: "Automatic",
      price: 6000000,
      image: "/id6-orange.png",
      colors: [],
      selectedColor: 0,
    },
    {
      id: "mercedes-gla",
      title: "BYD-SONG",
      backgroundTitle: "BYD",
      km: 0,
      transmission: "Automatic",
      price: 4_900_000,
      image: "/byd-song.png",
      colors: [],
      selectedColor: 0,
    },
    {
      id: "dza",
      title: "Dzire",
      backgroundTitle: "Suzuki",
      km: 10535,
      transmission: "Automatic",
      price: 2_040_000,
      image: "/dzire.webp",
      colors: [],
      selectedColor: 1,
    },
    {
      id: "jt-1",
      title: "Jetour-T1",
      backgroundTitle: "Jetour",
      km: 0,
      transmission: "Automatic",
      price: 16_040_000,
      image: "/jetour.png",
      colors: [],
      selectedColor: 1,
    },
    {
      id: "mercedes-glaa",
      title: "BYD-SONG",
      backgroundTitle: "BYD",
      km: 0,
      transmission: "Automatic",
      price: 4_900_000,
      image: "/byd-song.png",
      colors: [],
      selectedColor: 0,
    },
    {
      id: "v8",
      title: "Toyota-v8",
      backgroundTitle: "Toyota",
      km: 5000,
      transmission: "Manual/Automatic",
      price: 10_400_000,
      image: "/v8.png",
      colors: [],
      selectedColor: 1,
    },
    {
      id: "niss",
      title: "Nissan-Patrol",
      backgroundTitle: "Nissan",
      km: 10000,
      transmission: "Manual/Automatic",
      price: 18_400_000,
      image: "/niss.png",
      colors: [],
      selectedColor: 1,
    },
    {
      id: "dz",
      title: "Dzire",
      backgroundTitle: "Suzuki",
      km: 10535,
      transmission: "Automatic",
      price: 2_040_000,
      image: "/dzire.webp",
      colors: [],
      selectedColor: 1,
    },
    {
      id: "invi",
      title: "Toyota-Invincible",
      backgroundTitle: "Toyota",
      km: 0,
      transmission: "Manual/Automatic",
      price: 8_500_000,
      image: "/invincible.png",
      colors: [],
      selectedColor: 1,
    },
  ];
  return (
    <div className="min-h-screen px-40">
      <div className="flex justify-center mb-10">
        <h1 className="text-xl text-center w-fit after:content-[''] after:inline-block after:w-[100px] after:absolute after:right-[-120px] after:top-[15px] after:border after:h-[1px] before:content-[''] before:inline-block before:w-[100px] before:absolute before:left-[-120px] before:top-[15px] before:border before:h-[1px] before:border-black/20 after:border-black/20 relative uppercase">
          Popular Cars
        </h1>
      </div>
      {/* <p className="text-xl mb-10 mt-2 text-black/60">
        These are some of the popular cars in our site.
      </p> */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-20 mb-5">
        {cars.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm"
          >
            <CarCard
              title={car.title}
              backgroundTitle={car.backgroundTitle}
              km={car.km}
              transmission={car.transmission}
              price={car.price}
              image={car.image}
              colors={car.colors}
              selectedColor={car.selectedColor}
              href="/listing/gibberish"
            />
          </Card>
        ))}
        <div className="flex items-center ml-10">
          <Link
            href={"/listing"}
            className="group h-[50px] bg-zinc-800 hover:bg-zinc-900 rounded-md text-white p-1 w-fit cursor-pointer flex gap-2 items-center px-3"
          >
            <span>View more</span>
            <span className="group-hover:translate-x-1 transition-all">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
