"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const PINK   = "oklch(0.48 0.13 322)";
const PINK_L = "oklch(0.88 0.06 330)";
const WARM   = "oklch(0.44 0.1 55)";
const MUTED  = "#7A7068";
const DARK   = "#16100D";
const GRAIN  = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function Grain({ op = 0.035 }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: op, backgroundImage: GRAIN, backgroundSize: "200px 200px" }} />
  );
}

function Dots({ op = 0.04 }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: op, backgroundImage: "radial-gradient(circle,oklch(0.45 0.05 320) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
  );
}

function Eyebrow({ children, light = false }) {
  const c = light ? "oklch(0.88 0.04 320)" : "oklch(0.42 0.12 320)";
  const l = light ? "oklch(1 0 0 / 0.3)" : "oklch(0.55 0.1 320 / 0.4)";
  return (
    <div className="inline-flex items-center gap-3">
      <span className="block h-px w-7 rounded-full" style={{ background: l }} />
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: c }}>
        {children}
      </span>
      <span className="block h-px w-7 rounded-full" style={{ background: l }} />
    </div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const words  = gsap.utils.toArray(".gh-word", el);
    const others = [el.querySelector(".gh-eyebrow"), el.querySelector(".gh-rule"), el.querySelector(".gh-sub")].filter(Boolean);
    const ctas   = gsap.utils.toArray(".gh-cta", el);
    const badges = gsap.utils.toArray(".gh-badge", el);
    const image  = el.querySelector(".gh-image");
    gsap.set([...others, ...ctas, ...badges], { opacity: 0, y: 22 });
    gsap.set(words, { opacity: 0, yPercent: 105 });
    gsap.set(image, { opacity: 0, scale: 0.96 });
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
    tl.to(others[0], { opacity: 1, y: 0, duration: 0.7 })
      .to(words,     { opacity: 1, yPercent: 0, stagger: 0.05, duration: 0.8 }, "-=0.45")
      .to(others[1], { opacity: 1, y: 0, duration: 0.55 }, "-=0.5")
      .to(others[2], { opacity: 1, y: 0, duration: 0.65 }, "-=0.42")
      .to(ctas,      { opacity: 1, y: 0, stagger: 0.1, duration: 0.55 }, "-=0.38")
      .to(badges,    { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: "back.out(1.4)" }, "-=0.42")
      .to(image,     { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }, "-=1.05");
    tl.add(() => {
      gsap.to(".gh-float", { y: -9, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true });
    });
    return () => tl.kill();
  }, []);

  const lines = ["Well-Woman Exams", "in Bradenton,", "Florida."];

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#FAF5F1]"
      style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
      <Grain op={0.04} />
      <Dots op={0.038} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-44 -top-44 h-[780px] w-[780px] rounded-full"
        style={{ background: "radial-gradient(circle at 30% 30%,oklch(0.9 0.045 340 / 0.42),transparent 62%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-32 h-[540px] w-[540px] rounded-full"
        style={{ background: "radial-gradient(circle at 60% 60%,oklch(0.93 0.03 60 / 0.24),transparent 65%)" }} />

      <div className="relative z-[1] mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:gap-10 md:py-32 lg:px-0 lg:py-36">
        <div className="flex flex-col">
          <div className="gh-eyebrow mb-7"><Eyebrow>Well-Woman Exam · Bradenton, FL</Eyebrow></div>
          <h1 className="font-display text-[#18120F]"
            style={{ fontFamily: "var(--font-display,'Playfair Display',Georgia,serif)", fontSize: "clamp(2.9rem,5.8vw,4.7rem)", lineHeight: 1.03, letterSpacing: "-0.03em" }}>
            {lines.map((line, li) => (
              <span key={li} className="block overflow-hidden leading-[1.08]">
                {line.split(" ").map((w, wi) => (
                  <span key={wi} className="gh-word mr-[0.22em] inline-block">{w}</span>
                ))}
              </span>
            ))}
          </h1>
          <div className="gh-rule mt-6 flex items-center gap-2.5">
            <div className="h-[2.5px] w-14 rounded-full"
              style={{ background: "linear-gradient(to right,oklch(0.48 0.13 322),oklch(0.78 0.07 340 / 0.28))" }} />
            <div className="h-[2.5px] w-5 rounded-full" style={{ background: "oklch(0.86 0.05 340 / 0.38)" }} />
          </div>
          <p className="gh-sub mt-6 max-w-[460px] leading-[1.9]"
            style={{ color: MUTED, fontSize: "clamp(0.9rem,1.2vw,1.02rem)" }}>
            A well-woman exam is an annual preventive gynecological exam — a significant part of
            early detection and preventive care of some diseases. At Women's Care of Bradenton,
            our OBGYN specialists are highly skilled in detecting, diagnosing, and treating all
            obstetric and gynecological conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="gh-cta" variant="primary" href="/contact">Book your exam</Button>
            <Button className="gh-cta" variant="outline" href="tel:9415003100">Call (941) 500-3100</Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Preventive Care", "All Ages Welcome", "Same-Week Appointments", "Board Certified OB/GYN"].map((l) => (
              <span key={l} className="gh-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
                style={{ background: "rgba(255,255,255,0.78)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid oklch(0.86 0.05 320 / 0.36)", color: "oklch(0.38 0.1 320)", boxShadow: "0 2px 6px oklch(0.3 0.05 320 / 0.04)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.55 0.13 150)" }} />{l}
              </span>
            ))}
          </div>
        </div>

        <div className="gh-image relative">
          <div aria-hidden="true" className="pointer-events-none absolute inset-[-22px] rounded-[2.2rem]"
            style={{ background: "radial-gradient(ellipse at 55% 28%,oklch(0.87 0.07 330 / 0.32),transparent 66%)", filter: "blur(26px)" }} />
          <div className="relative h-[300px] w-full overflow-hidden sm:h-[460px] md:h-[560px] lg:h-[650px]"
            style={{ borderRadius: "2rem 2rem 5.5rem 2rem", boxShadow: "0 4px 8px oklch(0.2 0.03 60 / 0.06),0 28px 70px oklch(0.2 0.03 60 / 0.2)" }}>
            <Image src="/services/well-woman-hero.jpg" alt="Well-woman exam consultation at Women's Care of Bradenton" fill priority
              sizes="(min-width:768px) 50vw,100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-44"
              style={{ background: "linear-gradient(to top,oklch(0.18 0.04 320 / 0.6),transparent)" }} />
            {/* <div className="gh-float absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-bottom-6 sm:-left-6 sm:px-5 sm:py-4"
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid oklch(0.92 0.02 80 / 0.88)", boxShadow: "0 6px 28px oklch(0.2 0.02 60 / 0.14)" }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-[17px] font-bold"
                style={{ background: "oklch(0.9 0.05 340 / 0.55)", color: "oklch(0.42 0.12 320)" }}>♥</span>
              <div>
                <p className="font-display text-[18px] font-bold leading-none text-[#1C1814]"
                  style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>Annual</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#9A9490" }}>Recommended every year</p>
              </div>
            </div> */}
          </div>
          <div aria-hidden="true" className="absolute -right-2 top-9 h-5 w-5 rounded-full sm:-right-4 sm:top-12 sm:h-6 sm:w-6"
            style={{ background: "oklch(0.72 0.1 320 / 0.65)" }} />
          <div aria-hidden="true" className="absolute -right-6 top-20 h-3 w-3 rounded-full sm:-right-8 sm:top-24"
            style={{ background: "oklch(0.86 0.07 340 / 0.42)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── 2. WHY IT MATTERS ────────────────────────────────────────────────────────

function WhyItMatters() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const items = gsap.utils.toArray(".wim-reveal", el);
    gsap.set(items, { opacity: 0, y: 28 });
    const a = gsap.to(items, {
      opacity: 1, y: 0, stagger: 0.08, duration: 0.85, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 76%" },
    });
    const img = el.querySelector(".wim-img-inner");
    if (img) {
      const p = gsap.to(img, {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      return () => { a.kill(); a.scrollTrigger?.kill(); p.kill(); p.scrollTrigger?.kill(); };
    }
    return () => { a.kill(); a.scrollTrigger?.kill(); };
  }, []);

  const benefits = [
    "Prevent diseases, e.g., cervical cancer, while protecting your fertility",
    "Protect you from breast diseases",
    "Plan for pregnancy with pre-conception counseling",
    "Safeguard you from sexually transmitted infections (STIs)",
    "Avoid an unwanted pregnancy",
  ];

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
      <Grain op={0.025} />
      <div className="relative z-[1] mx-auto grid max-w-6xl grid-cols-1 items-stretch md:grid-cols-2 md:min-h-[680px]">

        {/* LEFT — image */}
        <div className="relative order-2 h-[340px] overflow-hidden md:order-1 md:h-auto">
          <div className="wim-img-inner absolute inset-[-8%] w-[116%]">
            <Image src="/services/well-woman-consult.jpg" alt="Doctor consulting with female patient" fill
              sizes="(min-width:768px) 50vw,100vw" className="object-cover" />
          </div>
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-28 hidden md:block"
            style={{ background: "linear-gradient(to right,transparent,#FAF5F1)" }} />
          <div className="wim-reveal absolute bottom-6 left-5 max-w-[210px] rounded-2xl p-4 sm:bottom-8 sm:left-7"
            style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid oklch(0.9 0.04 320 / 0.3)", boxShadow: "0 4px 20px oklch(0.2 0.03 60 / 0.1)" }}>
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.55 0.16 150)" }} />
              <p className="text-[9.5px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "oklch(0.44 0.1 320)" }}>Prevention first</p>
            </div>
            <p className="text-[11.5px] leading-[1.7]" style={{ color: "#6F665E" }}>
              Early detection of reproductive health problems is vital to maintaining good health.
            </p>
          </div>
        </div>

        {/* RIGHT — copy */}
        <div className="order-1 flex flex-col justify-center gap-6 px-7 py-16 md:order-2 md:px-12 md:py-20 lg:px-14">
          <div className="wim-reveal"><Eyebrow>Why it matters</Eyebrow></div>
          <h2 className="wim-reveal font-display leading-[1.05] tracking-[-0.026em]"
            style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(1.8rem,3.2vw,2.7rem)", color: DARK }}>
            Why Well-Woman Exams{" "}
            <em style={{ fontStyle: "italic", color: WARM }}>Are So Important.</em>
          </h2>
          <div className="wim-reveal relative border-l-2 py-1 pl-5"
            style={{ borderColor: "oklch(0.75 0.08 320 / 0.3)" }}>
            <p className="text-[15px] leading-[1.88]" style={{ color: MUTED }}>
              Women have an extraordinary array of responsibilities in their daily lives. With so
              many items on the to-do list, your visit to a well-woman clinic may get pushed aside.
              Unfortunately, delaying an annual well-woman exam can have a negative impact on your
              health and vitality. Your regular well-woman visit is an investment in your
              gynecological and overall health. Testing helps you:
            </p>
          </div>
          <ul className="wim-reveal flex flex-col gap-2.5">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" style={{ color: "oklch(0.55 0.16 150)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[13.5px] leading-[1.75]" style={{ color: MUTED }}>{b}</span>
              </li>
            ))}
          </ul>
          <div className="wim-reveal">
            <p className="mb-5 text-[13.5px] leading-[1.8]" style={{ color: MUTED }}>
              We can help you before you're pregnant if you're planning a pregnancy. Some conditions,
              e.g., gestational diabetes, may be avoided during pregnancy if your risk for them is
              identified today.
            </p>
            <Button variant="primary" href="/contact">Schedule your visit</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. PHYSICAL EXAM — bento on dark ────────────────────────────────────────

function PhysicalExam() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const intro = gsap.utils.toArray(".pe-intro > *", el);
    const cells = gsap.utils.toArray(".pe-cell", el);
    gsap.set(intro, { opacity: 0, y: 22 });
    gsap.set(cells, { opacity: 0, y: 36, scale: 0.98 });
    const base = { ease: "power3.out", scrollTrigger: { trigger: el, start: "top 78%" } };
    const a1 = gsap.to(intro, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ...base });
    const a2 = gsap.to(cells, { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.85, delay: 0.12, ease: "back.out(1.2)", ...base });
    return () => { [a1, a2].forEach(a => { a.kill(); a.scrollTrigger?.kill(); }); };
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden"
      style={{ background: "oklch(0.15 0.05 322)" }}>
      <Grain op={0.055} />
      <Dots op={0.055} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%,oklch(1 0 0 / 0.055),transparent 58%)" }} />

      <div className="relative z-[1] mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28 lg:px-0 lg:py-32">
        <div className="pe-intro mb-14 flex flex-col items-center gap-4 text-center">
          <Eyebrow light>Physical exam</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.026em] text-white"
            style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(2rem,4vw,3.1rem)" }}>
            Physical Exam at Your{" "}
            <em style={{ fontStyle: "italic", color: PINK_L }}>Well-Woman Visit.</em>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.88]" style={{ color: "oklch(1 0 0 / 0.58)" }}>
            In addition to taking your blood pressure and measuring your height and weight, your
            doctor asks about your menstrual period, general health, family history, birth control
            methods, and sexual activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {/* Cell A — wide */}
          <div className="pe-cell group relative overflow-hidden rounded-[24px] p-8 sm:col-span-2 lg:col-span-2"
            style={{ background: "oklch(1 0 0 / 0.07)", border: "1px solid oklch(1 0 0 / 0.11)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.18),0 16px 40px oklch(0 0 0 / 0.24)", minHeight: "220px" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 20% 50%,oklch(0.65 0.12 330 / 0.14),transparent 65%)" }} />
            <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-5 select-none font-display font-bold leading-none opacity-[0.06]"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(6rem,12vw,10rem)", color: "white" }}>01</span>
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "oklch(0.72 0.1 320 / 0.7)" }}>01</span>
            <h3 className="font-display text-[1.45rem] font-semibold leading-snug text-white sm:text-[1.65rem]"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
              Breast Exam
            </h3>
            <div className="my-4 h-px max-w-[280px]" style={{ background: "oklch(1 0 0 / 0.1)" }} />
            <p className="max-w-[520px] text-[14px] leading-[1.88]" style={{ color: "oklch(1 0 0 / 0.58)" }}>
              Your doctor checks your breasts to determine any possible problems, e.g., a lump.
              They will palpate (gently press) each breast and show you how to perform a monthly
              self-exam at home. If your doctor is male, a female nurse stays in the exam room with you.
            </p>
          </div>

          {/* Cell B — tall right */}
          <div className="pe-cell group relative overflow-hidden rounded-[24px] p-7 sm:row-span-2"
            style={{ background: "oklch(0.88 0.06 330 / 0.09)", border: "1px solid oklch(1 0 0 / 0.1)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.14),0 12px 30px oklch(0 0 0 / 0.18)", minHeight: "200px" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 80% 20%,oklch(0.7 0.12 330 / 0.18),transparent 65%)" }} />
            <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 select-none font-display font-bold leading-none opacity-[0.06]"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "8rem", color: "white" }}>02</span>
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "oklch(0.72 0.1 320 / 0.7)" }}>02</span>
            <h3 className="font-display text-[1.25rem] font-semibold leading-snug text-white"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
              Pelvic Exam
            </h3>
            <div className="my-3.5 h-px" style={{ background: "oklch(1 0 0 / 0.09)" }} />
            <p className="text-[13.5px] leading-[1.88]" style={{ color: "oklch(1 0 0 / 0.54)" }}>
              Your doctor examines the vagina, reproductive organs, and cervix. You place your feet
              in footrests (stirrups) at the base of the exam table. The doctor inserts a speculum
              instrument to examine your vaginal area, then uses lubricated gloves to assess the
              inner pelvic organs' shape, size, and position. You may feel slight discomfort,
              but the exam shouldn't hurt.
            </p>
          </div>

          {/* Cell C */}
          <div className="pe-cell group relative overflow-hidden rounded-[24px] p-7"
            style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.09)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.14)", minHeight: "180px" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 10% 80%,oklch(0.6 0.1 150 / 0.14),transparent 65%)" }} />
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "oklch(0.72 0.1 320 / 0.7)" }}>03</span>
            <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-white"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
              External Genital Exam
            </h3>
            <div className="my-3 h-px" style={{ background: "oklch(1 0 0 / 0.09)" }} />
            <p className="text-[13px] leading-[1.84]" style={{ color: "oklch(1 0 0 / 0.52)" }}>
              While a sheet covers you, the doctor will ask you to recline and place your feet in
              the exam table's stirrups. Your doctor checks the appearance of your genitals for
              discharge, sores, lesions, or unusual color.
            </p>
          </div>

          {/* Cell D */}
          <div className="pe-cell group relative overflow-hidden rounded-[24px] p-7"
            style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.09)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.14)", minHeight: "180px" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 90% 80%,oklch(0.65 0.1 60 / 0.14),transparent 65%)" }} />
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "oklch(0.72 0.1 320 / 0.7)" }}>04</span>
            <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-white"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
              Pap Test
            </h3>
            <div className="my-3 h-px" style={{ background: "oklch(1 0 0 / 0.09)" }} />
            <p className="text-[13px] leading-[1.84]" style={{ color: "oklch(1 0 0 / 0.52)" }}>
              Used to check for abnormal cervical cells that might lead to cancer. The gynecologist
              inserts a cotton-tipped swab into the vagina to the cervix to collect cells. The sample
              is sent to a laboratory for evaluation. You may feel slight pressure but shouldn't
              feel pain.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" href="/about">Meet Dr. Jothi →</Button>
        </div>
      </div>
    </section>
  );
}

// ─── 4. WHAT'S INCLUDED — editorial numbered list ────────────────────────────

function WhatsIncluded() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const heading = gsap.utils.toArray(".sc-head > *", el);
    const rows    = gsap.utils.toArray(".sc-row", el);
    gsap.set(heading, { opacity: 0, y: 20 });
    gsap.set(rows,    { opacity: 0, y: 22 });
    const base = { ease: "power3.out", scrollTrigger: { trigger: el, start: "top 78%" } };
    const a1 = gsap.to(heading, { opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ...base });
    const a2 = gsap.to(rows,    { opacity: 1, y: 0, stagger: 0.07, duration: 0.7, delay: 0.14, ...base });
    return () => { [a1, a2].forEach(a => { a.kill(); a.scrollTrigger?.kill(); }); };
  }, []);

  const items = [
    {
      label: "Examinations & Screening Tests",
      body: "A complete head-to-toe physical including blood pressure, height, weight, and vital signs — the baseline that allows Dr. Jothi to track changes in your health year over year.",
    },
    {
      label: "Health Topics Based on Your Risk & Age",
      body: "Topics are personalised to your age, family history, and risk factors. From a teenager's first exam to menopause management — every visit is tailored to where you are in life.",
    },
    {
      label: "Immunizations as Needed",
      body: "Vaccinations are reviewed and administered based on your age, immunisation history, and current clinical guidelines — including HPV, flu, and other recommended vaccines.",
    },
    {
      label: "Birth Control Counselling",
      body: "Our practice offers oral contraception, etonogestrel implants, intrauterine devices (IUDs), and surgical options. Your visit is the time to explore what's right for your life and health.",
    },
    {
      label: "STI & Blood Screening",
      body: "Confidential, judgment-free testing. Blood screening includes cholesterol, glucose, thyroid, and STI panels as clinically indicated for your age and risk profile.",
    },
    {
      label: "Pre-Conception Counselling",
      body: "If you're planning a pregnancy, we can help identify risk factors — such as gestational diabetes — before conception, giving you the best possible start to a healthy pregnancy.",
    },
  ];

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
      <Grain op={0.025} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-1/4 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle,oklch(0.92 0.04 60 / 0.22),transparent 65%)" }} />

      <div className="relative z-[1] mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28 lg:px-0 lg:py-32">
        <div className="sc-head mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
          <div className="flex flex-col gap-4">
            <Eyebrow>Your well-woman care includes</Eyebrow>
            <h2 className="font-display leading-[1.05] tracking-[-0.026em]"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(1.9rem,3.5vw,2.9rem)", color: DARK }}>
              Everything your health{" "}
              <em style={{ fontStyle: "italic", color: WARM }}>deserves.</em>
            </h2>
          </div>
          <p className="max-w-[360px] text-[14.5px] leading-[1.88] md:ml-auto md:text-right" style={{ color: MUTED }}>
            Each component of your well-woman visit is performed with clinical precision
            and genuine compassion — nothing rushed, nothing skipped.
          </p>
        </div>

        <div className="flex flex-col">
          {items.map((s, i) => (
            <div key={i} className="sc-row group relative grid cursor-default grid-cols-[3rem_1fr] items-start gap-x-6 border-t py-6 transition-all duration-300 md:grid-cols-[3.5rem_1fr_1fr] md:items-center md:gap-x-10 md:py-7"
              style={{ borderColor: "oklch(0.82 0.04 320 / 0.22)" }}>
              <span className="font-display text-[1.1rem] font-bold tabular-nums transition-colors duration-300"
                style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", color: "oklch(0.72 0.08 320 / 0.5)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-[oklch(0.44_0.12_322)]"
                style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", color: DARK }}>
                {s.label}
              </h3>
              <p className="col-start-2 mt-2 text-[13px] leading-[1.82] md:col-start-3 md:mt-0" style={{ color: "#8A817A" }}>
                {s.body}
              </p>
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ background: "linear-gradient(to right,oklch(0.55 0.13 322 / 0.45),transparent)" }} />
            </div>
          ))}
          <div className="h-px" style={{ background: "oklch(0.82 0.04 320 / 0.22)" }} />
        </div>
      </div>
    </section>
  );
}

// ─── 5. PATIENT FEEDBACK ──────────────────────────────────────────────────────

function Testimonials() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const intro = gsap.utils.toArray(".tq-intro > *", el);
    const cards = gsap.utils.toArray(".tq-card", el);
    gsap.set(intro, { opacity: 0, y: 20 });
    gsap.set(cards, { opacity: 0, y: 34 });
    const base = { ease: "power3.out", scrollTrigger: { trigger: el, start: "top 78%" } };
    const a1 = gsap.to(intro, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ...base });
    const a2 = gsap.to(cards, { opacity: 1, y: 0, stagger: 0.12, duration: 0.82, delay: 0.14, ...base });
    return () => { [a1, a2].forEach(a => { a.kill(); a.scrollTrigger?.kill(); }); };
  }, []);

  // Exact quotes from the client's site
  const quotes = [
    {
      q: "I felt that it is a very comfortable place and feel that questions were answered and that everyone was very professional. Did not see DR JOTHI this visit but felt that I was well taken care of.",
      name: "Jody H.",
      when: "Patient",
    },
    {
      q: "I felt the staff really took the time to listen to my concerns and develop a plan. Great first experience.",
      name: "Patricia D.",
      when: "Patient",
    },
    {
      q: "She was sweet and took her time discussing treatment ideas.",
      name: "Shawna P.",
      when: "Patient",
    },
    {
      q: "Didn't have a long wait, saw the PA and she was great… new patient I was although I have known Dr. for a few years. Lovely office and great visit.",
      name: "Kathleen C.",
      when: "Patient",
    },
  ];

  return (
    <section ref={ref} className="relative w-full overflow-hidden"
      style={{ background: "oklch(0.15 0.05 322)" }}>
      <Grain op={0.055} />
      <Dots op={0.055} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-[480px] w-[480px] rounded-full"
        style={{ background: "radial-gradient(circle,oklch(0.55 0.12 320 / 0.12),transparent 65%)" }} />

      <div className="relative z-[1] mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-28 lg:px-0 lg:py-32">
        <div className="tq-intro mb-14 flex flex-col items-center gap-4 text-center">
          <Eyebrow light>Patient feedback</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.026em] text-white"
            style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(1.9rem,3.5vw,2.9rem)" }}>
            What our patients{" "}
            <em style={{ fontStyle: "italic", color: PINK_L }}>are saying.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured first quote */}
          <div className="tq-card relative overflow-hidden rounded-[24px] p-8 lg:col-span-2"
            style={{ background: "oklch(1 0 0 / 0.065)", border: "1px solid oklch(1 0 0 / 0.12)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.16)" }}>
            <span aria-hidden="true" className="pointer-events-none absolute -top-4 right-5 select-none font-display leading-none"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "9rem", color: "oklch(0.8 0.06 330 / 0.1)", lineHeight: 1 }}>"</span>
            <div className="mb-3 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"
                  style={{ color: "oklch(0.78 0.12 75)" }}>
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <p className="text-[16px] font-medium leading-[1.85]" style={{ color: "oklch(1 0 0 / 0.78)" }}>
              "{quotes[0].q}"
            </p>
            <div className="mt-5 h-px" style={{ background: "oklch(1 0 0 / 0.1)" }} />
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ background: "oklch(0.75 0.1 320 / 0.25)", color: PINK_L }}>
                {quotes[0].name[0]}
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-white">{quotes[0].name}</p>
                <p className="text-[11px]" style={{ color: "oklch(1 0 0 / 0.42)" }}>{quotes[0].when}</p>
              </div>
            </div>
          </div>

          {quotes.slice(1).map((t, i) => (
            <div key={i} className="tq-card relative overflow-hidden rounded-[24px] p-7"
              style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.09)", boxShadow: "0 2px 8px oklch(0 0 0 / 0.14)" }}>
              <span aria-hidden="true" className="pointer-events-none absolute -top-3 right-4 select-none font-display leading-none"
                style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "6rem", color: "oklch(0.8 0.06 330 / 0.09)", lineHeight: 1 }}>"</span>
              <div className="mb-2.5 flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"
                    style={{ color: "oklch(0.78 0.12 75)" }}>
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <p className="text-[14px] leading-[1.88]" style={{ color: "oklch(1 0 0 / 0.68)" }}>
                "{t.q}"
              </p>
              <div className="mt-4 h-px" style={{ background: "oklch(1 0 0 / 0.08)" }} />
              <div className="mt-3.5 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ background: "oklch(0.75 0.1 320 / 0.2)", color: PINK_L }}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{t.name}</p>
                  <p className="text-[10.5px]" style={{ color: "oklch(1 0 0 / 0.4)" }}>{t.when}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. CTA ───────────────────────────────────────────────────────────────────

function CTA() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const inner = el.querySelector(".cta-inner");
    if (!inner) return;
    gsap.set(inner, { opacity: 0, y: 30 });
    const a = gsap.to(inner, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
    return () => { a.kill(); a.scrollTrigger?.kill(); };
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden"
      style={{ background: "oklch(0.94 0.04 330 / 0.45)", borderTop: "1px solid oklch(0.86 0.05 330 / 0.22)" }}>
      <Grain op={0.028} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%,oklch(0.9 0.05 330 / 0.28),transparent 60%)" }} />
      <div className="cta-inner relative z-[1] mx-auto flex max-w-2xl flex-col items-center gap-5 px-5 py-24 text-center sm:px-8 md:py-28">
        <Eyebrow>Take charge of your well-woman care</Eyebrow>
        <h2 className="font-display leading-[1.05] tracking-[-0.026em]"
          style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(1.9rem,3.8vw,3.1rem)", color: DARK }}>
          Request your annual exam{" "}
          <em style={{ fontStyle: "italic", color: "oklch(0.44 0.13 322)" }}>in Bradenton.</em>
        </h2>
        <p className="max-w-[460px] text-[15px] leading-[1.88]" style={{ color: MUTED }}>
          Well care is one of the best gifts to give yourself each year. Request an annual
          well-woman exam with Women's Care of Bradenton — new and returning patients welcome.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href="/contact">Book your exam</Button>
          <Button variant="outline" href="tel:9415003100">Call (941) 500-3100</Button>
        </div>
        <p className="mt-1 text-[11.5px]" style={{ color: "oklch(0.5 0.07 320 / 0.58)" }}>
          4216 Cortez Rd W, Bradenton, FL 34210 · Mon–Thu 8am–5pm · Fri 8am–1pm
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WellWomanExamPage() {
  return (
    <main style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
      <Hero />
      <WhyItMatters />
      <PhysicalExam />
      <WhatsIncluded />
      <Testimonials />
      <CTA />
    </main>
  );
}