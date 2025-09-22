"use client";

import { useState, useEffect } from "react";
import { Search, Heart, MapPin, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import { CarDetailModal } from "./CarDetailModal";
import FilterSidebar from "@/components/Filter";
import Car from "@/components/Car";

export default function CarMarketplace() {
  const [detailOpened, setDetailOpened] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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
    {
      id: 4,
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
    {
      id: 5,
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
    {
      id: 6,
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
      <Header color="black" />

      <div className="pt-16 px-4 sm:px-6 lg:px-50">
        {/* Mobile Filter Button */}
        <div className="sm:hidden mb-4 flex justify-end">
          <Button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Sort */}
            <div className="sticky top-0 bg-white z-40 pb-4">
              <Card className="border-gray-200 rounded-3xl shadow-none py-4">
                <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="relative w-full sm:flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search by make, model, or body style"
                      className="pl-10 h-12 text-lg border-none shadow-none focus:ring-0 focus:outline-none w-full focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row border-t pl-2 sm:border-t-0 sm:border-l border-gray-200 py-4 sm:py-0 justify-center items-center gap-2 sm:gap-4">
                    <p className="font-bold text-xs text-center uppercase">
                      Sort By
                    </p>
                    <Select>
                      <SelectTrigger className="w-full sm:w-32 text-center border-none shadow-none focus:ring-0">
                        <SelectValue placeholder="Best match" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="best">Best match</SelectItem>
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
                <Car setDetailOpened={setDetailOpened} car={car} key={car.id} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
          <div className="bg-white w-3/4 max-w-xs p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <Button variant="ghost" onClick={() => setFilterOpen(false)}>
                Close
              </Button>
            </div>
            <FilterSidebar close={() => setFilterOpen(false)} />
          </div>
        </div>
      )}

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
            blueetooth: true,
          }}
          onClose={() => setDetailOpened(false)}
        />
      )}
    </div>
  );
}
