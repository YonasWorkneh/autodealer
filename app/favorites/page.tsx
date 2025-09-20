"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Image from "next/image";
import { Heart, X } from "lucide-react";

interface Car {
  id: number;
  name: string;
  year: number;
  price: number;
  image: string;
  isFavorite?: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Volkswagen-ID6",
    year: 2016,
    price: 99000,
    image: "/id6-orange.png",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Invincible",
    year: 2015,
    price: 85000,
    image: "/invincible.png",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Toyota V8",
    year: 2020,
    price: 85000,
    image: "/v8.png",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Jetour T1",
    year: 2016,
    price: 123000,
    image: "/jetour.png",
    isFavorite: true,
  },
  {
    id: 5,
    name: "BYD-Song",
    year: 2018,
    price: 92000,
    image: "/byd-song.png",
    isFavorite: true,
  },
];

export default function FavoritesPage() {
  const [carList, setCarList] = useState(cars);

  const toggleFavorite = (carId: number) => {
    setCarList((prev) =>
      prev.map((car) =>
        car.id === carId ? { ...car, isFavorite: !car.isFavorite } : car
      )
    );
  };

  const removeCar = (carId: number) => {
    setCarList((prev) => prev.filter((car) => car.id !== carId));
  };

  return (
    <>
      <Header color="black" />
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-50 py-8 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">
            Favorites ({carList.length})
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            These are the cars you have marked as favorites.
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carList.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onToggleFavorite={() => toggleFavorite(car.id)}
              onRemove={() => removeCar(car.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

interface CarCardProps {
  car: Car;
  onToggleFavorite: () => void;
  onRemove: () => void;
}

const CarCard = ({ car, onToggleFavorite, onRemove }: CarCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden bg-white border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Car Image */}
      <div className="relative w-full h-56 sm:h-64 lg:h-48 bg-gray-100 overflow-hidden">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={`${car.name} ${car.year}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
          {car.name} {car.year}
        </h3>

        <p className="text-gray-700 font-bold text-lg mb-3">${car.price}</p>

        <Button
          variant="outline"
          className={`flex w-full items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white transition-colors`}
          onClick={hovered ? onRemove : onToggleFavorite}
        >
          {hovered ? <X className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
          {hovered ? "Remove" : "Favorite"}
        </Button>
      </CardContent>
    </Card>
  );
};
