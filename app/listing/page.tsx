"use client";

import { Search, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { CarDetailModal } from "./CarDetailModal";

export default function CarMarketplace() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [detailOpened, setDetailOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const cars = [
    {
      id: 1,
      year: 2024,
      make: "Jeep",
      model: "Grand Cherokee Limited",
      mileage: "39,514 Miles",
      location: "Live Oak, TX",
      price: "$26,999",
      monthlyEst: "$467/mo",
      daysOnMarket: 104,
      percentLess: "45% less than similar listings",
      image: "/2024-black-jeep-grand-cherokee.png",
    },
    {
      id: 2,
      year: 2024,
      make: "Kia",
      model: "Forte LXS",
      mileage: "33,770 Miles",
      location: "Austin, TX",
      price: "$16,724",
      monthlyEst: "$289/mo",
      daysOnMarket: 11,
      percentLess: "20% less than similar listings",
      image: "/2024-red-kia-forte-sedan.png",
    },
    {
      id: 3,
      year: 2025,
      make: "Chevrolet",
      model: "Colorado WT/LT",
      mileage: "New",
      location: "Austin, TX",
      price: "$38,659",
      monthlyEst: "$669/mo",
      daysOnMarket: 189,
      percentLess: null,
      image: "/2025-white-chevy-colorado.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header color="black" />

      <div className="pt-16">
        <div className="px-40 sm:px-6 lg:px-40 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-0">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-black border-black hover:bg-black hover:text-white bg-transparent"
                      >
                        Clear filters
                      </Button>
                    </div>

                    {/* Make & Model */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-black mb-3">
                        MAKE, MODEL & TRIM
                      </h3>
                      <Select>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="All makes & models" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All makes & models
                          </SelectItem>
                          <SelectItem value="jeep">Jeep</SelectItem>
                          <SelectItem value="kia">Kia</SelectItem>
                          <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Year Range */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-black mb-3">
                        YEAR RANGE
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Input
                          placeholder="1940"
                          className="text-sm border-gray-300"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          placeholder="2026"
                          className="text-sm border-gray-300"
                        />
                      </div>
                      <Slider
                        defaultValue={[1940, 2026]}
                        max={2026}
                        min={1940}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-black mb-3">
                        PRICE RANGE
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Input
                          placeholder="$0"
                          className="text-sm border-gray-300"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          placeholder="$100,000+"
                          className="text-sm border-gray-300"
                        />
                      </div>
                      <Slider
                        defaultValue={[0, 100000]}
                        max={100000}
                        min={0}
                        step={1000}
                        className="w-full"
                      />
                    </div>

                    {/* Max Mileage */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-black mb-3">
                        MAX MILEAGE
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Input
                          placeholder="0 mi."
                          className="text-sm border-gray-300"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          placeholder="300,000+ mi."
                          className="text-sm border-gray-300"
                        />
                      </div>
                      <Slider
                        defaultValue={[0, 300000]}
                        max={300000}
                        min={0}
                        step={1000}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="sticky top-0 bg-white z-40 pb-4 mb-6">
                <Card className="border-gray-200 rounded-3xl shadow-none py-0">
                  <CardContent className="flex justify-between items-center">
                    {/* Search Bar */}
                    <div className="py-5">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          placeholder="Search by make, model, or body style"
                          className="pl-10 h-12 text-lg border-none shadow-none focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 placeholder:text-base w-[450px]"
                        />
                      </div>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col border-l border-gray-200 py-5 justify-center items-center">
                      <p className="font-bold text-xs text-center uppercase">
                        Sort By
                      </p>
                      <Select>
                        <SelectTrigger className="w-32 border-none shadow-none focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 text-center">
                          <SelectValue placeholder="Best match" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="best font-bold">
                            Best match
                          </SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-black">90,853</h2>
                <p className="text-gray-600">vehicles found</p>
              </div>

              {/* Car Listings */}
              <div className="space-y-4">
                {cars.map((car) => (
                  <Link
                    href={"/listing/gibberish"}
                    className="cursor-pointer relative"
                    key={car.id}
                  >
                    {/* right side icon */}
                    <div
                      className="flex flex-col gap-1 absolute top-[calc(50%-20px)] right-[-10px] border rounded-2xl p-[6px] z-10 bg-white cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setDetailOpened(true);
                      }}
                    >
                      <span className="p-[3px] bg-black/30 rounded-full"></span>
                      <span className="p-[3px] bg-black/30 rounded-full"></span>
                      <span className="p-[3px] bg-black/30 rounded-full"></span>
                    </div>
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer mb-5">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {/* Car Image */}
                          <div className="relative">
                            <img
                              src={car.image || "/placeholder.svg"}
                              alt={`${car.year} ${car.make} ${car.model}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Car Details */}
                          <div className="md:col-span-2">
                            <h3 className="text-xl font-semibold text-black mb-2">
                              {car.year} {car.make} {car.model}
                            </h3>
                            <p className="text-gray-600 mb-1">{car.mileage}</p>
                            <p className="text-gray-600 mb-3">{car.location}</p>

                            {car.percentLess && (
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800"
                                >
                                  {car.percentLess}
                                </Badge>
                              </div>
                            )}

                            <p className="text-sm text-gray-600">
                              {car.daysOnMarket} days on market
                            </p>
                          </div>

                          {/* Price & Action */}
                          <div className="flex flex-col justify-between items-end">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-black">
                                {car.price}
                              </p>
                              <p className="text-sm text-gray-600">
                                est. {car.monthlyEst}
                              </p>
                            </div>
                            {/* <Button className="bg-black text-white hover:bg-gray-800 mt-4 cursor-pointer">
                              Request Info
                            </Button> */}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {detailOpened && (
        <CarDetailModal
          isOpen={detailOpened}
          car={{
            id: "string",
            year: 2022,
            make: "Volkswagen",
            model: "ID6",
            trim: "SV",
            price: 4_000_000,
            monthlyPayment: 200_000,
            image: "/id6-orange.png",
            mileage: 0,
            transmission: "Automatic",
            drivetrain: "AWD",
            mpg: "",
            exteriorColor: "Orange",
            interiorColor: "White",
            fuelType: "",
            bodyStyle: "SUV",
            doors: 4,
            vin: "KNMAT2MV0HP518223",
          }}
          onClose={() => setDetailOpened(false)}
        />
      )}
    </div>
  );
}
