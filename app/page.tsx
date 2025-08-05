"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, Menu, ArrowRight, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

export default function AutoDealerLanding() {
  return (
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
      <header className="relative z-10 flex items-center justify-between px-28 py-4">
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

        <div className="flex items-center space-x-6 w-[600px]">
          <div className="flex items-center space-x-1 text-white cursor-pointer w-[150px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-white cursor-pointer hover:text-white/80 transition-colors">
                <span>All Models</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/30 backdrop-blur-sm border-white/20 w-[150px] p-4 px-2 rounded-md">
                <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md">
                  BYD
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md">
                  V8
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md">
                  Nissan
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md">
                  Toyota
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative">
            <Input
              placeholder="Search..."
              className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 bg-white/10 px-3 py-2 rounded cursor-pointer transition-colors">
              <span className="text-white">USD</span>
              <ChevronDown className="w-4 h-4 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/30 backdrop-blur-sm border-white/20 w-[150px] p-4 px-2 mt-1 rounded-md">
              <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md text-white ">
                Birr
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md text-white ">
                Dollar
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md text-white ">
                Pound
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-black/20 p-2 rounded-md text-white ">
                Euro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 px-28">
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
                  <div className="text-5xl font-light text-white mb-2">600</div>
                  <div className="text-white/70 text-sm">KM / CHARGE</div>
                </div>
                <div>
                  <div className="text-5xl font-light text-white mb-2">85</div>
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
          <div className="text-white/70 text-sm mt-2">Scroll Down</div>
        </div>
      </div>
    </div>
  );
}
