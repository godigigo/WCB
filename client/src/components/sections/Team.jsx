"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "@/components/ui/TeamCard";

gsap.registerPlugin(ScrollTrigger);

const teamLeftColumn = [
  {
    variant: "large",
    image: "/team/team-1.jpg",
    name: "Dr. Jothivijayarani",
    role: "Founder and lead physician",
    description:
      "Thirty years of women's healthcare with board certifications in family practice and gynecology.",
  },
  {
    variant: "small",
    image: "/team/team-2.jpg",
    name: "Michelle Thompson",
    role: "Clinical coordinator",
    description:
      "Ensures smooth patient experiences and manages scheduling with professionalism and warmth.",
  },
  {
    variant: "small",
    image: "/team/team-3.jpg",
    name: "Dr. Sarah Mitchell",
    role: "OB/GYN specialist",
    description:
      "Specializes in minimally invasive procedures and reproductive health with compassionate patient care.",
  },
];

const teamRightColumn = [
  {
    variant: "small",
    image: "/team/team-4.jpg",
    name: "Jennifer Rodriguez",
    role: "Nurse practitioner",
    description:
      "Provides comprehensive women's health services with a focus on preventive care and education.",
  },
  {
    variant: "small",
    image: "/team/team-5.jpg",
    name: "Amanda Chen",
    role: "Physician assistant",
    description:
      "Delivers personalized care in gynecology and well woman exams with attention to detail.",
  },
  {
    variant: "large",
    image: "/team/team-6.jpg",
    name: "Lisa Patterson",
    role: "Medical assistant",
    description:
      "Supports clinical operations and patient comfort with genuine care and efficiency.",
  },
];

export default function Team() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      gsap.from(".team-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        y: 14,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(".team-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.from(".team-subtext", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.16,
      });

      gsap.from(".team-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.11,
        delay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-primary"
      ref={sectionRef}
    >
      {/* ── Background texture layers ───────────────── */}

      {/* Fine grain on primary color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Hairline dot grid — white on primary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.055,
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft light orb — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(1 0 0 / 0.07) 0%, transparent 60%)",
        }}
      />

      {/* Darker depth — bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 55% 55%, oklch(0.2 0.08 320 / 0.25) 0%, transparent 65%)",
        }}
      />

      {/* Hairline decorative ring — mid left (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{
          top: "20%",
          left: "-60px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          border: "1px solid oklch(1 0 0 / 0.08)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{
          top: "calc(20% + 20px)",
          left: "-40px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          border: "1px solid oklch(1 0 0 / 0.05)",
        }}
      />

      {/* ── Content ─────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 text-white sm:px-6 sm:py-20 md:py-24 lg:px-0 lg:py-28">

        {/* ── Heading block ───────────────────────── */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          {/* Left: label + heading */}
          <div className="max-w-xl">
            {/* Eyebrow pill */}
            <div className="team-label mb-5 flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to left, oklch(1 0 0 / 0.4), transparent)",
                }}
              />
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: "oklch(0.95 0.02 320)",
                  background: "oklch(1 0 0 / 0.1)",
                  border: "1px solid oklch(1 0 0 / 0.16)",
                }}
              >
                Our Team
              </span>
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to right, oklch(1 0 0 / 0.4), transparent)",
                }}
              />
            </div>

            <h2
              className="team-heading font-display leading-[1.06] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Meet our{" "}
              <span
                className="italic"
                style={{ color: "oklch(0.88 0.06 320)" }}
              >
                Experts.
              </span>
            </h2>
          </div>

          {/* Right: subtext */}
          <p
            className="team-subtext max-w-[240px] text-[14px] leading-[1.8] sm:text-right"
            style={{ color: "oklch(1 0 0 / 0.6)" }}
          >
            Experienced, board-certified physicians dedicated entirely to your care.
          </p>
        </header>

        {/* ── Divider ──────────────────────────────── */}
        <div
          className="mt-10 h-px"
          style={{
            background:
              "linear-gradient(to right, oklch(1 0 0 / 0.22), oklch(1 0 0 / 0.08), transparent)",
          }}
        />

        {/* ── Bento grid (unchanged structure) ─────── */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-start lg:gap-6">

          {/* LEFT column */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {teamLeftColumn.map((member) => (
              <div key={member.name} className="team-card">
                <TeamCard {...member} />
              </div>
            ))}
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {teamRightColumn.map((member) => (
              <div key={member.name} className="team-card">
                <TeamCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}