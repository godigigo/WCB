"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  const heroRef = useRef(null);


  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: "power4.out" },
      });

      tl.from(".hero-label-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.5,
        ease: "power3.out",
      })
        .from(".hero-label-text", { opacity: 0, x: -10, duration: 0.4 }, "-=0.25")
        .from(
          ".hero-heading .word",
          { y: "110%", opacity: 0, stagger: 0.07, duration: 0.75 },
          "-=0.2",
        )
        .from(".hero-subtext", { opacity: 0, y: 18, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 16, stagger: 0.12, duration: 0.5 }, "-=0.35")
        .from(".hero-trust-item", { opacity: 0, y: 12, stagger: 0.1, duration: 0.45 }, "-=0.4")
        .from(".hero-stat", { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, "-=0.5")
        .from(
          ".hero-image-wrap",
          { opacity: 0, scale: 0.97, duration: 1, ease: "power3.out" },
          "-=1.2",
        )
        .from(
          ".hero-image-badge",
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headingLines = [
    { text: "A Lifetime of", italic: false },
    { text: "Compassionate", italic: false },
    {
      text: "Care for",
      italic: false,
      suffix: { text: "Women.", italic: true },
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#FAF5F1]"
      style={{ fontFamily: "var(--font-body, 'DM Sans', system-ui, -apple-system, sans-serif)" }}
    >
      {/* Layered background: grain + gradients + soft shapes */}
      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Soft color blocks / gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[720px] w-[720px] rounded-[60%]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.9 0.04 340 / 0.42), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-[520px] w-[520px] rotate-[-6deg]"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.01 80) 0%, oklch(0.93 0.03 320 / 0.55) 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-220px] h-[320px]"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.9 0.02 60 / 0.6), transparent 70%)",
        }}
      />

      {/* Main content container */}
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-24 lg:px-12 lg:py-28">
        {/* LEFT: Text */}
        <div className="order-2 flex flex-col md:order-1">
          {/* Location label with pill accent */}
          <div className="hero-label mb-7 inline-flex items-center gap-3 rounded-full bg-white/60 px-3 py-1.5 shadow-sm ring-1 ring-white/70 backdrop-blur-[10px]">
            <span
              className="hero-label-line block h-[2px] w-8 rounded-full"
              style={{ backgroundColor: "oklch(0.45 0.12 320)" }}
            />
            <span
              className="hero-label-text font-sans text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "oklch(0.42 0.12 320)" }}
            >
              Women&apos;s Healthcare · Bradenton, FL
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-heading mb-7 font-serif"
            style={{
              fontFamily: "var(--font-display, 'Playfair Display', 'Times New Roman', serif)",
              fontSize: "clamp(2.7rem, 5.6vw, 4.4rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "#18120F",
              overflow: "hidden",
            }}
          >
            {headingLines.map((line, li) => (
              <span key={li} className="block overflow-hidden leading-[1.08]">
                {line.text.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className="word mr-[0.24em] inline-block"
                    style={{ display: "inline-block" }}
                  >
                    {word}
                  </span>
                ))}
                {line.suffix && (
                  <span
                    className="word inline-block italic"
                    style={{
                      display: "inline-block",
                      fontStyle: "italic",
                      color: "oklch(0.45 0.12 320)",
                    }}
                  >
                    {line.suffix.text}
                  </span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p
            className="hero-subtext mb-9 max-w-[460px] text-[15px] leading-[1.8]"
            style={{ color: "#776F69" }}
          >
            From preventive gynecology to advanced minimally invasive procedures, we provide
            complete women&apos;s healthcare with the expertise, time, and compassion you deserve.
          </p>

          {/* CTAs */}
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Button className="hero-cta" variant="primary" href="/book-appointment">
              Book an appointment
            </Button>
            <Button className="hero-cta" variant="outline" href="/services">
              See how we help
            </Button>
          </div>

          {/* Divider */}
          <div
            className="mb-8 h-px w-full max-w-[460px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent, oklch(0.88 0.01 60), transparent)",
            }}
          />

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6">
            {[
              {
                icon: (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                label: "Board Certified",
              },
              {
                icon: (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                label: "30+ Years Experience",
              },
              {
                icon: (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                label: "Compassionate Care",
              },
            ].map((item, i) => (
              <div key={i} className="hero-trust-item flex items-center gap-2">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "oklch(0.96 0.04 340 / 0.75)",
                    color: "oklch(0.42 0.12 320)",
                  }}
                >
                  {item.icon}
                </span>
                <span className="text-[13px]" style={{ color: "#6B6560" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="order-1 md:order-2">
          <div className="hero-image-wrap relative">
            {/* Glow frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-2px] rounded-[2.1rem_2.1rem_6.1rem_2.1rem]"
              style={{
                background:
                  "conic-gradient(from 210deg, oklch(0.9 0.04 340 / 0.7), transparent 28%, transparent 72%, oklch(0.88 0.06 320 / 0.65))",
                opacity: 0.65,
                filter: "blur(8px)",
              }}
            />

            {/* Main image card */}
            <div
              className="relative h-[280px] w-full overflow-hidden sm:h-[420px] md:h-[580px] lg:h-[660px]"
              style={{
                borderRadius: "2rem 2rem 6rem 2rem",
                boxShadow:
                  "0 14px 40px oklch(0.2 0.02 60 / 0.16), 0 4px 10px oklch(0.2 0.02 60 / 0.08)",
                background:
                  "radial-gradient(circle at 10% 0%, oklch(0.97 0.02 80), oklch(0.92 0.02 60))",
              }}
            >
              <Image
                src="/hero.png"
                alt="Doctor consulting with a female patient"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              {/* Bottom gradient vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.18 0.02 60 / 0.48), transparent)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              className="hero-image-badge absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-bottom-6 sm:-left-6 sm:px-5 sm:py-4"
              style={{
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow:
                  "0 6px 24px oklch(0.2 0.02 60 / 0.14), 0 1px 0 oklch(0.96 0.01 80)",
                border: "1px solid oklch(0.93 0.02 80 / 0.9)",
              }}
            >
              <span
                className="hero-stat flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, oklch(0.88 0.06 340 / 0.75), oklch(0.82 0.05 320 / 0.7))",
                  color: "oklch(0.42 0.12 320)",
                }}
              >
                ♥
              </span>
              <div>
                <p
                  className="hero-stat text-[18px] font-bold leading-none"
                  style={{
                    color: "#1C1814",
                    fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)",
                  }}
                >
                  10,000+
                </p>
                <p
                  className="hero-stat mt-0.5 text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "#9A9490" }}
                >
                  Patients Cared For
                </p>
              </div>
            </div>

            {/* Floating accent dots */}
            <div
              aria-hidden="true"
              className="absolute -right-2 top-9 h-5 w-5 rounded-full sm:-right-4 sm:top-12 sm:h-6 sm:w-6"
              style={{ background: "oklch(0.72 0.1 320 / 0.65)" }}
            />
            <div
              aria-hidden="true"
              className="absolute -right-6 top-20 h-3 w-3 rounded-full sm:-right-8 sm:top-24"
              style={{ background: "oklch(0.86 0.07 340 / 0.45)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}