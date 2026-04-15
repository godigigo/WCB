"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────

const milestones = [
  {
    year: "1990s",
    title: "30 Years of Private Practice",
    body: "Dr. Jothivijayarani begins her journey in women's healthcare, building decades of expertise in high-risk obstetrics, advanced laparoscopy, and gynecologic care.",
  },
  {
    year: "2008",
    title: "Sarasota Top Doctors Award",
    body: "Dr. Jothi receives the Sarasota Top Doctors Award — a recognition she has maintained consistently since, reflecting unmatched patient outcomes.",
  },
  {
    year: "2017",
    title: "Doctor of the Year",
    body: "Blake Medical Center presents Dr. Jothi with the highly coveted Doctor of the Year award for her extraordinary commitment to patient care.",
  },
  {
    year: "2018",
    title: "Women's Care of Bradenton Founded",
    body: "After 15+ years practicing in Bradenton, Dr. Jothi opens a new comprehensive practice to address the full spectrum of women's health — all under one roof.",
  },
  {
    year: "Today",
    title: "10,000+ Patients & Growing",
    body: "A trusted home for women of all ages in Bradenton, FL — offering gynecology, minimally invasive surgery, cosmetic procedures, and preventive care.",
  },
];

const values = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Compassionate Care",
    body: "From the moment you walk in, you are met with warmth and genuine attention. Every patient deserves to feel heard and respected.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Clinical Excellence",
    body: "Double board-certified and trained at the University of Iowa, Dr. Jothi brings award-winning expertise to every procedure and consultation.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Whole-Woman Focus",
    body: "We address every dimension of a woman's wellbeing — preventive, surgical, cosmetic, and mental health — all under one compassionate roof.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
    title: "Personalized Plans",
    body: "No two patients are alike. We develop individualized care plans built around your health goals, history, and the life you want to live.",
  },
];

const teamMembers = [
  { image: "/team/team-2.jpg", name: "Michelle Thompson", role: "Clinical Coordinator" },
  { image: "/team/team-3.jpg", name: "Dr. Sarah Mitchell", role: "OB/GYN Specialist" },
  { image: "/team/team-4.jpg", name: "Jennifer Rodriguez", role: "Nurse Practitioner" },
  { image: "/team/team-5.jpg", name: "Amanda Chen", role: "Physician Assistant" },
  { image: "/team/team-6.jpg", name: "Lisa Patterson", role: "Medical Assistant" },
];

const awards = [
  { value: "30+", label: "Years of experience" },
  { value: "2×", label: "Board certified" },
  { value: "10k+", label: "Patients cared for" },
  { value: "2017", label: "Doctor of the year" },
];

// ─── Reusable texture bg layers ────────────────────────────────────────────

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

// ─── Section: Hero ─────────────────────────────────────────────────────────

function AboutHero({ sectionRef }) {
  const headingLines = [
    ["A", "healthcare", "home"],
    ["built", "for", "women."],
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[72vh] overflow-hidden bg-[#FAF5F1]"
      style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
    >
      <GrainOverlay opacity={0.038} />
      <DotGrid color="oklch(0.55 0.06 320)" opacity={0.04} />

      {/* Blush top-right */}
      <div
        aria-hidden="true"
        className="about-hero-blob pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.9 0.045 340 / 0.38), transparent 65%)",
        }}
      />
      {/* Warm bottom-left */}
      <div
        aria-hidden="true"
        className="about-hero-blob pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.93 0.03 60 / 0.3), transparent 65%)",
        }}
      />
      {/* Decorative rings with subtle continuous motion */}
      {[
        { size: 300, top: "8%", right: "6%" },
        { size: 250, top: "calc(8% + 25px)", right: "calc(6% + 25px)" },
      ].map((r, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="about-hero-ring pointer-events-none absolute hidden lg:block"
          style={{
            top: r.top,
            right: r.right,
            width: r.size,
            height: r.size,
            borderRadius: "50%",
            border: `1px solid oklch(0.7 0.06 320 / ${i === 0 ? 0.12 : 0.07})`,
          }}
        />
      ))}

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-center gap-8 px-4 py-24 sm:px-6 md:flex-row md:items-center md:py-32 lg:px-0 lg:py-36">
        {/* Left */}
        <div className="flex-1">
          {/* Eyebrow */}
          <div className="about-hero-label mb-8 flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(to left, oklch(0.55 0.1 320 / 0.5), transparent)",
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
              About Us
            </span>
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.55 0.1 320 / 0.5), transparent)",
              }}
            />
          </div>

          {/* Word-split heading for animation */}
          <h1
            className="about-hero-heading font-display leading-[1.04] tracking-[-0.03em] text-[#18120F]"
            style={{
              fontFamily: "var(--font-display, 'Playfair Display', serif)",
              fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
            }}
          >
            {headingLines.map((line, li) => (
              <span
                key={li}
                className="about-hero-heading-line block overflow-hidden"
              >
                {line.map((word, wi) => {
                  const isLastWord = li === headingLines.length - 1 && wi === line.length - 1;
                  return (
                    <span
                      key={wi}
                      className="word mr-[0.22em] inline-block"
                      style={{
                        display: "inline-block",
                        fontStyle: isLastWord ? "italic" : "normal",
                        color: isLastWord ? "oklch(0.44 0.13 322)" : undefined,
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Accent rule */}
          <div className="about-hero-rule mt-6 flex items-center gap-3">
            <div
              className="h-[2px] w-14 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.55 0.13 322), oklch(0.78 0.07 340 / 0.3))",
              }}
            />
            <div
              className="h-[2px] w-5 rounded-full"
              style={{ background: "oklch(0.88 0.04 340 / 0.4)" }}
            />
          </div>

          <p
            className="about-hero-sub mt-7 max-w-[500px] text-[15px] leading-[1.85]"
            style={{ color: "#7A7068" }}
          >
            Founded in 2018 by Dr. Arunachalam Jothivijayarani, Women&apos;s Care of Bradenton
            exists to give every woman in our community expert, unhurried, and deeply
            compassionate care — from preventive wellness to advanced surgical procedures.
          </p>

          <div className="about-hero-cta mt-9 flex flex-wrap items-center gap-3">
            <Button variant="primary" href="/book-appointment">
              Book an appointment
            </Button>
            <Button variant="outline" href="/services">
              Our services
            </Button>
          </div>
        </div>

        {/* Right: stat cards */}
        <div className="about-hero-stats grid w-full grid-cols-2 gap-4 md:w-[340px] lg:w-[380px]">
          {awards.map((a) => (
            <div
              key={a.label}
              className="rounded-[20px] p-5"
              style={{
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid oklch(0.88 0.04 320 / 0.3)",
                boxShadow:
                  "0 2px 4px oklch(0.3 0.06 320 / 0.05), 0 10px 28px oklch(0.3 0.06 320 / 0.07)",
              }}
            >
              <p
                className="font-display text-[2rem] font-bold leading-none tracking-tight text-[#16100D]"
                style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
              >
                {a.value}
              </p>
              <p
                className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "oklch(0.5 0.1 320 / 0.7)" }}
              >
                {a.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Mission ───────────────────────────────────────────────────────

function MissionSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".mission-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.13,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
      <GrainOverlay opacity={0.025} />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        {/* Section label */}
        <div className="mission-item mb-10 flex items-center gap-3">
          <div
            className="h-px w-8"
            style={{
              background:
                "linear-gradient(to left, oklch(0.55 0.1 320 / 0.5), transparent)",
            }}
          />
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "oklch(0.42 0.12 320)" }}
          >
            Our Mission
          </span>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-start">
          {/* Left: big quote */}
          <div className="mission-item">
            <h2
              className="font-display leading-[1.1] tracking-[-0.025em] text-[#16100D]"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
                fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
              }}
            >
              &quot;To provide compassionate, comprehensive personal care to women of{" "}
              <span
                className="italic"
                style={{ color: "oklch(0.44 0.13 322)" }}
              >
                all ages.
              </span>
              &quot;
            </h2>
            <div
              className="mt-6 h-px max-w-[340px]"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.65 0.1 320 / 0.3), transparent)",
              }}
            />
            <p
              className="mt-6 text-[14.5px] leading-[1.88]"
              style={{ color: "#7A7068" }}
            >
              We practice excellent quality medicine with focused attention to every aspect of a
              woman&apos;s wellbeing — committed to making your experience with us truly
              exceptional. From the moment you enter our office, you will feel the warmth and
              genuine care we deliver.
            </p>
          </div>

          {/* Right: values grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={i}
                className="mission-item rounded-[20px] p-5"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid oklch(0.86 0.04 320 / 0.25)",
                  boxShadow:
                    "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 8px 24px oklch(0.3 0.06 320 / 0.06)",
                }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: "oklch(0.94 0.05 330 / 0.6)",
                    color: "oklch(0.42 0.12 320)",
                  }}
                >
                  {v.icon}
                </span>
                <h3 className="mt-3 text-[14px] font-semibold leading-snug tracking-[-0.01em] text-[#16100D]">
                  {v.title}
                </h3>
                <p
                  className="mt-2 text-[12.5px] leading-[1.8]"
                  style={{ color: "#8A817A" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Founder ───────────────────────────────────────────────────────

function FounderSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".founder-img", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".founder-text", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".founder-credential", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 62%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background: "oklch(0.95 0.03 320 / 0.35)",
        borderTop: "1px solid oklch(0.88 0.04 320 / 0.2)",
        borderBottom: "1px solid oklch(0.88 0.04 320 / 0.2)",
      }}
    >
      <GrainOverlay opacity={0.03} />
      <DotGrid color="oklch(0.55 0.08 320)" opacity={0.04} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.88 0.06 330 / 0.22), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* Image */}
          <div className="founder-img relative">
            {/* Glow behind */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-16px] rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(ellipse at 55% 30%, oklch(0.86 0.07 330 / 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div
              className="group relative h-[380px] overflow-hidden sm:h-[460px] md:h-[520px]"
              style={{
                borderRadius: "2rem 2rem 5rem 2rem",
                boxShadow:
                  "0 2px 4px oklch(0.2 0.03 60 / 0.06), 0 20px 52px oklch(0.2 0.03 60 / 0.14)",
              }}
            >
              <Image
                src="/team/team-1.jpg"
                alt="Dr. Jothivijayarani, Founder of Women's Care of Bradenton"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.2 0.04 320 / 0.45), transparent)",
                }}
              />
              {/* Floating founder badge */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid oklch(0.92 0.02 60 / 0.8)",
                  boxShadow: "0 4px 16px oklch(0.2 0.02 60 / 0.1)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "oklch(0.55 0.16 150)" }}
                />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "oklch(0.25 0.04 320)" }}
                >
                  Founder &amp; Lead Physician
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="founder-text flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to left, oklch(0.55 0.1 320 / 0.5), transparent)",
                }}
              />
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "oklch(0.42 0.12 320)" }}
              >
                Meet the Founder
              </span>
            </div>
            <h2
              className="font-display leading-[1.06] tracking-[-0.025em] text-[#16100D]"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
              }}
            >
              Dr. Arunachalam
              <br />
              <span
                className="italic"
                style={{ color: "oklch(0.44 0.13 322)" }}
              >
                Jothivijayarani
              </span>
            </h2>

            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.65 0.1 320 / 0.28), transparent)",
              }}
            />

            <p
              className="text-[14.5px] leading-[1.88]"
              style={{ color: "#7A7068" }}
            >
              Dr. Jothi attended the University of Iowa Medical School, where she earned double
              board certifications in Family Practice and Obstetrics and Gynecology. Her residency
              concentrated on high-risk obstetrics, infertility, and gynecologic procedures — during
              which she won the prestigious <em>&quot;Above and Beyond&quot;</em> award for
              outstanding patient care.
            </p>
            <p
              className="text-[14.5px] leading-[1.88]"
              style={{ color: "#7A7068" }}
            >
              She is one of the most highly rated Robotic Surgeons in the Bradenton/Sarasota area,
              specializing in advanced laparoscopic surgeries, hysterectomies, and treatment of
              fibroids, pelvic pain, endometriosis, and ovarian masses. She also speaks Hindi and
              holds certifications from the International Society of Cosmetogynecology.
            </p>

            {/* Credentials grid */}
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: "University of Iowa Medical School" },
                { label: "Double Board Certified — Family Practice & OB/GYN" },
                { label: "Top Doctors Award — Sarasota (since 2008)" },
                { label: "Doctor of the Year — Blake Medical Center, 2017" },
                { label: "Member, American College of OB/GYN" },
                { label: "Hospital privileges at 5 Bradenton/Sarasota facilities" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="founder-credential flex items-start gap-2.5 rounded-[14px] px-3.5 py-3"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid oklch(0.88 0.04 320 / 0.22)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ color: "oklch(0.45 0.13 150)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span
                    className="text-[12px] leading-[1.6]"
                    style={{ color: "oklch(0.3 0.04 320 / 0.85)" }}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Timeline ─────────────────────────────────────────────────────

function TimelineSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".timeline-label", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
        },
        y: 14,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.from(".timeline-heading", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.08,
      });
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.13,
        delay: 0.12,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
      <GrainOverlay opacity={0.028} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.93 0.03 60 / 0.25), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="timeline-label mb-5 flex items-center justify-center gap-3">
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(to left, oklch(0.55 0.06 60 / 0.5), transparent)",
              }}
            />
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
              style={{
                color: "oklch(0.42 0.08 60)",
                background: "oklch(0.94 0.04 60 / 0.55)",
                border: "1px solid oklch(0.82 0.05 60 / 0.35)",
              }}
            >
              Our History
            </span>
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.55 0.06 60 / 0.5), transparent)",
              }}
            />
          </div>
          <h2
            className="timeline-heading font-display leading-[1.06] tracking-[-0.025em] text-[#16100D]"
            style={{
              fontFamily: "var(--font-display, 'Playfair Display', serif)",
              fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)",
            }}
          >
            Three decades of{" "}
            <span
              className="italic"
              style={{ color: "oklch(0.44 0.1 55)" }}
            >
              dedicated care.
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical spine */}
          <div
            className="absolute left-[18px] top-0 hidden h-full w-px md:left-1/2 md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.75 0.08 320 / 0.3) 10%, oklch(0.75 0.08 320 / 0.3) 90%, transparent)",
            }}
          />

          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => {
              const isRight = i % 2 !== 0;
              return (
                <div
                  key={i}
                  className={`timeline-item relative flex items-start gap-6 md:gap-0 ${
                    isRight ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`w-full rounded-[22px] p-5 md:w-[calc(50%-2.5rem)] ${
                      isRight ? "md:ml-[calc(50%+2.5rem)]" : ""
                    }`}
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid oklch(0.88 0.04 320 / 0.22)",
                      boxShadow:
                        "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 10px 28px oklch(0.3 0.06 320 / 0.06)",
                    }}
                  >
                    <span
                      className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{
                        background: "oklch(0.93 0.05 330 / 0.6)",
                        color: "oklch(0.42 0.12 320)",
                        border: "1px solid oklch(0.84 0.06 330 / 0.3)",
                      }}
                    >
                      {m.year}
                    </span>
                    <h3
                      className="mt-3 font-display text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[#16100D]"
                      style={{
                        fontFamily: "var(--font-display, 'Playfair Display', serif)",
                      }}
                    >
                      {m.title}
                    </h3>
                    <div
                      className="my-2.5 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, oklch(0.7 0.08 320 / 0.25), transparent)",
                      }}
                    />
                    <p
                      className="text-[13px] leading-[1.85]"
                      style={{ color: "#8A817A" }}
                    >
                      {m.body}
                    </p>
                  </div>

                  {/* Spine dot */}
                  <div
                    className="absolute left-[18px] top-4 hidden h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 md:block"
                    style={{
                      background: "oklch(0.6 0.1 320)",
                      boxShadow: "0 0 0 4px oklch(0.88 0.05 320 / 0.25)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Team ──────────────────────────────────────────────────────────

function TeamSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll(".about-team-member");

      gsap.set(cards, { autoAlpha: 0, y: 18, scale: 0.985 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".about-team-label", {
        y: 14,
        opacity: 0,
        duration: 0.5,
      })
        .from(
          ".about-team-heading",
          {
            y: 24,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.2",
        )
        .from(
          ".about-team-divider",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
          },
          "-=0.45",
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            clearProps: "transform",
          },
          "-=0.25",
        )
        .from(
          ".about-team-cta",
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.35",
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-primary">
      <GrainOverlay opacity={0.035} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(1 0 0 / 0.07), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 55% 55%, oklch(0.2 0.08 320 / 0.22), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-white sm:px-6 md:py-24 lg:px-0 lg:py-28">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="about-team-label mb-5 flex items-center gap-3">
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
                The Team
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
              className="about-team-heading font-display leading-[1.06] tracking-[-0.025em] text-white"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Chosen with your{" "}
              <span className="italic" style={{ color: "oklch(0.88 0.06 320)" }}>
                care in mind.
              </span>
            </h2>
          </div>
          <p
            className="max-w-[240px] text-[14px] leading-[1.8] sm:text-right"
            style={{ color: "oklch(1 0 0 / 0.58)" }}
          >
            Every team member was carefully selected for their clinical excellence and warmth.
          </p>
        </div>

        <div
          className="about-team-divider mt-10 h-px origin-left"
          style={{
            background:
              "linear-gradient(to right, oklch(1 0 0 / 0.22), oklch(1 0 0 / 0.08), transparent)",
          }}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="about-team-member group relative overflow-hidden rounded-[20px]"
              style={{
                background: "oklch(0.98 0.01 320 / 0.18)",
                border: "1px solid oklch(1 0 0 / 0.14)",
                boxShadow:
                  "0 10px 30px oklch(0 0 0 / 0.16), 0 1px 0 oklch(1 0 0 / 0.06) inset",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                minHeight: "100%",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(1 0 0 / 0.08), transparent 28%, transparent 100%)",
                }}
              />

              <div className="relative h-[140px] w-full overflow-hidden sm:h-[160px]">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="220px"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-14"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.15 0.03 320 / 0.65), transparent)",
                  }}
                />
              </div>

              <div className="relative p-3.5">
                <p className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-white">
                  {m.name}
                </p>
                <p
                  className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "oklch(1 0 0 / 0.7)" }}
                >
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-team-cta mt-10 flex justify-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-[13px] font-semibold transition-all duration-300"
            style={{
              background: "oklch(1 0 0 / 0.1)",
              border: "1px solid oklch(1 0 0 / 0.18)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(1 0 0 / 0.16)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(1 0 0 / 0.1)";
            }}
          >
            Meet the full team
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Affiliations ─────────────────────────────────────────────────

function AffiliationsSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".affil-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const hospitals = [
    "Blake Medical Center",
    "Manatee Memorial Hospital",
    "Lakewood Ranch Medical Center",
    "Doctors Hospital of Sarasota",
    "Sarasota Memorial Hospital",
  ];

  const certifications = [
    "American College of Obstetrics & Gynecology",
    "International Society of Cosmetogynecology",
    "Center for Mind-Body Medicine",
    "TopLine MD Alliance",
  ];

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
      <GrainOverlay opacity={0.025} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.9 0.04 330 / 0.2), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        {/* Label */}
        <div className="affil-item mb-10 flex items-center gap-3">
          <div
            className="h-px w-8"
            style={{
              background:
                "linear-gradient(to left, oklch(0.55 0.1 320 / 0.5), transparent)",
            }}
          />
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "oklch(0.42 0.12 320)" }}
          >
            Affiliations &amp; Certifications
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Hospital privileges */}
          <div>
            <h3
              className="affil-item font-display text-[1.3rem] leading-snug tracking-[-0.015em] text-[#16100D]"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
              }}
            >
              Hospital Privileges
            </h3>
            <div
              className="mt-5 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.7 0.08 320 / 0.25), transparent)",
              }}
            />
            <ul className="mt-5 flex flex-col gap-3">
              {hospitals.map((h, i) => (
                <li key={i} className="affil-item flex items-center gap-3">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "oklch(0.6 0.1 320 / 0.6)" }}
                  />
                  <span
                    className="text-[14px] leading-snug"
                    style={{ color: "#7A7068" }}
                  >
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3
              className="affil-item font-display text-[1.3rem] leading-snug tracking-[-0.015em] text-[#16100D]"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
              }}
            >
              Professional Memberships
            </h3>
            <div
              className="mt-5 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.7 0.08 320 / 0.25), transparent)",
              }}
            />
            <ul className="mt-5 flex flex-col gap-3">
              {certifications.map((c, i) => (
                <li key={i} className="affil-item flex items-center gap-3">
                  <svg
                    className="h-3.5 w-3.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ color: "oklch(0.45 0.13 150)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span
                    className="text-[14px] leading-snug"
                    style={{ color: "#7A7068" }}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA ──────────────────────────────────────────────────────────

function CTASection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background: "oklch(0.94 0.04 330 / 0.45)",
        borderTop: "1px solid oklch(0.86 0.05 330 / 0.25)",
      }}
    >
      <GrainOverlay opacity={0.028} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.9 0.05 330 / 0.3), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.93 0.03 60 / 0.25), transparent 65%)",
        }}
      />

      <div className="cta-content relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 md:py-24 lg:px-0 lg:py-28">
        <div className="flex items-center gap-3">
          <div
            className="h-px w-10"
            style={{
              background:
                "linear-gradient(to left, oklch(0.55 0.1 320 / 0.45), transparent)",
            }}
          />
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "oklch(0.42 0.12 320)" }}
          >
            Ready to get started?
          </span>
          <div
            className="h-px w-10"
            style={{
              background:
                "linear-gradient(to right, oklch(0.55 0.1 320 / 0.45), transparent)",
            }}
          />
        </div>

        <h2
          className="max-w-2xl font-display leading-[1.06] tracking-[-0.025em] text-[#16100D]"
          style={{
            fontFamily: "var(--font-display, 'Playfair Display', serif)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
          }}
        >
          Ready to take charge of your{" "}
          <span
            className="italic"
            style={{ color: "oklch(0.44 0.13 322)" }}
          >
            health?
          </span>
        </h2>

        <p
          className="max-w-[480px] text-[15px] leading-[1.85]"
          style={{ color: "#7A7068" }}
        >
          Schedule an appointment today and experience expert, compassionate women&apos;s
          healthcare in Bradenton, FL.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href="/book-appointment">
            Book an appointment
          </Button>
          <Button variant="outline" href="tel:9415003100">
            Call us · (941) 500-3100
          </Button>
        </div>

        <p
          className="mt-2 text-[12px]"
          style={{ color: "oklch(0.5 0.08 320 / 0.6)" }}
        >
          4216 Cortez Rd W, Bradenton, FL 34210 · Mon–Thu 8am–5pm · Fri 8am–1pm
        </p>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.85, ease: "power4.out" },
      });

      tl.from(".about-hero-label", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          ".about-hero-heading .word",
          {
            y: "110%",
            opacity: 0,
            stagger: 0.07,
            duration: 0.75,
          },
          "-=0.25",
        )
        .from(
          ".about-hero-rule",
          {
            scaleX: 0,
            transformOrigin: "left",
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".about-hero-sub",
          {
            y: 18,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.3",
        )
        .from(
          ".about-hero-cta",
          {
            y: 16,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          ".about-hero-stats > *",
          {
            y: 20,
            opacity: 0,
            scale: 0.96,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.5",
        );

      // Subtle continuous motion for rings and blobs
      gsap.to(".about-hero-ring", {
        rotation: 10,
        duration: 20,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".about-hero-blob", {
        y: 18,
        duration: 26,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      style={{
        fontFamily: "var(--font-body, 'DM Sans', system-ui, sans-serif)",
      }}
    >
      <AboutHero sectionRef={heroRef} />
      <MissionSection />
      <FounderSection />
      <TimelineSection />
      <TeamSection />
      <AffiliationsSection />
      <CTASection />
    </main>
  );
}