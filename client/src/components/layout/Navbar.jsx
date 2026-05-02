"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const services = [
  { label: "Gynecology",                 href: "/services/gynecology",                 external: false },
  { label: "Well-Woman Exams",           href: "/services/well-woman-exams",           external: false },
  { label: "Minimally Invasive Surgery", href: "/services/minimally-invasive-surgery", external: false },
  { label: "Infertility",                href: "/services/infertility",                external: false },
  { label: "MedSpa",                     href: "https://www.spabradenton.com/",         external: true  },
];

const patientResources = [
  {
    label: "Patient Portal",
    href: "https://mycw140.ecwcloud.com/portal19566/jsp/100mp/login_otp.jsp",
    external: true,
  },
  {
    label: "Blog",
    href: "/blog",
    external: false,
  },
  {
    label: "Patient Forms",
    href: "/patient-forms.pdf",
    external: false,
  },
  {
    label: "Terms & Policies",
    href: "/terms",
    external: false,
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePatientOpen, setMobilePatientOpen] = useState(false);

  const servicesRef = useRef(null);
  const patientRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
      if (patientRef.current && !patientRef.current.contains(e.target)) {
        setPatientOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Shared dropdown item renderer
  function DropdownItem({ item, onClose }) {
    const sharedClass =
      "group flex items-center justify-between px-4 py-2.5 text-[14px] font-medium transition-colors duration-150 hover:bg-[oklch(0.94_0.03_320_/_0.4)]";
    const sharedStyle = { color: "#3A2F2B" };

    const chevron = (
      <svg
        className="h-3.5 w-3.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{ color: "oklch(0.48 0.13 322)" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
    );

    const externalIcon = (
      <svg
        className="h-3.5 w-3.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{ color: "oklch(0.48 0.13 322)" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
        />
      </svg>
    );

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          onClick={onClose}
          className={sharedClass}
          style={sharedStyle}
        >
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">
            {item.label}
          </span>
          {externalIcon}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        role="menuitem"
        onClick={onClose}
        className={sharedClass}
        style={sharedStyle}
      >
        <span className="transition-transform duration-150 group-hover:translate-x-0.5">
          {item.label}
        </span>
        {chevron}
      </Link>
    );
  }

  // Shared desktop dropdown panel
  function DesktopDropdown({ items, footerLabel, onClose }) {
    return (
      <div
        role="menu"
        className="absolute left-0 top-[calc(100%+10px)] w-60 origin-top-left overflow-hidden rounded-2xl transition-all duration-200 opacity-100 scale-100 translate-y-0 pointer-events-auto"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid oklch(0.88 0.04 320 / 0.22)",
          boxShadow:
            "0 4px 8px oklch(0.3 0.06 320 / 0.04), 0 16px 40px oklch(0.3 0.06 320 / 0.11)",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-[3px] w-full"
          style={{
            background:
              "linear-gradient(to right, oklch(0.48 0.13 322), oklch(0.78 0.07 340 / 0.3))",
          }}
        />

        <ul className="flex flex-col py-2" role="none">
          {items.map((item, i) => (
            <li key={item.href} role="none">
              <DropdownItem item={item} onClose={onClose} />
              {i < items.length - 1 && (
                <div
                  className="mx-4 h-px"
                  style={{ background: "oklch(0.88 0.03 320 / 0.25)" }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <div
          className="mx-3 mb-2 mt-0.5 rounded-xl px-3 py-2.5"
          style={{ background: "oklch(0.94 0.04 320 / 0.35)" }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "oklch(0.44 0.1 320)" }}
          >
            Bradenton, FL
          </p>
          <p className="text-[11.5px] leading-snug" style={{ color: "#8A7F7B" }}>
            {footerLabel}
          </p>
        </div>
      </div>
    );
  }

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

              {/* Services dropdown */}
              <li ref={servicesRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setServicesOpen((v) => !v);
                    setPatientOpen(false);
                  }}
                  className="flex items-center gap-1 text-base text-foreground hover:text-primary transition-colors"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
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

                {servicesOpen && (
                  <DesktopDropdown
                    items={services}
                    footerLabel="Board-certified women's healthcare"
                    onClose={() => setServicesOpen(false)}
                  />
                )}
              </li>

              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary transition-colors">
                  Team
                </Link>
              </li>

              {/* Patient Resources dropdown */}
              <li ref={patientRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setPatientOpen((v) => !v);
                    setServicesOpen(false);
                  }}
                  className="flex items-center gap-1 text-base text-foreground hover:text-primary transition-colors"
                  aria-expanded={patientOpen}
                  aria-haspopup="true"
                >
                  Patient Info
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${patientOpen ? "rotate-180" : ""}`}
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

                {patientOpen && (
                  <DesktopDropdown
                    items={patientResources}
                    footerLabel="Your health, our priority"
                    onClose={() => setPatientOpen(false)}
                  />
                )}
              </li>
            </ul>
          </div>

          {/* Desktop CTAs */}
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
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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

            {/* Mobile services accordion */}
            <li>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between text-base text-foreground hover:text-primary transition-colors"
              >
                Services
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
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

              {mobileServicesOpen && (
                <ul
                  className="mt-3 flex flex-col gap-0 overflow-hidden rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid oklch(0.88 0.04 320 / 0.2)",
                  }}
                >
                  {services.map((s, i) => (
                    <li key={s.href}>
                      {s.external ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                          className="flex items-center justify-between px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[oklch(0.94_0.03_320_/_0.4)]"
                          style={{ color: "#3A2F2B" }}
                        >
                          {s.label}
                          <svg className="h-3.5 w-3.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "oklch(0.48 0.13 322)" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={s.href}
                          onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                          className="block px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[oklch(0.94_0.03_320_/_0.4)]"
                          style={{ color: "#3A2F2B" }}
                        >
                          {s.label}
                        </Link>
                      )}
                      {i < services.length - 1 && (
                        <div className="mx-4 h-px" style={{ background: "oklch(0.88 0.03 320 / 0.25)" }} />
                      )}
                    </li>
                  ))}
                </ul>
              )}
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

            {/* Mobile Patient Resources accordion */}
            <li>
              <button
                type="button"
                onClick={() => setMobilePatientOpen((v) => !v)}
                className="flex w-full items-center justify-between text-base text-foreground hover:text-primary transition-colors"
              >
                Patient Info
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${mobilePatientOpen ? "rotate-180" : ""}`}
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

              {mobilePatientOpen && (
                <ul
                  className="mt-3 flex flex-col gap-0 overflow-hidden rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid oklch(0.88 0.04 320 / 0.2)",
                  }}
                >
                  {patientResources.map((r, i) => (
                    <li key={r.href}>
                      {r.external ? (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { setMobileOpen(false); setMobilePatientOpen(false); }}
                          className="flex items-center justify-between px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[oklch(0.94_0.03_320_/_0.4)]"
                          style={{ color: "#3A2F2B" }}
                        >
                          {r.label}
                          <svg className="h-3.5 w-3.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "oklch(0.48 0.13 322)" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={r.href}
                          onClick={() => { setMobileOpen(false); setMobilePatientOpen(false); }}
                          className="block px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[oklch(0.94_0.03_320_/_0.4)]"
                          style={{ color: "#3A2F2B" }}
                        >
                          {r.label}
                        </Link>
                      )}
                      {i < patientResources.length - 1 && (
                        <div className="mx-4 h-px" style={{ background: "oklch(0.88 0.03 320 / 0.25)" }} />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <div className="flex flex-col gap-3 pt-2">
            <Button href="/contact" variant="primary" className="text-center w-full">
              Book appointment
            </Button>
            <Button href="/contact" variant="outline" className="text-center w-full">
              Call us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}