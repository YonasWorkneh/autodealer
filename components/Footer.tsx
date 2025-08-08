"use client";

import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const contact = {
    phoneDisplay: "+251 911 13 50 90",
    phoneHref: "+251911135090",
    email: "sales@proximaauto.com",
    addressLine1: "22, (2Q6M+H8 Addis",
    addressLine2: "Ababa Ethiopia)",
    mapsQuery: "22 Atlas Bole Addis Ababa Ethiopia",
  };

  const socials = [
    { name: "Telegram", href: "https://t.me/", icon: Send },
    { name: "Facebook", href: "https://facebook.com/", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
    { name: "Twitter", href: "https://twitter.com/", icon: Twitter },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-7">
            <h2 className="text-xl font-semibold tracking-wide">Contact</h2>

            <ul className="mt-8 space-y-6">
              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 rounded-lg bg-white/5 p-2 ring-1 ring-white/10"
                >
                  <Phone className="size-5" />
                </span>
                <div>
                  <Link
                    href={`tel:${contact.phoneHref}`}
                    className="text-lg hover:underline underline-offset-4"
                    aria-label={"Call " + contact.phoneDisplay}
                  >
                    {contact.phoneDisplay}
                  </Link>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 rounded-lg bg-white/5 p-2 ring-1 ring-white/10"
                >
                  <Mail className="size-5" />
                </span>
                <div>
                  <Link
                    href={`mailto:${contact.email}`}
                    className="text-lg hover:underline underline-offset-4 break-all"
                    aria-label={"Email " + contact.email}
                  >
                    {contact.email}
                  </Link>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 rounded-lg bg-white/5 p-2 ring-1 ring-white/10"
                >
                  <MapPin className="size-5" />
                </span>
                <address className="not-italic text-lg">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      contact.mapsQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                    aria-label={"Open address in Google Maps"}
                  >
                    {contact.addressLine1} {contact.addressLine2}
                  </Link>
                </address>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              {socials.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex size-[44px] items-center justify-center rounded-full ring-1 ring-white/60 transition hover:ring-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label={name}
                >
                  <Icon className="size-5 text-white transition group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer column to approximate screenshot layout (content shifted right) */}
          <div className="hidden md:col-span-6 lg:col-span-5 md:block" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex items-center justify-center py-6 text-sm text-white/80">
            <p>{"©" + new Date().getFullYear()} all rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
