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
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      tl.from(".hero-badge", { y: 16, opacity: 0, duration: 0.5 })
        .from(".hero-heading", { y: 40, opacity: 0 }, "-=0.25")
        .from(".hero-subtext", { y: 20, opacity: 0 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.4")
        .from(".hero-trust-item", { y: 16, opacity: 0, stagger: 0.12 }, "-=0.3")
        .from(".hero-image", { x: 60, opacity: 0 }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-beige" ref={heroRef}>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 sm:px-8 md:grid-cols-2 md:gap-14 md:py-16 lg:px-0 lg:py-20">
        {/* LEFT: Text Content */}
        <div className="order-2 flex flex-col justify-center md:order-1">
          {/* Label */}
          <div className="hero-badge mb-5 flex items-center gap-2">
            <span className="h-[2px] w-8 rounded-full bg-primary" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary">
              Women&apos;s Healthcare · Bradenton, FL
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading font-display text-[38px] leading-[1.1] text-foreground sm:text-[46px] md:text-[56px] lg:text-[60px]">
            A Lifetime of
            <br />
            Compassionate
            <br />
            Care for{" "}
            <span className="italic">
              Women..
            </span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext mt-6 max-w-[480px] font-sans text-sm leading-relaxed text-foreground/70 sm:text-base">
            From routine gynecology to advanced minimally invasive procedures,
            we provide complete women&apos;s healthcare with the expertise and
            compassion you deserve.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="hero-cta" variant="primary" href="/book-appointment">
              Book an appointment
            </Button>
            <Button className="hero-cta" variant="outline" href="/services">
              See How We Help
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="hero-trust-item flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-faint">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-sans text-sm text-foreground/70">
                Board Certified
              </span>
            </div>

            <div className="hero-trust-item flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-faint">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-sans text-sm text-foreground/70">
                30+ Years of Experience
              </span>
            </div>

            <div className="hero-trust-item flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-faint">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="font-sans text-sm text-foreground/70">
                Compassionate Care
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="order-1 md:order-2">
          <div className="hero-image relative h-[260px] w-full overflow-hidden rounded-[32px] sm:h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/hero.png"
              alt="Doctor consulting with a female patient"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}