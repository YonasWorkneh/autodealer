"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function PlaceAddForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    make: "Select Make",
    model: "Select Model",
    year: "",
    mileage: "",
    engine: "",
    gearbox: "",
    bodyColor: "",
    interiorColor: "",
    price: "",
    description: "",
    images: [] as File[],
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

  const fuelTypes = [
    "Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
    "Plug-in Hybrid",
    "CNG",
    "LPG",
    "Hydrogen",
  ];

  const engineTypes = [
    "Inline-3",
    "Inline-4",
    "Inline-6",
    "V6",
    "V8",
    "V10",
    "V12",
    "Boxer (Flat)",
    "Rotary (Wankel)",
    "Turbocharged",
    "Supercharged",
    "Naturally Aspirated",
  ];

  const gearboxTypes = ["Manual", "Automatic", "CVT", "Semi-Automatic"];

  const salesTypes = ["Auction", "Fixed Price"];

  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-2xl bg-transparent rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-black/70 mb-20 uppercase">
            Car Details Form
          </h1>
        </div>

        {step === 1 && (
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
                    <SelectItem key={make.brand} value={make.brand}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={make.logo}
                          alt={`${make.brand} logo`}
                          width={100}
                          height={100}
                          className="w-6 h-auto"
                        />
                        <p>{make.brand}</p>
                      </div>
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

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyColor" className="text-sm text-gray-500">
                  Exterior Color
                </Label>
                <Input
                  id="bodyColor"
                  type="text"
                  placeholder="Grey"
                  value={formData.bodyColor}
                  onChange={(e) =>
                    setFormData({ ...formData, bodyColor: e.target.value })
                  }
                  className="h-12 border-black/10 rounded-md py-8"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="interiorColor"
                  className="text-sm text-gray-500"
                >
                  Interior Color
                </Label>
                <Input
                  id="interiorColor"
                  type="text"
                  placeholder="White"
                  value={formData.interiorColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interiorColor: e.target.value,
                    })
                  }
                  className="h-12 border-black/10 rounded-md py-8"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-8">
              <Button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded cursor-pointer"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="engine" className="text-sm text-gray-500">
                Fuel Type
              </Label>
              <Select
                value={formData.engine}
                onValueChange={(value) =>
                  setFormData({ ...formData, engine: value })
                }
              >
                <SelectTrigger className="w-full h-12 border-black/10 rounded-md py-8">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((engine) => (
                    <SelectItem key={engine} value={engine}>
                      {engine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm text-gray-500">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="h-12 border-black/10 rounded-md py-8"
                />
              </div>
              {/* Sales Type */}
              <div className="space-y-2">
                <Label htmlFor="gearbox" className="text-sm text-gray-500">
                  Sales Type
                </Label>
                <Select
                  value={formData.gearbox}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gearbox: value })
                  }
                >
                  <SelectTrigger className="w-full h-12 border-black/10 rounded-md py-8">
                    <SelectValue placeholder="Select sales type" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesTypes.map((gearbox) => (
                      <SelectItem key={gearbox} value={gearbox}>
                        {gearbox}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label htmlFor="upload" className="text-sm text-gray-500">
                Uploads
              </Label>

              <div className="grid grid-cols-3 gap-4">
                {/* Add Button */}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <Plus className="w-6 h-6 text-gray-500" />
                  <span className="mt-1 text-sm text-gray-500">Add</span>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Preview Thumbnails */}
                {images.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-32 rounded-lg overflow-hidden border"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Car Image"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full size-[20px] text-xs cursor-pointer hover:bg-black/70"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm text-gray-500">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write a short description about your car..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[120px] border-black/10 rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="px-8 py-3 text-gray-600 hover:text-gray-800 cursor-pointer bg-gray-100 hover:bg-gray-200"
              >
                Back
              </Button>
              <Button className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded cursor-pointer">
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
