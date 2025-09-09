"use client";

import { Auction } from "@/app/types/auction";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const mockAuctions: Auction[] = [
  {
    id: 1,
    title: "2013 Subaru Forester Premium Plus",
    location: "Subaru Champlin, Othoberg, HI 78276",
    auctionNumber: "#20199884",
    details: "11 475 Miles • White • AWD • 4-Cylinder Turbo",
    timeLeft: "10d 12hrs",
    endTime: "Sunday, 9:38PM",
    activeBids: 18,
    currentBid: "$14,000",
    images: [
      "/bmw-front.jpeg",
      "/bmw-back.jpg",
      "/bmw-side.jpg",
      "/bmw-side2.jpg",
    ],
    brand: "S",
    brandColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "2018 BMW 330i xDrive",
    location: "BMW Manhattan, New York, NY 10019",
    auctionNumber: "#20199885",
    details: "45 230 Miles • Black • AWD • 4-Cylinder Turbo",
    timeLeft: "2d 8hrs",
    endTime: "Friday, 3:15PM",
    activeBids: 24,
    currentBid: "$18,500",
    images: [
      "/bmw-front.jpeg",
      "/bmw-back.jpg",
      "/bmw-side.jpg",
      "/bmw-side2.jpg",
    ],
    brand: "B",
    brandColor: "bg-gray-800",
  },
];

const AuctionDetailView = () => {
  const params = useParams();
  const id = params.id || "";
  const auction = mockAuctions.find((auction) => auction.id == +id);

  const [mainImage, setMainImage] = useState(
    auction?.images ? auction.images[0] : ""
  );

  if (!auction) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <Header color="black" />

      <div className="px-4 sm:px-6 md:px-20 lg:px-40 py-8 sm:py-10">
        <Button
          variant="ghost"
          onClick={() => history.back()}
          className="mb-6 text-gray-600 hover:text-gray-900 bg-gray-100 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to auctions
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="flex-1 space-y-4">
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={mainImage}
                alt={auction.title}
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {auction.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden cursor-pointer ${
                    mainImage === img ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Car view ${i + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="flex-1 space-y-6">
            {/* Car Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {auction.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {auction.details}
              </p>
            </div>

            {/* Auction Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm sm:text-base">
              <div>
                <div className="font-bold text-gray-900">
                  {auction.timeLeft}
                </div>
                <div className="text-gray-600">Time Left</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">{auction.endTime}</div>
                <div className="text-gray-600">Auction Ending</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">
                  {auction.activeBids}
                </div>
                <div className="text-gray-600">Active bids</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">
                  {auction.currentBid}
                </div>
                <div className="text-gray-600">Current bid</div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-2 sm:space-y-3">
              {[
                ["Title", "Salvage"],
                ["Loss Type", "Collision"],
                ["Damage", "Front Left"],
                ["Vin Code", "WA1LFAFP9DA******"],
                ["Highlights", "Run and Drive"],
                ["Transmission", "Automatic"],
                ["Est. Retail Value", "$9,050"],
              ].map(([label, value], idx) => (
                <div
                  key={idx}
                  className={`flex justify-between py-2 ${
                    idx < 6 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <span className="text-gray-600 text-sm sm:text-base">
                    {label}
                  </span>
                  <span className="text-gray-900 text-sm sm:text-base">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Bid Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder={`Enter your bid (Minimum ${auction.currentBid})`}
                  type="number"
                  className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 py-3 sm:py-8"
                />
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3 sm:py-8">
                  Place Bid
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailView;
