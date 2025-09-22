"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Gauge,
  Globe,
  LifeBuoy,
  Calendar,
  Star,
  Send,
} from "lucide-react";

import Image from "next/image";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

export default function CarListingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const searchParams = useParams();
  const { id } = searchParams;
  console.log(id);

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
  const message =
    "HONDA CIVIC . good car with amazing condition.just come and take it and drive enjoy your life. Lorem ipsum dolor sit amet consectetur adipisicing elit...";
  const [readIndex, setReadIndex] = useState<number>(140);

  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header color="black" />
      <div className="px-0 sm:px-6 lg:px-50 py-6 md:py-10">
        {/* Main Car Image */}
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
            <Image
              src={carImages[currentImageIndex]}
              alt="Honda Civic VTi"
              width={120}
              height={120}
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm">
              <Image
                src={"/image-count.svg"}
                width={120}
                height={120}
                alt="img-count"
                className="size-3 sm:size-4"
              />
              {carImages.length}
            </div>

            {/* Navigation arrows for main image */}
            {carImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price and Title */}
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-black mb-2">
                AED 46,000
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                Honda Civic VTi
              </h1>

              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>2019</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  <span>79,800 km</span>
                </div>
                <div className="flex items-center gap-1">
                  <LifeBuoy className="w-4 h-4" />
                  <span>Left Hand</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>GCC Specs</span>
                </div>
              </div>
            </div>

            {/* Car Overview */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Car Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3 sm:border-r sm:pr-4">
                    {/* left column */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interior Color</span>
                      <span className="font-medium">Beige</span>
                    </div>
                    {/* ...rest unchanged */}
                  </div>
                  <div className="space-y-3">
                    {/* right column */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horsepower</span>
                      <span className="font-medium">0 - 99 HP</span>
                    </div>
                    {/* ...rest unchanged */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  HONDA CIVIC (WITH GOLDEN PACKAGE (FAMILY CAR)
                </h2>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  {message.slice(0, readIndex)}{" "}
                  {message.length > 140 && (
                    <span className="text-gray-700 mb-4 cursor-pointer">
                      ...
                    </span>
                  )}
                </p>
                <Button
                  variant="link"
                  className="text-black p-0 h-auto font-normal cursor-pointer"
                  onClick={() =>
                    setReadIndex(
                      readIndex === message.length ? 140 : message.length
                    )
                  }
                >
                  {readIndex === message.length ? "Show less" : "Read more"}
                </Button>
                <div className="mt-4 text-xs sm:text-sm text-gray-500">
                  Posted on: 19th July 2025
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Features</h2>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-3 text-sm sm:text-base">
                    Drivers Assistance & Safety
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                    F
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      FINANCE CAR VEHICLE TRADING LLC
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">Dealer</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-black p-0 h-auto text-xs sm:text-sm"
                >
                  View All Cars
                </Button>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 border-t py-4">
                  <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-50 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-blue-600" />
                    Telegram
                  </Button>
                </div>
                {/* rating */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`${
                        index < 4
                          ? "text-yellow-500 fill-amber-400"
                          : "text-black"
                      } `}
                    />
                  ))}
                  <p className="text-gray-500 text-xs sm:text-sm">4/5</p>
                </div>
              </CardContent>
            </Card>

            {/* Inspection Badge */}
            <Card className="bg-zinc-900 text-white">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">
                    CARS INSPECTED
                  </h3>
                  <p className="text-xs sm:text-sm mb-3">by AUTO—Dealer</p>
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-gray-100 cursor-pointer"
                  >
                    View Listings
                  </Button>
                </div>
                <div className="mt-2 flex justify-center">
                  <Image
                    src="/id6-orange.png"
                    alt="Inspected car"
                    width={120}
                    height={120}
                    className="w-1/2 h-auto object-cover rounded"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 w-screen h-screen bg-black z-50 flex items-center justify-center p-2 sm:p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 z-10 bg-[#111] hover:bg-[#222] text-white p-2 sm:p-3 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 right-4 sm:right-20 z-10 flex gap-2 sm:gap-4">
              <button className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-white bg-[#111] hover:bg-[#222] rounded-lg transition-colors cursor-pointer text-xs sm:text-sm">
                <Heart className="w-4 h-4" />
                Favorite
              </button>
              <button className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-white bg-[#111] hover:bg-[#222] rounded-lg transition-colors cursor-pointer text-xs sm:text-sm">
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
              className="w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto object-contain"
            />

            {/* Navigation arrows */}
            {carImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#111] hover:bg-[#222] text-white p-2 sm:p-3 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#111] hover:bg-[#222] text-white p-2 sm:p-3 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm">
              Showing {currentImageIndex + 1} of {carImages.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
