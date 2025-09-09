"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ChevronDown,
  Menu,
  ArrowRight,
  ArrowDown,
  UserCircle,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import About from "@/components/About";
import Popular from "@/components/Popular";
import Slider from "@/components/Slider";
import GetApp from "@/components/GetApp";
import Footer from "@/components/Footer";
import Link from "next/link";
import Header from "@/components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AutoDealerLanding() {
  const [filters, setFilters] = useState({
    search: "",
    make: "",
    model: "",
    price: "",
    type: "",
    year: "",
    mileage: "",
  });

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Applied filters:", filters);
    // Call your API or filtering logic here
  };
  const carLogos = [
    { image: "/logo/byd.webp", title: "BYD" },
    { image: "/logo/hyundai.webp", title: "Hyundai" },
    { image: "/logo/Jetour_Logo.svg", title: "Jetour" },
    { image: "/logo/liffan.png", title: "Lifan" },
    { image: "/logo/suzuki.png", title: "Suzuki" },
    { image: "/logo/toyota.png", title: "Toyota" },
    { image: "/logo/vk.svg.png", title: "VK" },
    { image: "/logo/nissan.png", title: "Nissan" },
    { image: "/logo/ford.webp", title: "Ford" },
    { image: "/logo/audi.png", title: "Audi" },
    { image: "/logo/mist.png", title: "Mitsubishi" },
    { image: "/logo/bmw.png", title: "BMW" },
    { image: "/logo/infinity.png", title: "Infinity" },
    { image: "/logo/mercedes.webp", title: "Mercedes" },
    { image: "/logo/lexus.png", title: "Lexus" },
  ];
  return (
    <div>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Luxury marina background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="relative z-10 flex-1 px-40">
          <div>
            <div className="flex flex-col justify-center min-h-[calc(100vh-200px)]">
              <div className="flex gap-56 mb-36">
                {/* Left Content */}
                <div className="col-span-7">
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl font-light text-white leading-tight mb-16"
                  >
                    Embark On The Journey
                    <br />
                    Of Luxury –<br />
                    <span className="italic">Your Dream Car Awaits</span>
                  </motion.h1>

                  {/* Car Specs */}
                  <div className="flex space-x-16 mt-auto">
                    <div>
                      <div className="text-5xl font-light text-white mb-2">
                        2024
                      </div>
                      <div className="text-white/70 text-sm">Year</div>
                    </div>
                    <div>
                      <div className="text-5xl font-light text-white mb-2">
                        600
                      </div>
                      <div className="text-white/70 text-sm">KM / CHARGE</div>
                    </div>
                    <div>
                      <div className="text-5xl font-light text-white mb-2">
                        85
                      </div>
                      <div className="text-white/70 text-sm">KWH</div>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="relative">
                  {/* Car Details Card */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
                    <CardContent className="p-2 px-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white text-xl font-semibold mb-2">
                            BYD &mdash; SONG
                          </h3>
                          <p className="text-white/70 text-sm">
                            Auto transmission • Full insurance
                          </p>
                        </div>
                      </div>
                      <div className="w-[300px] h-[200px] relative">
                        <Image
                          src="/byd.png"
                          alt="Blue Lotus Emira"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explore Button */}
                  <Link href={"/listing"}>
                    <Button className="bg-white/10 cursor-pointer hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm w-full justify-between">
                      <span>Explore Our Cars</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              {/* search */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white p-6 rounded-xl">
                <CardContent className="space-y-4">
                  <p className="text-2xl font-semibold mb-6">
                    Find your perfect car
                  </p>
                  {/* Filter grid */}
                  <div className="flex justify-between md:grid-cols-3 gap-4">
                    {/* Make */}
                    <Select onValueChange={(v) => handleChange("make", v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 !text-white w-full p-4 py-8">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/20 border-white/20">
                        <SelectItem
                          value="toyota"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Toyota
                        </SelectItem>
                        <SelectItem
                          value="honda"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Honda
                        </SelectItem>
                        <SelectItem
                          value="bmw"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          BMW
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Model */}
                    <Select onValueChange={(v) => handleChange("model", v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 !text-white w-full p-4 py-8 ">
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/20 border-white/20">
                        <SelectItem
                          value="corolla"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Corolla
                        </SelectItem>
                        <SelectItem
                          value="civic"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Civic
                        </SelectItem>
                        <SelectItem
                          value="x5"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          X5
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Vehicle type */}
                    <Select onValueChange={(v) => handleChange("type", v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 !text-white w-full p-4 py-8">
                        <SelectValue placeholder="Vehicle Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/20 border-white/20">
                        <SelectItem
                          value="sedan"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Sedan
                        </SelectItem>
                        <SelectItem
                          value="suv"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          SUV
                        </SelectItem>
                        <SelectItem
                          value="truck"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Truck
                        </SelectItem>
                        <SelectItem
                          value="van"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          Van
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Year */}
                    <Select onValueChange={(v) => handleChange("year", v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 !text-white w-full p-4 py-8">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/20 border-white/20">
                        <SelectItem
                          value="2025"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          2025
                        </SelectItem>
                        <SelectItem
                          value="2024"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          2024
                        </SelectItem>
                        <SelectItem
                          value="2023"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          2023
                        </SelectItem>
                        <SelectItem
                          value="2020-2022"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          2020 - 2022
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Mileage */}
                    <Select onValueChange={(v) => handleChange("mileage", v)}>
                      <SelectTrigger className="bg-white/10 border-white/20 !text-white w-full p-4 py-8">
                        <SelectValue placeholder="Mileage" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/20 border-white/20">
                        <SelectItem
                          value="0-20000"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          0 - 20,000 km
                        </SelectItem>
                        <SelectItem
                          value="20000-50000"
                          className="text-white  data-[highlighted]:bg-white/20 data-[highlighted]:text-white data-[state=checked]:bg-white/30 data-[state=checked]:font-semibold"
                        >
                          20,000 - 50,000 km
                        </SelectItem>
                        <SelectItem
                          value="50000-100000"
                          className="text-white  data-[highlighted]:bg-white/10 data-[highlighted]:text-white data-[state=checked]:bg-white/20 data-[state=checked]:font-semibold"
                        >
                          50,000 - 100,000 km
                        </SelectItem>
                      </SelectContent>
                    </Select>{" "}
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSearch}
                        className="bg-zinc-900 border border-white/30 hover:bg-zinc-900 text-white rounded-md w-(calc(100%+60px)) h-full cursor-pointer"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>

                  {/* Submit button */}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center flex-col">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeIn" }}
            >
              <ArrowDown size={18} className="text-white/70" />
            </motion.div>
            <div className="text-white/70 text-sm mt-4">Scroll Down</div>
          </div>
        </div>
      </div>
      <About />
      <Popular />
      <GetApp />
      <div className="px-40 pb-40">
        <Slider items={carLogos} />
      </div>
      <Footer />
    </div>
  );
}
