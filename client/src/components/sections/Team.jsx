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

      // Heading fade / slide in
      gsap.from(".team-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // Cards staggered in a grid
      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-primary" ref={sectionRef}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:px-0 lg:py-20">
        {/* Heading */}
        <header className="team-heading max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Team
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl md:text-[40px]">
            Meet our <span className="italic">Experts..</span>
          </h2>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            Experienced physicians dedicated to your care.
          </p>
        </header>

        {/* Bento grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start lg:gap-8">
          {/* LEFT column */}
          <div className="flex flex-col gap-6">
            {teamLeftColumn.map((member) => (
              <div key={member.name} className="team-card">
                <TeamCard {...member} />
              </div>
            ))}
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-6">
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