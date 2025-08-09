// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Logo & Description */}
        <div>
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/wheel copy.png"
              alt="Car Dealer Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">AUTO&mdash;DEALER</span>
          </Link>
          <p className="mt-4 text-gray-400 text-sm">
            Premium cars. Exceptional service. Your trusted dealership for the
            perfect ride.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/inventory" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                Search
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Favourites
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Sell my Car
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/trade-in" className="hover:text-white">
                Trade-In
              </Link>
            </li>
            <li>
              <Link href="/test-drive" className="hover:text-white">
                Book a Test Drive
              </Link>
            </li>
            <li>
              <Link href="/repairs" className="hover:text-white">
                Sell your car
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-400 text-sm">
            123 Main Street, Addis Ababa, Ethiopia
          </p>
          <p className="text-gray-400 text-sm">Email: info@drivexmotors.com</p>
          <p className="text-gray-400 text-sm">Phone: +251 900 123 456</p>

          {/* Socials */}
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="hover:text-white">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Auto&mdash;Dealer. All rights reserved.
        </p>
        {/* <p>Designed with ❤️ by DriveX Motors</p> */}
      </div>
    </footer>
  );
}
