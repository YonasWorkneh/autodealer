// components/Slider.tsx
"use client";

import Image from "next/image";

interface SlideItem {
  image: string;
  title: string;
}

interface SliderProps {
  items: SlideItem[];
  speed?: number; // seconds for one loop
}

export default function Slider({ items, speed = 30 }: SliderProps) {
  const doubledItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
      {/* Slider track */}
      <div className="flex ">
        <div
          className="flex animate-slide"
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 flex flex-col items-center"
            >
              <div className="w-36 h-20 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex animate-slide"
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 flex flex-col items-center"
            >
              <div className="w-36 h-20 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%); 
          }
        }
        .animate-slide {
          animation: slide linear infinite;
        }
      `}</style>
    </div>
  );
}
