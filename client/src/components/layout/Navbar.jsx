"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-purple-faint/80 backdrop-blur-md border-b border-white/30 shadow-sm">
        <nav className="flex w-full items-center justify-between px-6 py-3 md:px-8">
          {/* LEFT: logo + links */}
          <div className="flex items-center gap-10">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Womens Care of Bradenton logo"
                width={120}
                height={32}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8 text-base text-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center gap-1 text-base text-foreground hover:text-primary transition-colors"
                >
                  Patient Info
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button href="/contact" variant="primary">
              Book appointment
            </Button>
            <Button href="/contact" variant="outline">
              Call us
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-primary p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-purple-faint/90 backdrop-blur-md border-t border-purple-lite px-6 py-5 flex flex-col gap-5 shadow-sm">
          <ul className="flex flex-col gap-4 text-base text-foreground">
            <li>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="hover:text-primary transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/patient-info"
                onClick={() => setMobileOpen(false)}
                className="hover:text-primary transition-colors"
              >
                Patient Info
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              href="/contact"
              variant="primary"
              className="text-center w-full"
            >
              Book appointment
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="text-center w-full"
            >
              Call us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}