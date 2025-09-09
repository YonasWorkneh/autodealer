import React from "react";
import CarCard from "./CarCard";
import { Card } from "./ui/card";
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
      price: 4900000,
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
      price: 2040000,
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
      price: 16040000,
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
      price: 4900000,
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
      price: 10400000,
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
      price: 18400000,
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
      price: 2040000,
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
      price: 8500000,
      image: "/invincible.png",
      colors: [],
      selectedColor: 1,
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-20">
      {/* Heading */}
      <div className="flex justify-center mb-10 relative">
        <h1 className="text-xl sm:text-2xl text-center uppercase relative">
          Popular Cars
          <span className="absolute top-1/2 left-[-80px] w-16 border-t border-black/20 -translate-y-1/2 hidden md:inline-block" />
          <span className="absolute top-1/2 right-[-80px] w-16 border-t border-black/20 -translate-y-1/2 hidden md:inline-block" />
        </h1>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* View More */}
        <div className="flex justify-center sm:justify-start mt-4 sm:mt-0">
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
