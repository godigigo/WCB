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

      // Top heading block
      gsap.from(".about-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Card container
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // Inside card: image and text stagger
      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-purple-faint" ref={sectionRef}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-0 lg:py-20">
        {/* Top heading */}
        <div className="about-heading mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-[40px] md:leading-[1.1]">
            A healthcare home for{" "}
            <span className="italic">women..</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            Founded in 2018 with a singular purpose.
          </p>
        </div>

        {/* Main card */}
        <div className="about-card mt-10 rounded-[32px] bg-purple-lite p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
            {/* Left: image */}
            <div className="about-image w-full md:w-1/2">
              <div className="relative h-[220px] w-full overflow-hidden rounded-[28px] sm:h-[260px] md:h-[280px] lg:h-[320px]">
                <Image
                  src="/about.png" // place about.png in /public
                  alt="Doctor caring for a patient in hospital bed"
                  fill
                  sizes="(min-width: 1024px) 48vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right: text */}
            <div className="about-text flex w-full flex-col justify-center md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                Foundation
              </p>

              <h3 className="mt-3 font-display text-2xl leading-snug text-foreground sm:text-[26px] md:text-[28px] lg:text-[30px]">
                Double board-certified
                <br />
                in family practice and{" "}
                <span className="italic">gynecology</span>
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                Dr. Jothivijayarani holds dual certifications, bringing
                comprehensive expertise to every patient encounter.
              </p>

              <div className="mt-6">
                <Button variant="outline">
                  Meet our team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}