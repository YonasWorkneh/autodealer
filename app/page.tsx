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

export default function AutoDealerLanding() {
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
        <header className="relative z-10 flex items-center justify-between px-40 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/wheel copy.png"
                alt="wheel"
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
            <span className="text-white text-xl font-semibold">
              AUTO&mdash;DEALER
            </span>
          </div>

          <div className="flex items-center space-x-6 w-[850px]">
            <div className="relative">
              <Input
                placeholder="Search..."
                className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>
            <Link
              href={"/car-list"}
              className=" text-white hover:text-white/80 p-2 px-4 rounded-md cursor-pointer"
            >
              All-listing
            </Link>{" "}
            <Link
              href={"/favorites"}
              className="text-white hover:text-white/80 p-2 px-4 rounded-md cursor-pointer"
            >
              Favourites
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white p-2 px-4 rounded-md cursor-pointer">
              Sell my Car
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 flex-1 px-40">
          <div>
            <div className="flex gap-56 items-center min-h-[calc(100vh-200px)]">
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
                <Button className="bg-white/10 cursor-pointer hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm w-full justify-between">
                  <span>Explore Our Cars</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center flex-col">
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
