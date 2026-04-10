"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "30+",
    title: "Years of experience",
    body: "Dr. Jothivijayarani brings three decades of dedicated women's healthcare.",
  },
  {
    value: "2018",
    title: "Founded in Bradenton",
    body: "Built on a mission to provide complete, compassionate women's care.",
  },
  {
    value: "2x",
    title: "Board-certified expertise",
    body: "Double certification in family practice and gynecology.",
  },
  {
    value: "15+",
    title: "Years serving Bradenton",
    body: "Deep roots in our community with award‑winning care.",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      // Left column (label + heading + copy + button)
      gsap.from(".exp-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Stat cards, staggered
      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-purple-lite w-full" ref={sectionRef}>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-4 lg:py-12">
        {/* On mobile: stacked. On md+: side by side */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* LEFT: Intro */}
          <div className="exp-left w-full md:w-[35%] lg:w-[30%]">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
              Experience
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-3xl lg:text-4xl">
              Why women
              <br />
              choose us
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
              Trusted expertise and compassionate care in Bradenton.
            </p>
            <div className="mt-6">
              <Button variant="outline">Learn more</Button>
            </div>
          </div>

          {/* RIGHT: Stats grid */}
          <div className="w-full md:w-[65%] lg:w-[70%]">
            {/* 
              Mobile:   1 column  (375px–639px)
              sm:       2 columns (640px–767px)
              md+:      2 columns always
            */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className="exp-card flex flex-col rounded-[24px] bg-purple-faint px-5 py-5 sm:rounded-[28px] sm:px-6 sm:py-6 md:rounded-[32px] md:px-7 md:py-7"
                >
                  <span className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-[40px] lg:text-5xl">
                    {item.value}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-foreground sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/75 sm:text-sm">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}