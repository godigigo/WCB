"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      // Left text block
      gsap.from(".cta-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Buttons (stagger)
      gsap.from(".cta-btn", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Image
      gsap.from(".cta-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="w-full bg-beige border-t border-foreground/10"
      ref={sectionRef}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-0 lg:py-20">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* LEFT: Text */}
          <div className="cta-left w-full md:w-1/2">
            <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-[40px] md:leading-[1.1]">
              Ready to take charge
              <br />
              of your{" "}
              <span className="italic">health?</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/75 sm:text-base">
              Schedule your appointment today and experience compassionate care.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="primary"
                href="/contact"
                className="cta-btn w-full sm:w-auto"
              >
                Book appointment
              </Button>
              <Button
                variant="outline"
                href="/contact"
                className="cta-btn w-full sm:w-auto"
              >
                Call us
              </Button>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="w-full md:w-1/2">
            <div className="cta-image relative h-[220px] w-full overflow-hidden rounded-[28px] shadow-md sm:h-[260px] md:h-[280px] lg:h-[300px]">
              <Image
                src="/cta.jpg" // place cta.jpg in /public
                alt="Woman sitting on a couch working on laptop"
                fill
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}