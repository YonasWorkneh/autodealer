"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronUp,
  ChevronDown,
  Camera,
  Gauge,
  Globe,
  LifeBuoy,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";

export default function CarListingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Sample car images - in real app these would come from props/API
  const carImages = [
    "/white-honda-civic-sedan-front.png",
    "/white-honda-civic-sedan-side.png",
    "/white-honda-civic-interior.png",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carImages.length) % carImages.length
    );
  };

  const features = [
    "All Wheel Steering",
    "Anti-Lock Brakes/ABS",
    "Cruise Control",
    "Dual Exhaust",
    "Front Airbags",
    "Power Steering",
    "Side Airbags",
    "Tiptronic Gears",
  ];

  const visibleFeatures = showAllFeatures ? features : features.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header color="black" />
      <div className="px-60 py-10">
        {/* Main Car Image */}
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
            <Image
              src={carImages[currentImageIndex]}
              alt="Honda Civic VTi"
              width={120}
              height={120}
              className="w-full h-100 object-cover cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <Image
                src={"/image-count.svg"}
                width={120}
                height={120}
                alt="img-count"
                className="size-4"
              />
              {carImages.length}
            </div>

            {/* Navigation arrows for main image */}
            {carImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Heart className="w-4 h-4" />
              Favorite
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price and Title */}
            <div>
              <div className="text-3xl font-bold text-black mb-2">
                AED 46,000
              </div>
              <h1 className="text-2xl font-semibold mb-4">Honda Civic VTi</h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>
                    <Calendar />
                  </span>
                  <span>2019</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <Gauge />
                  </span>
                  <span>79,800 km</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <LifeBuoy />
                  </span>
                  <span>Left Hand</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <Globe />
                  </span>
                  <span>GCC Specs</span>
                </div>
              </div>
            </div>

            {/* Car Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Car Overview</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3 border-r pr-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interior Color</span>
                      <span className="font-medium">Beige</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exterior Color</span>
                      <span className="font-medium">White</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Body Type</span>
                      <span className="font-medium">Sedan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seating Capacity</span>
                      <span className="font-medium">5 Seater</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transmission Type</span>
                      <span className="font-medium">
                        Automatic Transmission
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seller type</span>
                      <span className="font-medium">Dealer</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horsepower</span>
                      <span className="font-medium">0 - 99 HP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doors</span>
                      <span className="font-medium">4 door</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Market</span>
                      <span className="font-medium">UAE (can be exported)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">No. of Cylinders</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Engine Capacity (cc)
                      </span>
                      <span className="font-medium">1500 - 1999 cc</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trim</span>
                      <span className="font-medium">VTi</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  HONDA CIVIC (WITH GOLDEN PACKAGE (FAMILY CAR)
                </h2>
                <p className="text-gray-700 mb-4">
                  HONDA CIVIC .GOOD CAR WITH AMAZING CONDITION.JUST COME AND
                  TAKE IT AND DRIVE ENJOY YOUR LIFE
                </p>
                <p className="text-gray-700 mb-4">...</p>
                <Button
                  variant="link"
                  className="text-black p-0 h-auto font-normal"
                >
                  Read More
                </Button>
                <div className="mt-4 text-sm text-gray-500">
                  Posted on: 19th July 2025
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Features</h2>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Drivers Assistance & Safety</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">8</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="p-1 h-auto"
                      >
                        {showAllFeatures ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {visibleFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dealer Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                    F
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      FINANCE CAR VEHICLE TRADING LLC
                    </h3>
                    <p className="text-sm text-gray-600">Dealer</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-black p-0 h-auto text-sm"
                >
                  View All Cars
                </Button>
                <div className="flex gap-3 mt-4 border-t py-4">
                  <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-green-50"
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-blue-50"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Buttons */}

            {/* Inspection Badge */}
            <Card className="bg-gray-900 text-white">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="font-semibold mb-1">CARS INSPECTED</h3>
                  <p className="text-sm mb-3">by AUTO&mdash;Dealer</p>
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    View Listings
                  </Button>
                </div>
                <div className="mt-4">
                  <Image
                    src="/red-sports-car.png"
                    alt="Inspected car"
                    width={120}
                    height={120}
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 w-screen h-screen bg-black z-50 flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 z-10 bg-[#111] hover:bg-[#222] text-white p-3 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Favorite and Share buttons */}
            <div className="absolute top-4 right-20 z-10 flex gap-4">
              <button className="flex items-center gap-1 px-3 py-2 text-white bg-[#111] hover:bg-[#222] rounded-lg transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                Favorite
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-white bg-[#111] hover:bg-[#222] rounded-lg transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Main image */}
            <Image
              src={carImages[currentImageIndex] || "/placeholder.svg"}
              alt="Honda Civic VTi"
              width={120}
              height={120}
              className="w-[1200px] h-auto object-contain"
            />

            {/* Navigation arrows */}
            {carImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#111] hover:bg-[#222] text-white p-3 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#111] hover:bg-[#222]  text-white p-3 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm">
              Showing {currentImageIndex + 1} of {carImages.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
