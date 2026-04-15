"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// ─── Shared texture layers ──────────────────────────────────────────────────

function GrainOverlay({ opacity = 0.03 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

function DotGrid({ color = "oklch(0.45 0.05 320)", opacity = 0.045 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        color,
      }}
    />
  );
}

// ─── Contact Hero ────────────────────────────────────────────────────────────

function ContactHero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.85, ease: "power4.out" },
      });

      tl.from(".contact-hero-label", { opacity: 0, y: 18 })
        .from(
          ".contact-hero-heading .word",
          { opacity: 0, y: "110%", stagger: 0.06, duration: 0.9 },
          "-=0.5",
        )
        .from(".contact-hero-rule", { scaleX: 0, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".contact-hero-sub", { opacity: 0, y: 20 }, "-=0.45")
        .from(".contact-hero-cta", { opacity: 0, y: 18, stagger: 0.12 }, "-=0.35")
        .from(".contact-hero-card", { opacity: 0, y: 30, scale: 0.96 }, "-=0.4");

      // subtle floating for the card
      gsap.to(".contact-hero-card-inner", {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const headingLines = [
    "Your care starts",
    "with a conversation.",
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[72vh] overflow-hidden bg-[#FAF5F1]"
      style={{ fontFamily: "var(--font-body, 'DM Sans', system-ui, sans-serif)" }}
    >
      <GrainOverlay opacity={0.04} />
      <DotGrid color="oklch(0.55 0.06 320)" opacity={0.04} />

      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[720px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.9 0.045 340 / 0.4), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-32 h-[520px] w-[520px] rounded-[60%]"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.9 0.08 190 / 0.32), transparent 65%)",
        }}
      />
      {/* Diagonal color band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/2 top-1/2 h-[420px] w-[900px] -rotate-[10deg]"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.95 0.02 80 / 0.9), oklch(0.9 0.09 200 / 0.3), oklch(0.92 0.06 330 / 0.3))",
          opacity: 0.4,
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-center gap-10 px-4 py-24 sm:px-6 md:flex-row md:items-center md:py-32 lg:px-0 lg:py-36">
        {/* LEFT: Copy */}
        <div className="relative z-[1] flex-1">
          <div className="contact-hero-label mb-7 flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(to left, oklch(0.55 0.14 200 / 0.6), transparent)",
              }}
            />
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
              style={{
                color: "oklch(0.42 0.12 320)",
                background: "oklch(0.96 0.04 330 / 0.8)",
                border: "1px solid oklch(0.88 0.06 330 / 0.55)",
              }}
            >
              Contact
            </span>
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.55 0.14 200 / 0.6), transparent)",
              }}
            />
          </div>

          <h1
            className="contact-hero-heading font-display leading-[1.04] tracking-[-0.03em] text-[#18120F] overflow-hidden"
            style={{
              fontFamily:
                "var(--font-display, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(2.6rem, 5.2vw, 4.1rem)",
            }}
          >
            {headingLines.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className="word mr-[0.22em] inline-block"
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="contact-hero-rule mt-6 flex items-center gap-3">
            <div
              className="h-[2px] w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.55 0.13 322), oklch(0.7 0.12 200 / 0.7))",
              }}
            />
            <div
              className="h-[2px] w-6 rounded-full"
              style={{
                background: "oklch(0.88 0.09 200 / 0.6)",
              }}
            />
          </div>

          <p
            className="contact-hero-sub mt-7 max-w-[520px] text-[15px] leading-[1.9]"
            style={{ color: "#7A7068" }}
          >
            Call us, send a message, or request an appointment online.
            Our team will help you choose the right visit and guide you
            every step of the way.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="contact-hero-cta"
              variant="primary"
              href="/book-appointment"
            >
              Book an appointment
            </Button>
            <Button
              className="contact-hero-cta"
              variant="outline"
              href="tel:9415003100"
            >
              Call us · (941) 500-3100
            </Button>
          </div>

          <div className="mt-6 grid gap-3 text-[13px] text-[#7A7068] sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "oklch(0.6 0.15 150)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5.25C3 4.56 3.56 4 4.25 4h2.1c.53 0 1 .37 1.12.89l.74 3.29a1.1 1.1 0 01-.55 1.22l-1.27.64a.75.75 0 00-.38.92 11.04 11.04 0 006.02 6.02.75.75 0 00.92-.38l.64-1.27a1.1 1.1 0 011.22-.55l3.29.74c.52.12.89.59.89 1.12v2.1c0 .69-.56 1.25-1.25 1.25H18C10.82 21 5 15.18 5 8V6.25C5 5.56 4.44 5 3.75 5H3z"
                />
              </svg>
              <span>Mon–Thu 8:00am–5:00pm · Fri 8:00am–1:00pm</span>
            </div>
            <div className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "oklch(0.65 0.12 200)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
                />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
              <span>
                4216 Cortez Rd W, Bradenton, FL 34210 · Free parking on site
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact card */}
        <div className="contact-hero-card relative z-[1] w-full max-w-[380px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-18px] rounded-[26px]"
            style={{
              background:
                "conic-gradient(from 210deg, oklch(0.9 0.08 200 / 0.4), transparent 30%, transparent 70%, oklch(0.9 0.08 330 / 0.45))",
              opacity: 0.7,
              filter: "blur(18px)",
            }}
          />
          <div
            className="contact-hero-card-inner relative overflow-hidden rounded-[24px] p-6 sm:p-7"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.98 0.02 90), oklch(0.95 0.03 200 / 0.4))",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid oklch(0.9 0.05 200 / 0.75)",
              boxShadow:
                "0 2px 6px oklch(0.3 0.06 200 / 0.08), 0 20px 52px oklch(0.3 0.06 200 / 0.16)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-[180px] w-[180px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.93 0.08 200 / 0.4), transparent 70%)",
              }}
            />
            <div className="relative z-[1]">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "oklch(0.45 0.09 200)" }}
              >
                Same-day questions
              </p>
              <p className="mt-2 text-[22px] font-semibold text-[#18120F]">
                Call our care team
              </p>
              <p
                className="mt-1 text-[13px] leading-[1.7]"
                style={{ color: "#6F665E" }}
              >
                For urgent concerns or quick questions, call us directly and
                speak with a member of our clinical team.
              </p>

              <Link
                href="tel:9415003100"
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.15 200), oklch(0.78 0.14 180))",
                  color: "white",
                  boxShadow:
                    "0 6px 16px oklch(0.4 0.1 200 / 0.4)",
                }}
              >
                (941) 500-3100
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5h4m10 0h-4m-6 0V3m0 2v4m0 0l4-4m-4 4L7 7"
                  />
                </svg>
              </Link>

              <div className="mt-6 h-px bg-gradient-to-r from-[oklch(0.8_0.08_200/0.5)] via-[oklch(0.9_0.06_330/0.6)] to-transparent" />

              <p
                className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "oklch(0.46 0.09 200)" }}
              >
                Non-urgent visits
              </p>
              <p
                className="mt-2 text-[13px] leading-[1.7]"
                style={{ color: "#6F665E" }}
              >
                Use the form below any time to request an appointment or ask
                about our services. We&apos;ll respond within one business day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Details + Form ─────────────────────────────────────────────────────────

function ContactDetailsSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-detail", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from(".contact-form-field", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 26,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.08,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FAF5F1]"
    >
      <GrainOverlay opacity={0.03} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.93 0.03 60 / 0.22), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)] md:items-start md:gap-16">
          {/* LEFT: Details */}
          <div className="space-y-8">
            <div className="contact-detail space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-px w-8"
                  style={{
                    background:
                      "linear-gradient(to left, oklch(0.55 0.1 200 / 0.55), transparent)",
                  }}
                />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "oklch(0.42 0.12 320)" }}
                >
                  Visit us
                </span>
              </div>
              <h2
                className="font-display leading-[1.12] tracking-[-0.02em] text-[#16100D]"
                style={{
                  fontFamily:
                    "var(--font-display, 'Playfair Display', serif)",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                }}
              >
                A warm, welcoming{" "}
                <span
                  className="italic"
                  style={{ color: "oklch(0.52 0.12 65)" }}
                >
                  clinic in Bradenton.
                </span>
              </h2>
              <p
                className="text-[14.5px] leading-[1.9]"
                style={{ color: "#7A7068" }}
              >
                We&apos;re located on Cortez Road West with easy access from
                Bradenton, Sarasota, and the surrounding communities. There is
                ample on-site parking and a calm reception area designed for
                privacy and comfort.
              </p>
            </div>

            <div className="grid gap-5 contact-detail sm:grid-cols-2">
              <div
                className="rounded-[18px] p-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.98 0.02 90), oklch(0.94 0.04 200 / 0.65))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid oklch(0.9 0.05 200 / 0.6)",
                  boxShadow:
                    "0 2px 4px oklch(0.3 0.06 200 / 0.04), 0 10px 26px oklch(0.3 0.06 200 / 0.06)",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C4F46]">
                  Address
                </p>
                <p className="mt-2 text-[14px] font-medium text-[#18120F]">
                  4216 Cortez Rd W
                  <br />
                  Bradenton, FL 34210
                </p>
                <Link
                  href="https://maps.google.com/?q=4216+Cortez+Rd+W+Bradenton+FL+34210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold"
                  style={{ color: "oklch(0.52 0.12 65)" }}
                >
                  Open in Maps
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7m0 0H9m8 0v8"
                    />
                  </svg>
                </Link>
              </div>

              <div
                className="rounded-[18px] p-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.98 0.02 90), oklch(0.95 0.05 330 / 0.6))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid oklch(0.9 0.05 320 / 0.55)",
                  boxShadow:
                    "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 10px 26px oklch(0.3 0.06 320 / 0.06)",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C4F46]">
                  Contact
                </p>
                <p className="mt-2 text-[14px] text-[#18120F]">
                  Phone: (941) 500-3100
                  <br />
                  Fax: (optional)
                  <br />
                  Email: info@womenscarebradenton.com
                </p>
                <p
                  className="mt-3 text-[12px]"
                  style={{ color: "#8A817A" }}
                >
                  For emergencies, please call 911 or visit the nearest
                  emergency room.
                </p>
              </div>
            </div>

            <div
              className="contact-detail rounded-[18px] p-4 sm:p-5"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid oklch(0.88 0.04 320 / 0.25)",
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C4F46]">
                Office hours
              </p>
              <div className="mt-3 grid gap-2 text-[13px] text-[#7A7068] sm:grid-cols-2">
                <p>
                  <span className="font-semibold text-[#18120F]">
                    Monday – Thursday
                  </span>
                  <br />
                  8:00am – 5:00pm
                </p>
                <p>
                  <span className="font-semibold text-[#18120F]">
                    Friday
                  </span>
                  <br />
                  8:00am – 1:00pm
                </p>
              </div>
              <div className="mt-3 h-px bg-gradient-to-r from-[oklch(0.8_0.14_65/0.6)] via-[oklch(0.8_0.08_200/0.5)] to-transparent" />
            </div>
          </div>

          {/* RIGHT: Form */}
          <div
            className="rounded-[26px] p-6 sm:p-7 contact-form"
            style={{
              background:
                "radial-gradient(circle at 0% 0%, oklch(0.97 0.04 330 / 0.85), oklch(0.97 0.03 80))",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid oklch(0.93 0.04 320 / 0.8)",
              boxShadow:
                "0 2px 6px oklch(0.3 0.03 60 / 0.06), 0 18px 52px oklch(0.3 0.03 60 / 0.12)",
            }}
          >
            <div className="mb-5">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "oklch(0.48 0.1 200)" }}
              >
                Request an appointment
              </p>
              <p
                className="mt-1 text-[14px]"
                style={{ color: "#7A7068" }}
              >
                Share a few details and our team will call you to confirm your
                visit.
              </p>
            </div>

            <form className="space-y-4">
              {/* Name */}
              <div className="contact-form-field">
                <label className="block text-[12px] font-medium text-[#4A413B]">
                  Full name
                </label>
                <div
                  className="mt-1.5 flex items-center rounded-2xl px-3.5 py-2.5"
                  style={{
                    background: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.9 0.02 80)",
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    className="w-full bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="contact-form-field">
                  <label className="block text-[12px] font-medium text-[#4A413B]">
                    Email
                  </label>
                  <div
                    className="mt-1.5 flex items-center rounded-2xl px-3.5 py-2.5"
                    style={{
                      background: "oklch(0.98 0.01 80)",
                      border: "1px solid oklch(0.9 0.02 80)",
                    }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]"
                    />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label className="block text-[12px] font-medium text-[#4A413B]">
                    Phone
                  </label>
                  <div
                    className="mt-1.5 flex items-center rounded-2xl px-3.5 py-2.5"
                    style={{
                      background: "oklch(0.98 0.01 80)",
                      border: "1px solid oklch(0.9 0.02 80)",
                    }}
                  >
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(941) 555-1234"
                      className="w-full bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred date / time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="contact-form-field">
                  <label className="block text-[12px] font-medium text-[#4A413B]">
                    Preferred date
                  </label>
                  <div
                    className="mt-1.5 flex items-center rounded-2xl px-3.5 py-2.5"
                    style={{
                      background: "oklch(0.98 0.01 80)",
                      border: "1px solid oklch(0.9 0.02 80)",
                    }}
                  >
                    <input
                      type="date"
                      name="date"
                      className="w-full bg-transparent text-[13px] text-[#18120F] outline-none"
                    />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label className="block text-[12px] font-medium text-[#4A413B]">
                    Preferred time
                  </label>
                  <div
                    className="mt-1.5 flex items-center rounded-2xl px-3.5 py-2.5"
                    style={{
                      background: "oklch(0.98 0.01 80)",
                      border: "1px solid oklch(0.9 0.02 80)",
                    }}
                  >
                    <input
                      type="time"
                      name="time"
                      className="w-full bg-transparent text-[13px] text-[#18120F] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="contact-form-field">
                <label className="block text-[12px] font-medium text-[#4A413B]">
                  Reason for visit
                </label>
                <div
                  className="mt-1.5 flex items-center rounded-2xl px-3.5 py-2.5"
                  style={{
                    background: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.9 0.02 80)",
                  }}
                >
                  <select
                    name="reason"
                    className="w-full bg-transparent text-[13px] text-[#18120F] outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one…
                    </option>
                    <option>Annual well-woman exam</option>
                    <option>Pregnancy / prenatal care</option>
                    <option>Gynecologic concern</option>
                    <option>Minimally invasive surgery consult</option>
                    <option>Cosmetic gynecology consult</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="contact-form-field">
                <label className="block text-[12px] font-medium text-[#4A413B]">
                  Message (optional)
                </label>
                <div
                  className="mt-1.5 rounded-2xl px-3.5 py-2.5"
                  style={{
                    background: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.9 0.02 80)",
                  }}
                >
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Share anything you’d like us to know before your visit."
                    className="w-full resize-none bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  variant="primary"
                  className="contact-form-field w-full sm:w-auto"
                >
                  Submit request
                </Button>
                <p
                  className="text-[11px]"
                  style={{ color: "oklch(0.5 0.06 320 / 0.8)" }}
                >
                  We&apos;ll never share your information. This form is for
                  non-emergency requests only.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Map Section ─────────────────────────────────────────────────────────────

function MapSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-map-copy", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".contact-map-frame", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.08,
      });
      // gentle bob for the map card
      gsap.to(".contact-map-frame-inner", {
        y: -10,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FAF5F1]"
    >
      <GrainOverlay opacity={0.02} />
      <DotGrid color="oklch(0.55 0.06 320)" opacity={0.03} />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-14">
          {/* Copy */}
          <div className="contact-map-copy flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to left, oklch(0.55 0.1 200 / 0.55), transparent)",
                }}
              />
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "oklch(0.42 0.12 320)" }}
              >
                Map & directions
              </span>
            </div>
            <h2
              className="font-display leading-[1.12] tracking-[-0.02em] text-[#16100D]"
              style={{
                fontFamily:
                  "var(--font-display, 'Playfair Display', serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              }}
            >
              Easy to reach from{" "}
              <span
                className="italic"
                style={{ color: "oklch(0.52 0.12 65)" }}
              >
                wherever you are.
              </span>
            </h2>
            <p
              className="text-[14.5px] leading-[1.9]"
              style={{ color: "#7A7068" }}
            >
              Women&apos;s Care of Bradenton is centrally located on Cortez
              Road West, minutes from US-41 and just a short drive from
              downtown Bradenton, Sarasota, and the Gulf beaches.
            </p>
            <ul className="space-y-2 text-[13.5px]" style={{ color: "#7A7068" }}>
              <li>• Free on-site parking</li>
              <li>• Ground floor access</li>
              <li>• Wheelchair accessible entrance</li>
              <li>• Pharmacy and labs nearby</li>
            </ul>
          </div>

          {/* Map */}
          <div className="contact-map-frame relative">
            <div
              className="absolute -inset-4 rounded-[30px]"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 20% 0%, oklch(0.9 0.06 330 / 0.3), transparent 65%)",
                filter: "blur(22px)",
              }}
            />
            <div
              className="contact-map-frame-inner relative overflow-hidden rounded-[28px]"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.2 0.05 220 / 0.8), oklch(0.25 0.08 260))",
                boxShadow:
                  "0 6px 18px oklch(0.3 0.04 60 / 0.18), 0 24px 60px oklch(0.3 0.04 60 / 0.22)",
              }}
            >
              <div className="aspect-[4/3] w-full">
                <iframe
                  title="Women's Care of Bradenton location"
                  src="https://www.google.com/maps?q=4216+Cortez+Rd+W+Bradenton,+FL+34210&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.2 0.05 220 / 0.7), transparent)",
                }}
              />
              <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-[10px]">
                Cortez Rd W
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main
      style={{
        fontFamily: "var(--font-body, 'DM Sans', system-ui, sans-serif)",
      }}
    >
      <ContactHero />
      <ContactDetailsSection />
      <MapSection />
    </main>
  );
}