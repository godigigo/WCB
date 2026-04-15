"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCard from "@/components/ui/TestimonialCard";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Very comfortable place, questions answered, everyone very professional. I felt genuinely cared for from the moment I walked in.",
    name: "Jody H.",
    location: "Bradenton, Florida",
    avatar: null,
  },
  {
    quote:
      "Staff really took time to listen and develop a plan. They never rushed me and addressed every concern I had with patience.",
    name: "Patricia D.",
    location: "Bradenton, Florida",
    avatar: null,
  },
  {
    quote:
      "Dr. Jothi listened carefully to my concerns and made me feel heard in a way I hadn't experienced before. Truly exceptional care.",
    name: "Shawna P.",
    location: "Bradenton, Florida",
    avatar: null,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      gsap.from(".test-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        y: 14,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(".test-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.07,
      });

      gsap.from(".test-subtext", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from(".test-divider", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".test-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.1,
      });

      gsap.from(".test-rating-block", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-beige"
      ref={sectionRef}
    >
      {/* ── Background texture ─────────────────────── */}

      {/* Fine grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Hairline dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.045,
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          color: "oklch(0.45 0.05 60)",
        }}
      />

      {/* Warm glow — top left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, oklch(0.93 0.03 60 / 0.28) 0%, transparent 65%)",
        }}
      />

      {/* Blush accent — bottom right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 55% 55%, oklch(0.9 0.04 330 / 0.2) 0%, transparent 65%)",
        }}
      />

      {/* ── Content ────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-0 lg:py-28">

        {/* ── Heading row ──────────────────────────── */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* Left: label + heading */}
          <div>
            {/* Eyebrow with flanking lines */}
            <div className="test-label mb-5 flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to left, oklch(0.55 0.06 60 / 0.5), transparent)",
                }}
              />
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: "oklch(0.42 0.08 60)",
                  background: "oklch(0.94 0.04 60 / 0.55)",
                  border: "1px solid oklch(0.82 0.05 60 / 0.35)",
                }}
              >
                Patient Stories
              </span>
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.55 0.06 60 / 0.5), transparent)",
                }}
              />
            </div>

            <h2
              className="test-heading font-display leading-[1.06] tracking-[-0.025em] text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)" }}
            >
              What our patients
              <br />
              <span
                className="italic"
                style={{ color: "oklch(0.44 0.1 55)" }}
              >
                are saying.
              </span>
            </h2>
          </div>

          {/* Right: subtext + aggregate rating */}
          <div className="test-subtext flex flex-col items-start gap-3 sm:items-end">
            <p
              className="max-w-[220px] text-[14px] leading-[1.8] sm:text-right"
              style={{ color: "oklch(0.45 0.04 60 / 0.75)" }}
            >
              Real voices from women across our community in Bradenton, FL.
            </p>

            {/* Aggregate star rating */}
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: "oklch(0.96 0.04 55 / 0.6)",
                border: "1px solid oklch(0.85 0.06 55 / 0.3)",
              }}
            >
              <div className="flex items-center gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{ color: "oklch(0.68 0.15 55)" }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span
                className="text-[11.5px] font-semibold"
                style={{ color: "oklch(0.38 0.08 55)" }}
              >
                5.0
              </span>
              <span
                className="text-[11px]"
                style={{ color: "oklch(0.5 0.05 60 / 0.7)" }}
              >
                · 200+ reviews
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ──────────────────────────────── */}
        <div
          className="test-divider mt-10 h-px"
          style={{
            background:
              "linear-gradient(to right, oklch(0.7 0.06 60 / 0.35), oklch(0.8 0.03 320 / 0.2), transparent)",
          }}
        />

        {/* ── Cards grid ───────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="test-card">
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                location={t.location}
                avatar={t.avatar}
              />
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}