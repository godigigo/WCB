"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "@/components/ui/TeamCard";

gsap.registerPlugin(ScrollTrigger);

const featuredMember = {
  variant: "large",
  image: "/team/team-1.jpg",
  name: "Dr. Arunachalam Jothivijayarani",
  role: "Founder & Lead Physician",
  description:
    "Dr. Jothivijayarani is the founder of Womens Care of Bradenton. Board-certified in Family Practice and Gynecology, she has been serving women in Bradenton for over thirty years with compassionate, comprehensive care.",
};

const supportingMembers = [
  {
    variant: "small",
    image: "/team/team-2.jpg",
    name: "Katelin Schulte, APRN",
    role: "Advanced Practice Registered Nurse",
    description:
      "A compassionate family nurse practitioner with comprehensive OB/GYN experience. Graduate of the University of St. Francis, Elgin, Illinois.",
  },
  {
    variant: "small",
    image: "/team/team-3.jpg",
    name: "Gail Shafran MSN FNP-BC, NP",
    role: "Nurse Practitioner",
    description:
      "Board-certified nurse practitioner and graduate of Brandman University, specializing in outpatient and primary care.",
  },
  {
    variant: "small",
    image: "/team/team-4.jpg",
    name: "Kandyce Lopez, PA",
    role: "Physician Assistant",
    description:
      "Certified physician assistant from Nova Southeastern University specializing in ambulatory care and reproductive health.",
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
        y: 14, opacity: 0, duration: 0.5, ease: "power3.out",
      });

      gsap.from(".team-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 36, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.08,
      });

      gsap.from(".team-subtext", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.16,
      });

      gsap.from(".team-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 32, opacity: 0, duration: 0.85, ease: "power3.out",
        stagger: 0.11, delay: 0.1,
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.055,
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(1 0 0 / 0.07) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 55% 55%, oklch(0.2 0.08 320 / 0.25) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{ top: "20%", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", border: "1px solid oklch(1 0 0 / 0.08)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{ top: "calc(20% + 20px)", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid oklch(1 0 0 / 0.05)" }}
      />

      {/* ── Content ─────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 text-white sm:px-6 sm:py-20 md:py-24 lg:px-0 lg:py-28">

        {/* ── Heading block ───────────────────────── */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="team-label mb-5 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(to left, oklch(1 0 0 / 0.4), transparent)" }} />
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "oklch(0.95 0.02 320)", background: "oklch(1 0 0 / 0.1)", border: "1px solid oklch(1 0 0 / 0.16)" }}
              >
                Our Team
              </span>
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, oklch(1 0 0 / 0.4), transparent)" }} />
            </div>

            <h2
              className="team-heading font-display leading-[1.06] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Meet our{" "}
              <span className="italic" style={{ color: "oklch(0.88 0.06 320)" }}>
                Experts.
              </span>
            </h2>
          </div>

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
          style={{ background: "linear-gradient(to right, oklch(1 0 0 / 0.22), oklch(1 0 0 / 0.08), transparent)" }}
        />

        {/*
          ── Bento grid ────────────────────────────────
          Desktop (md+):
          ┌──────────────┬─────────────┬─────────────┐  ← row 1
          │              │  Katelin    │    Gail      │
          │  Dr. Jothi   ├─────────────┴─────────────┤  ← row 2
          │  (row-span-2)│       Kandyce Lopez        │
          └──────────────┴────────────────────────────┘

          Both rows have equal height via grid-rows.
          All cells use h-full so cards stretch to fill.
        */}
        <div
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 lg:gap-5"
          style={{ gridTemplateRows: "1fr 1fr" }}
        >
          {/* Featured — spans both rows on the left */}
          <div className="team-card md:row-span-2 md:flex md:flex-col">
            <TeamCard {...featuredMember} />
          </div>

          {/* Small card 1 — top-center */}
          <div className="team-card flex flex-col">
            <TeamCard {...supportingMembers[0]} />
          </div>

          {/* Small card 2 — top-right */}
          <div className="team-card flex flex-col">
            <TeamCard {...supportingMembers[1]} />
          </div>

          {/* Small card 3 — bottom, spans 2 cols */}
          <div className="team-card md:col-span-2 flex flex-col">
            <TeamCard {...supportingMembers[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}