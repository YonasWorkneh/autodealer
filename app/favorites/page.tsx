"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, X, Grid3X3, List, Star } from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";

interface Car {
  id: number;
  name: string;
  year: number;
  price: number;
  bidPrice?: number;
  image: string;
  type: string;
  condition: string;
  kilometers: string;
  location: string;
  flag: string;
  rating: number;
  reviews: number;
  verified?: boolean;
  isFavorite?: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Volkswagen-ID6",
    year: 2016,
    price: 99000,
    image: "/id6-orange.png",
    type: "Sedan",
    condition: "Used Car",
    kilometers: "49,000 km",
    location: "New-York",
    flag: "🇺🇸",
    rating: 2,
    reviews: 23,
    verified: true,
    isFavorite: true,
  },
  {
    id: 2,
    name: "Invincible",
    year: 2015,
    price: 85000,
    image: "/invincible.png",
    type: "SUV",
    condition: "New Vehicle",
    kilometers: "0,000 km",
    location: "London",
    flag: "🇬🇧",
    rating: 0,
    reviews: 0,
    isFavorite: false,
  },
  {
    id: 3,
    name: "Toyota V8",
    year: 2020,
    bidPrice: 77000,
    price: 85000,
    image: "/v8.png",
    type: "Sedan",
    condition: "Used Car",
    kilometers: "0,000 km",
    location: "London",
    flag: "🇬🇧",
    rating: 2,
    reviews: 11,
    isFavorite: true,
  },
  {
    id: 4,
    name: "Jetour T1",
    year: 2016,
    price: 123000,
    image: "/jetour.png",
    type: "Coupe",
    condition: "Used Car",
    kilometers: "32,000 km",
    location: "New-York",
    flag: "🇺🇸",
    rating: 5,
    reviews: 7,
    verified: true,
    isFavorite: true,
  },
  {
    id: 5,
    name: "BYD-Song",
    year: 2018,
    price: 92000,
    image: "/byd-song.png",
    type: "SUV",
    condition: "Used Car",
    kilometers: "9,890 km",
    location: "Los Angeles",
    flag: "🇺🇸",
    rating: 5,
    reviews: 3,
    isFavorite: true,
  },
];

export default function page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date-down");
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-orange-400 text-orange-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  const renderPriceRating = (price: number) => {
    const rating = Math.min(5, Math.floor(price / 25000) + 1);
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-black" : "text-gray-300"}`}
      >
        $
      </span>
    ));
  };

  return (
    <>
      <Header color="black" />
      <div className="p-6 px-40 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-black">
            Favorites ({carList.length})
          </h1>
          <p className="text-gray-500 text-sm mt-5">
            These are the list of cars you made favourite.
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carList.map((car) => {
            const [hovered, setHovered] = useState<boolean>(false);
            return (
              <Card
                key={car.id}
                className="overflow-hidden bg-white border border-gray-200 shadow-sm"
              >
                {/* Car Image with Price Overlay */}
                <div className="relative">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.name} ${car.year}`}
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <CardContent className="p-4">
                  {/* Car Title */}
                  <h3 className="font-semibold text-lg text-black mb-3">
                    {car.name} {car.year}
                  </h3>

                  {/* Car Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <h2 className="text-2xl font-bold">${car.price}</h2>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className={`flex-1 border-gray-300 text-gray-700  bg-transparent cursor-pointer hover:bg-red-500 hover:text-white`}
                      onMouseOver={() => setHovered(true)}
                      onMouseOut={() => setHovered(false)}
                    >
                      {hovered ? (
                        <X className="w-4 h-4 mr-2 fill-current" />
                      ) : (
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                      )}
                      {hovered ? "Remove" : "Favourites"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
