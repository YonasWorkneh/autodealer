"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function PlaceAddForm() {
  const [formData, setFormData] = useState({
    make: "Select Make",
    model: "Select Model",
    year: "",
    mileage: "",
    engine: "",
    gearbox: "",
    bodyColor: "",
  });

  const carMakes = [
    { brand: "Toyota", logo: "/logo/toyota.png" },
    { brand: "BMW", logo: "/logo/bmw.png" },
    { brand: "Mercedes-Benz", logo: "/logo/mercedes.webp" },
    { brand: "Audi", logo: "/logo/audi.png" },
    { brand: "Hyundai", logo: "/logo/hyundai.webp" },
    { brand: "Ford", logo: "/logo/ford.webp" },
    { brand: "Volkswagen", logo: "/logo/vk.svg.png" },
    { brand: "Nissan", logo: "/logo/nissan.png" },
    { brand: "BYD", logo: "/logo/byd.webp" },
  ];

  const bmwModels = [
    "M5",
    "3 Series",
    "5 Series",
    "7 Series",
    "X3",
    "X5",
    "X7",
    "i4",
    "iX",
  ];

  const engineTypes = [
    "Petrol",
    "Diesel",
    "Hybrid",
    "Electric",
    "V6",
    "V8",
    "Turbo",
  ];

  const gearboxTypes = ["Manual", "Automatic", "CVT", "Semi-Automatic"];

  const bodyColors = [
    "Black",
    "White",
    "Silver",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Brown",
  ];

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-2xl bg-transparent rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-black/70 mb-20 uppercase">
            Car Details Form
          </h1>
        </div>

        <div className="space-y-6">
          {/* Make Selection */}
          <div className="space-y-2">
            <Label htmlFor="make" className="text-sm text-gray-500">
              Select make
            </Label>
            <Select
              value={formData.make}
              onValueChange={(value) =>
                setFormData({ ...formData, make: value })
              }
            >
              <SelectTrigger className="w-full h-12 border-black/10 rounded-md py-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {carMakes.map((make) => (
                  <SelectItem
                    key={make.brand}
                    value={make.brand}
                    className="flex gap-2"
                  >
                    <Image
                      src={make.logo}
                      alt={`${make.brand} logo`}
                      width={100}
                      height={100}
                      className="w-10 h-auto"
                    />
                    <p>{make.brand}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model" className="text-sm text-gray-500">
              Model
            </Label>
            <Select
              value={formData.model}
              onValueChange={(value) =>
                setFormData({ ...formData, model: value })
              }
            >
              <SelectTrigger className="w-full h-12 border-black/10 rounded-md py-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bmwModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year and Mileage Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm text-gray-500">
                Year
              </Label>
              <Input
                id="year"
                type="number"
                placeholder="2020"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="h-12 border-black/10 rounded-md py-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage" className="text-sm text-gray-500">
                Mileage
              </Label>
              <Input
                id="mileage"
                type="number"
                placeholder="50000"
                value={formData.mileage}
                onChange={(e) =>
                  setFormData({ ...formData, mileage: e.target.value })
                }
                className="h-12 border-black/10 rounded-md py-8"
              />
            </div>
          </div>

          {/* Engine and Gearbox Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="engine" className="text-sm text-gray-500">
                Engine
              </Label>
              <Select
                value={formData.engine}
                onValueChange={(value) =>
                  setFormData({ ...formData, engine: value })
                }
              >
                <SelectTrigger className="w-full h-12 border-black/10 rounded-md py-8">
                  <SelectValue placeholder="Select engine" />
                </SelectTrigger>
                <SelectContent>
                  {engineTypes.map((engine) => (
                    <SelectItem key={engine} value={engine}>
                      {engine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gearbox" className="text-sm text-gray-500">
                Gearbox
              </Label>
              <Select
                value={formData.gearbox}
                onValueChange={(value) =>
                  setFormData({ ...formData, gearbox: value })
                }
              >
                <SelectTrigger className="w-full h-12 border-black/10 rounded-md py-8">
                  <SelectValue placeholder="Select gearbox" />
                </SelectTrigger>
                <SelectContent>
                  {gearboxTypes.map((gearbox) => (
                    <SelectItem key={gearbox} value={gearbox}>
                      {gearbox}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Body Color */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ext-color" className="text-sm text-gray-500">
                Exterior Color
              </Label>
              <Input
                id="ext-color"
                type="text"
                placeholder="Grey"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="h-12 border-black/10 rounded-md py-8"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="int-color" className="text-sm text-gray-500">
                Interior Color
              </Label>
              <Input
                id="int-color"
                type="text"
                placeholder="White"
                value={formData.mileage}
                onChange={(e) =>
                  setFormData({ ...formData, mileage: e.target.value })
                }
                className="h-12 border-black/10 rounded-md py-8"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <Button
              variant="ghost"
              className="px-8 py-3 text-gray-600 hover:text-gray-800 cursor-pointer bg-gray-100 hover:bg-gray-200"
            >
              Back
            </Button>
            <Button className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded cursor-pointer">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
