// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, Heart, MapPin, Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Header from "@/components/Header";
// import Link from "next/link";
// import { CarDetailModal } from "./CarDetailModal";

// export default function CarMarketplace() {
//   const [detailOpened, setDetailOpened] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false); // Mobile filter state

//   const cars = [
//     {
//       id: 1,
//       year: 2024,
//       make: "Jeep",
//       model: "Grand Cherokee Limited",
//       mileage: "39,514 Miles",
//       location: "Live Oak, TX",
//       price: "$26,999",
//       monthlyEst: "$467/mo",
//       daysOnMarket: 104,
//       percentLess: "45% less than similar listings",
//       image: "/2024-black-jeep-grand-cherokee.png",
//     },
//     {
//       id: 2,
//       year: 2024,
//       make: "Kia",
//       model: "Forte LXS",
//       mileage: "33,770 Miles",
//       location: "Austin, TX",
//       price: "$16,724",
//       monthlyEst: "$289/mo",
//       daysOnMarket: 11,
//       percentLess: "20% less than similar listings",
//       image: "/2024-red-kia-forte-sedan.png",
//     },
//     {
//       id: 3,
//       year: 2025,
//       make: "Chevrolet",
//       model: "Colorado WT/LT",
//       mileage: "New",
//       location: "Austin, TX",
//       price: "$38,659",
//       monthlyEst: "$669/mo",
//       daysOnMarket: 189,
//       percentLess: null,
//       image: "/2025-white-chevy-colorado.png",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <Header color="black" />

//       <div className="pt-16 px-4 sm:px-6 lg:px-16">
//         {/* Mobile Filter Button */}
//         <div className="sm:hidden mb-4 flex justify-end">
//           <Button
//             onClick={() => setFilterOpen(true)}
//             className="flex items-center gap-2"
//           >
//             <Filter className="h-4 w-4" />
//             Filters
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Sidebar Filters - Desktop */}
//           <div className="hidden lg:block lg:col-span-1">
//             <FilterSidebar />
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Search and Sort */}
//             <div className="sticky top-0 bg-white z-40 pb-4">
//               <Card className="border-gray-200 rounded-3xl shadow-none py-0">
//                 <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                   <div className="relative w-full sm:flex-1">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     <Input
//                       placeholder="Search by make, model, or body style"
//                       className="pl-10 h-12 text-lg border-none shadow-none focus:ring-0 w-full"
//                     />
//                   </div>

//                   <div className="flex flex-col sm:flex-row border-t sm:border-t-0 sm:border-l border-gray-200 py-4 sm:py-0 justify-center items-center gap-2 sm:gap-4">
//                     <p className="font-bold text-xs text-center uppercase">
//                       Sort By
//                     </p>
//                     <Select>
//                       <SelectTrigger className="w-full sm:w-32 text-center border-none shadow-none focus:ring-0">
//                         <SelectValue placeholder="Best match" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="best">Best match</SelectItem>
//                         <SelectItem value="price-low">
//                           Price: Low to High
//                         </SelectItem>
//                         <SelectItem value="price-high">
//                           Price: High to Low
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Results Count */}
//             <div className="mb-6">
//               <h2 className="text-3xl font-bold text-black">90,853</h2>
//               <p className="text-gray-600">vehicles found</p>
//             </div>

//             {/* Car Listings */}
//             <div className="space-y-4">
//               {cars.map((car) => (
//                 <Link
//                   key={car.id}
//                   href={"/listing/gibberish"}
//                   className="block relative"
//                 >
//                   <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
//                     <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//                       {/* Image */}
//                       <div className="relative">
//                         <img
//                           src={car.image || "/placeholder.svg"}
//                           alt={`${car.year} ${car.make} ${car.model}`}
//                           className="w-full h-40 object-cover rounded-lg"
//                         />
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="absolute top-2 right-2 bg-white/80 hover:bg-white"
//                         >
//                           <Heart className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       {/* Details */}
//                       <div className="md:col-span-2 space-y-2">
//                         <h3 className="text-lg sm:text-xl font-semibold text-black">
//                           {car.year} {car.make} {car.model}
//                         </h3>
//                         <p className="text-gray-600 text-sm">{car.mileage}</p>
//                         <p className="text-gray-600 text-sm">{car.location}</p>
//                         {car.percentLess && (
//                           <Badge
//                             variant="secondary"
//                             className="bg-green-100 text-green-800"
//                           >
//                             {car.percentLess}
//                           </Badge>
//                         )}
//                         <p className="text-gray-600 text-sm">
//                           {car.daysOnMarket} days on market
//                         </p>
//                       </div>

//                       {/* Price */}
//                       <div className="flex flex-col justify-between items-end text-right space-y-1">
//                         <p className="text-xl sm:text-2xl font-bold">
//                           {car.price}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           est. {car.monthlyEst}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Panel */}
//       <CarMarketplaceMobileFilters />

//       {detailOpened && (
//         <CarDetailModal
//           isOpen={detailOpened}
//           car={{
//             id: "string",
//             year: 2022,
//             make: "Volkswagen",
//             model: "ID6",
//             trim: "SV",
//             price: 4_000_000,
//             monthlyPayment: 200_000,
//             image: "/id6-orange.png",
//             mileage: 0,
//             transmission: "Automatic",
//             drivetrain: "AWD",
//             mpg: "",
//             exteriorColor: "Orange",
//             interiorColor: "White",
//             fuelType: "",
//             bodyStyle: "SUV",
//             doors: 4,
//             vin: "KNMAT2MV0HP518223",
//           }}
//           onClose={() => setDetailOpened(false)}
//         />
//       )}
//     </div>
//   );
// }

// // Sidebar Filters Component
// function FilterSidebar({ close }: { close?: () => void }) {
//   return (
//     <Card className="border-none shadow-none mb-6">
//       <CardContent className="p-4 sm:p-6 space-y-6">
//         <Button
//           variant="outline"
//           size="sm"
//           className="text-black border-black hover:bg-black hover:text-white bg-transparent w-full"
//           onClick={close}
//         >
//           Clear filters
//         </Button>

//         {/* Make & Model */}
//         <div>
//           <h3 className="text-sm font-semibold text-black mb-3">
//             Make & Model
//           </h3>
//           <div className="grid grid-cols-2 gap-4">
//             <Select>
//               <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
//                 <SelectValue placeholder="Make" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="jeep">Jeep</SelectItem>
//                 <SelectItem value="kia">Kia</SelectItem>
//                 <SelectItem value="chevrolet">Chevrolet</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
//                 <SelectValue placeholder="Model" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="jeep">1 series</SelectItem>
//                 <SelectItem value="kia">2 series</SelectItem>
//                 <SelectItem value="chevrolet">3 series</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Year Range */}
//         <div>
//           <h3 className="text-sm font-semibold text-black mb-3">Year</h3>
//           <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//             <Input
//               placeholder="1940"
//               className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
//             />
//             <span className="text-gray-500">to</span>
//             <Input
//               placeholder="2026"
//               className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
//             />
//           </div>
//         </div>

//         {/* Price Range */}
//         <div>
//           <h3 className="text-sm font-semibold text-black mb-3">Price</h3>
//           <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//             <Input
//               placeholder="$0"
//               className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
//             />
//             <span className="text-gray-500">to</span>
//             <Input
//               placeholder="$100,000+"
//               className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
//             />
//           </div>
//         </div>

//         {/* Max Mileage */}
//         <div>
//           <h3 className="text-sm font-semibold text-black mb-3">Max Mileage</h3>
//           <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//             <Input
//               placeholder="0 mi."
//               className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
//             />
//             <span className="text-gray-500">to</span>
//             <Input
//               placeholder="300,000+ mi."
//               className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
//             />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function CarMarketplaceMobileFilters() {
//   const [filterOpen, setFilterOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Filter Button */}
//       <div className="sm:hidden mb-4 flex justify-end">
//         <Button
//           onClick={() => {
//             console.log("filteri open");
//             setFilterOpen(true);
//           }}
//           className="flex items-center gap-2"
//         >
//           <Filter className="h-4 w-4" />
//           Filters
//         </Button>
//       </div>

//       {/* Mobile Filter Panel with animation */}
//       <AnimatePresence>
//         {filterOpen && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               className="fixed inset-0 bg-black/30 z-50"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setFilterOpen(false)}
//             />

//             {/* Sliding Sidebar */}
//             <motion.div
//               className="fixed top-0 right-0 bg-white w-3/4 max-w-xs p-4 h-full z-50 overflow-y-auto shadow-xl"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-bold text-lg">Filters</h2>
//                 <Button variant="ghost" onClick={() => setFilterOpen(false)}>
//                   Close
//                 </Button>
//               </div>

//               <FilterSidebar close={() => setFilterOpen(false)} />
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Search, Heart, MapPin, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Link from "next/link";
import { CarDetailModal } from "./CarDetailModal";

export default function CarMarketplace() {
  const [detailOpened, setDetailOpened] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false); // Mobile filter state

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

      <div className="pt-16 px-4 sm:px-6 lg:px-40">
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
                <Link
                  key={car.id}
                  href={"/listing/gibberish"}
                  className="block relative"
                >
                  <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Details */}
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-black">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <p className="text-gray-600 text-sm">{car.mileage}</p>
                        <p className="text-gray-600 text-sm">{car.location}</p>
                        {car.percentLess && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {car.percentLess}
                          </Badge>
                        )}
                        <p className="text-gray-600 text-sm">
                          {car.daysOnMarket} days on market
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col justify-between items-end text-right space-y-1">
                        <p className="text-xl sm:text-2xl font-bold">
                          {car.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          est. {car.monthlyEst}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Button
                    className="absolute top-[calc(50%-15px)] -right-3 z-50 cursor-pointer w-fit h-fit flex flex-col gap-1 bg-transparent shadow-none hover:bg-transparent border border-gray-200 rounded-xl p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDetailOpened(true);
                    }}
                  >
                    <span className="inline-block size-[6px] bg-gray-500 rounded-full p-0" />
                    <span className="inline-block size-[6px] bg-gray-500 rounded-full" />
                    <span className="inline-block size-[6px] bg-gray-500 rounded-full" />
                  </Button>
                </Link>
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
          }}
          onClose={() => setDetailOpened(false)}
        />
      )}
    </div>
  );
}

// Sidebar Filters Component
function FilterSidebar({ close }: { close?: () => void }) {
  return (
    <Card className="border-none shadow-none mb-6 sm:border sm:shadow-sm !sm:border-gray-500 sticky top-0 bg-white z-40">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <Button
          variant="outline"
          size="sm"
          className="text-black border-black hover:bg-black hover:text-white bg-transparent w-full"
          onClick={close}
        >
          Clear filters
        </Button>

        {/* Make & Model */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">
            Make & Model
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="jeep">Jeep</SelectItem>
                <SelectItem value="kia">Kia</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="jeep">1 series</SelectItem>
                <SelectItem value="kia">2 series</SelectItem>
                <SelectItem value="chevrolet">3 series</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Year Range */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Year</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="1940"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="2026"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Price</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="$0"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="$100,000+"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
          </div>
        </div>

        {/* Max Mileage */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Max Mileage</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="0 mi."
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="300,000+ mi."
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
