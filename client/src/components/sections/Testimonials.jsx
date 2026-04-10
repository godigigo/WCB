"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCard from "@/components/ui/TestimonialCard";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      '"Very comfortable place, questions answered, everyone very professional." — Jody H., Bradenton, Florida',
    name: "Jody H.",
    location: "Bradenton, Florida",
    avatar: null,
  },
  {
    quote:
      '"Staff really took time to listen and develop a plan." — Patricia D., Bradenton, Florida',
    name: "Patricia D.",
    location: "Bradenton, Florida",
    avatar: null,
  },
  {
    quote:
      '"Dr. Jothi listened carefully to my concerns and made me feel heard in a way I hadn\'t experienced before."',
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

      // Heading block
      gsap.from(".test-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // Divider line
      gsap.from(".test-divider", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Cards staggered
      gsap.from(".test-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-beige" ref={sectionRef}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-0 lg:py-20">

        {/* Heading */}
        <div className="test-heading flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
              Testimonials
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-[40px]">
              What our patients are
              <br />
              saying
            </h2>
          </div>
          <p className="max-w-[240px] text-sm leading-relaxed text-foreground/60 sm:text-right sm:text-base">
            Real voices from women in our community.
          </p>
        </div>

        {/* Divider */}
        <div className="test-divider mt-8 h-px w-full bg-foreground/10" />

        {/* Cards grid — equal height cards, no border dividers */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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