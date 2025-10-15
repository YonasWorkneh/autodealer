"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import About from "@/components/About";
import Popular from "@/components/Popular";
import Slider from "@/components/Slider";
import GetApp from "@/components/GetApp";
import Footer from "@/components/Footer";
import SearchableDropdown from "@/components/SearchableDropdown";
import RangeDropdown from "@/components/RangeDropdown";
import { useEffect, useState } from "react";
import { useMakes, useModels } from "@/hooks/cars";
import { useRouter } from "next/navigation";

// Featured Car Slider Component
const FeaturedCarSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredCars = [
    {
      title: "BYD — SONG",
      subtitle: "Electric • Smart Technology",
      image: "/byd.png",
    },
    {
      title: "VOLKSWAGEN — ID.6",
      subtitle: "Electric SUV • Premium Interior",
      image: "/id6-blue.png",
    },
    {
      title: "TOYOTA — TACOMA",
      subtitle: "Off-Road Pickup • 4x4 Capability",
      image: "/tacoma.png",
    },
    {
      title: "LUXURY — V8 POWER",
      subtitle: "Premium SUV • Advanced Features",
      image: "/v8-nobg.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredCars.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [featuredCars.length]);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h3 className="text-white text-xl font-semibold mb-2">
              {featuredCars[currentIndex].title}
            </h3>
            <p className="text-white/70 text-sm mb-4">
              {featuredCars[currentIndex].subtitle}
            </p>
          </motion.div>
          <div className="w-full h-[200px] sm:h-[320px] relative">
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={featuredCars[currentIndex].image}
                alt={featuredCars[currentIndex].title}
                fill
                className="object-contain rounded"
                priority={currentIndex === 0}
              />
            </motion.div>
          </div>
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredCars.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Link href="/listing">
        <Button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white w-full justify-between backdrop-blur-sm py-6">
          <span>Explore Our Cars</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};

export default function AutoDealerLanding() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    make: null,
    model: null,
    yearMin: "",
    yearMax: "",
    mileageMin: "",
    mileageMax: "",
    priceMin: "",
    priceMax: "",
  });

  const handleChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const buildSearchParams = (filters: any) => {
    const params = new URLSearchParams();

    if (filters.make) params.set("make", filters.make);
    if (filters.model) params.set("model", filters.model);
    if (filters.yearMin) params.set("yearMin", filters.yearMin);
    if (filters.yearMax) params.set("yearMax", filters.yearMax);
    if (filters.mileageMin) params.set("mileageMin", filters.mileageMin);
    if (filters.mileageMax) params.set("mileageMax", filters.mileageMax);
    if (filters.priceMin) params.set("priceMin", filters.priceMin);
    if (filters.priceMax) params.set("priceMax", filters.priceMax);

    return params.toString();
  };

  const handleSearch = () => {
    console.log("Applied filters:", filters);
    const searchParams = buildSearchParams(filters);
    const url = searchParams ? `/listing?${searchParams}` : "/listing";
    router.push(url);
  };

  const makeOptions = [
    { label: "Toyota", value: "toyota" },
    { label: "Honda", value: "honda" },
    { label: "BMW", value: "bmw" },
  ];
  const modelOptions = [
    { label: "Corolla", value: "corolla" },
    { label: "Civic", value: "civic" },
    { label: "X5", value: "x5" },
  ];
  const yearOptions = Array.from({ length: 31 }, (_, i) => 1995 + i)
    .reverse()
    .map((y) => ({ label: String(y), value: String(y) }));
  const mileageStops = [
    0, 10000, 20000, 30000, 40000, 50000, 75000, 100000, 150000, 200000,
  ];
  const mileageOptions = mileageStops.map((m) => ({
    label: m.toLocaleString(),
    value: String(m),
  }));
  const priceStops = [
    5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000, 150000,
    200000,
  ];
  const priceOptions = priceStops.map((p) => ({
    label: `$${p.toLocaleString()}`,
    value: String(p),
  }));

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
  const { data: makes, isLoading } = useMakes();
  const {
    data: models,
    isPending,
    refetch,
  } = useModels(filters.make ? filters.make : undefined);

  useEffect(() => {
    console.log(filters.make);
    if (filters.make) {
      refetch();
    }
  }, [filters.make, refetch]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <Image
          src="/hero-background.jpg"
          alt="Luxury marina background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <Header />

        <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 pt-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 text-white"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-8">
                Embark On The Journey <br />
                Of Luxury – <br />
                <span className="italic">Your Dream Car Awaits</span>
              </h1>

              <div className="flex flex-wrap gap-8 mt-6">
                <div>
                  <div className="text-3xl sm:text-5xl font-light mb-1">
                    2024
                  </div>
                  <div className="text-white/70 text-sm">Year</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-5xl font-light mb-1">
                    600
                  </div>
                  <div className="text-white/70 text-sm">KM / CHARGE</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-5xl font-light mb-1">85</div>
                  <div className="text-white/70 text-sm">KWH</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <FeaturedCarSlider />
          </div>

          {/* Search / Filter Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white p-6 sm:p-10 rounded-xl my-5">
            <CardContent className="space-y-4">
              <p className="text-2xl sm:text-2xl font-semibold mb-4">
                Find your perfect car
              </p>
              <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-4">
                <SearchableDropdown
                  items={
                    makes?.map((make) => {
                      return { value: make.id, label: make.name };
                    }) ?? []
                  }
                  placeholder={isLoading ? "Loading makes..." : "Make"}
                  value={filters.make}
                  onChange={(v) => handleChange("make", v)}
                  className={isLoading ? "opacity-50 pointer-events-none" : ""}
                />
                <SearchableDropdown
                  items={
                    models
                      ?.filter((model: any) => model.make.id === filters.make)
                      ?.map((model: any) => ({
                        value: model.id,
                        label: model.name,
                      })) ?? []
                  }
                  placeholder="Model"
                  value={filters.model}
                  onChange={(v) => handleChange("model", v)}
                  className={isPending ? "opacity-50 pointer-events-none" : ""}
                />
                <RangeDropdown
                  items={yearOptions}
                  minPlaceholder="Min year"
                  maxPlaceholder="Max year"
                  placeholder="Model Year"
                  minValue={filters.yearMin}
                  maxValue={filters.yearMax}
                  onMinChange={(v) => handleChange("yearMin", v)}
                  onMaxChange={(v) => handleChange("yearMax", v)}
                />
                <RangeDropdown
                  items={mileageOptions}
                  minPlaceholder="Min mileage"
                  maxPlaceholder="Max mileage"
                  placeholder="Mileage"
                  minValue={filters.mileageMin}
                  maxValue={filters.mileageMax}
                  onMinChange={(v) => handleChange("mileageMin", v)}
                  onMaxChange={(v) => handleChange("mileageMax", v)}
                />
                <RangeDropdown
                  items={priceOptions}
                  minPlaceholder="Min price"
                  maxPlaceholder="Max price"
                  placeholder="Price"
                  minValue={filters.priceMin}
                  maxValue={filters.priceMax}
                  onMinChange={(v) => handleChange("priceMin", v)}
                  onMaxChange={(v) => handleChange("priceMax", v)}
                />
                <div>
                  <Button
                    onClick={handleSearch}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-md !px-6 h-full text-base cursor-pointer"
                  >
                    <Search className="w-4 h-4 mr-2" /> Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <ArrowDown size={20} className="text-white/70" />
          </motion.div>
          <span className="text-white/70 text-sm mt-2">Scroll Down</span>
        </div>
      </div>

      <About />
      <Popular />
      <GetApp />
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-16">
        <Slider items={carLogos} />
      </div>
      <Footer />
    </div>
  );
}
