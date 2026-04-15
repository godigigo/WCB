"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      gsap.from(".about-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(".about-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.from(".about-subtext", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.18,
      });

      gsap.from(".about-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.12,
      });

      gsap.from(".about-image", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        x: -36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".about-text-block", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        x: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".about-stat", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.35,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-purple-faint"
      ref={sectionRef}
    >
      {/* ── Background texture layers ───────────────── */}

      {/* Fine grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.032,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Dot grid — very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          color: "oklch(0.55 0.1 320)",
        }}
      />

      {/* Soft blush blob — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.88 0.05 330 / 0.22) 0%, transparent 65%)",
        }}
      />

      {/* Warm wash — bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.92 0.03 60 / 0.18) 0%, transparent 65%)",
        }}
      />

      {/* ── Main content ────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-0 lg:py-28">

        {/* ── Top heading block ───────────────────── */}
        <div className="mx-auto max-w-2xl text-center">

          {/* Eyebrow label with decorative lines */}
          <div className="about-label mb-5 flex items-center justify-center gap-3">
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to left, currentColor, transparent)",
                color: "oklch(0.6 0.1 320 / 0.4)",
              }}
            />
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
              style={{
                color: "oklch(0.42 0.12 320)",
                background: "oklch(0.94 0.04 330 / 0.5)",
                border: "1px solid oklch(0.84 0.06 330 / 0.3)",
              }}
            >
              About
            </span>
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to right, currentColor, transparent)",
                color: "oklch(0.6 0.1 320 / 0.4)",
              }}
            />
          </div>

          <h2 className="about-heading font-display text-3xl leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[42px]">
            A healthcare
            <br />
            <span className="italic" style={{ color: "oklch(0.44 0.13 322)" }}>
              for women.
            </span>
          </h2>

          <p className="about-subtext mx-auto mt-5 max-w-[420px] text-[14.5px] leading-[1.8] text-foreground/70">
            Founded in 2018 with a singular purpose — to give every woman the
            expert, unhurried care she deserves.
          </p>
        </div>

        {/* ── Main card ───────────────────────────── */}
        <div
          className="about-card relative mt-12 overflow-hidden rounded-[2rem] p-4 sm:p-5 md:p-6 lg:p-8"
          style={{
            background: "var(--color-purple-lite, oklch(0.95 0.03 320 / 0.6))",
            border: "1px solid oklch(0.84 0.05 320 / 0.25)",
            boxShadow:
              "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 16px 48px oklch(0.3 0.06 320 / 0.08)",
          }}
        >
          {/* Card inner grain */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{
              opacity: 0.025,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
            }}
          />

          {/* Card top-right soft shimmer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.9 0.05 330 / 0.18) 0%, transparent 65%)",
            }}
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">

            {/* Left: image */}
            <div className="about-image w-full md:w-[48%]">
              <div
                className="relative h-[230px] w-full overflow-hidden sm:h-[270px] md:h-[300px] lg:h-[340px]"
                style={{
                  borderRadius: "1.5rem",
                  boxShadow:
                    "0 4px 12px oklch(0.3 0.06 320 / 0.1), 0 16px 40px oklch(0.3 0.06 320 / 0.08)",
                }}
              >
                <Image
                  src="/about.png"
                  alt="Doctor caring for a patient in hospital bed"
                  fill
                  sizes="(min-width: 1024px) 48vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                {/* Bottom vignette on image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.2 0.04 320 / 0.35), transparent)",
                  }}
                />
              </div>
            </div>

            {/* Right: text */}
            <div className="about-text-block flex w-full flex-col justify-center md:w-[52%] md:py-2">

              {/* Foundation label */}
              <div className="mb-4 inline-flex w-fit items-center gap-2">
                <div
                  className="h-[1.5px] w-5 rounded-full"
                  style={{ background: "oklch(0.5 0.12 320 / 0.6)" }}
                />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "oklch(0.45 0.12 320)" }}
                >
                  Foundation
                </span>
              </div>

              <h3
                className="font-display leading-[1.12] tracking-[-0.02em] text-foreground"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)" }}
              >
                Double board-certified
                <br />
                <span>in family practice and </span>
                <span
                  className="italic"
                  style={{ color: "oklch(0.44 0.13 322)" }}
                >
                  gynecology
                </span>
              </h3>

              <p className="mt-4 text-[14.5px] leading-[1.82] text-foreground/75">
                Dr. Jothivijayarani holds dual certifications, bringing
                comprehensive expertise to every patient encounter — from
                routine preventive care to complex gynecological conditions.
              </p>

              {/* Small stat row — adds premium texture */}
              {/* <div className="mt-6 flex items-center gap-6">
                {[
                  { value: "30+", label: "Years practice" },
                  { value: "2x", label: "Board certified" },
                  { value: "10k+", label: "Patients cared for" },
                ].map((s) => (
                  <div key={s.label} className="about-stat flex flex-col gap-0.5">
                    <span
                      className="font-display text-[22px] font-bold leading-none tracking-tight text-foreground"
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-[10.5px] uppercase tracking-[0.16em]"
                      style={{ color: "oklch(0.5 0.1 320 / 0.7)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div> */}

              {/* Divider */}
              <div
                className="my-6 h-px"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.7 0.06 320 / 0.3), transparent)",
                }}
              />

              <div>
                <Button variant="outline">Meet our team</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}