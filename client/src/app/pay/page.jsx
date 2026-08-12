"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const PAYMENT_LINK =
  "https://securelink-prod.valorpaytech.com:4430/?redirect=1&uid=c7ff529b-8b58-11f1-ab1a-128462456e49";

/* ─── Grain helper ──────────────────────────────────────────────────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Grain({ op = 0.035 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ opacity: op, backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
    />
  );
}

/* ─── Eyebrow ───────────────────────────────────────────────────────────── */
function Eyebrow({ children, light = false }) {
  const accent = light ? "oklch(0.88 0.04 320)" : "oklch(0.42 0.12 320)";
  const line = light ? "oklch(1 0 0 / 0.3)" : "oklch(0.55 0.1 320 / 0.4)";
  return (
    <div className="inline-flex items-center gap-3">
      <div className="h-px w-7 rounded-full" style={{ background: line }} />
      <span
        className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: accent }}
      >
        {children}
      </span>
      <div className="h-px w-7 rounded-full" style={{ background: line }} />
    </div>
  );
}

/* ─── Steps data ────────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Scan or click",
    body: "Use your phone camera on the QR code, or click the payment button below.",
  },
  {
    n: "02",
    title: "Enter your details",
    body: "You'll land on our secure Valor Paytech portal — enter your invoice details.",
  },
  {
    n: "03",
    title: "Confirm & done",
    body: "Complete the payment and receive an instant confirmation for your records.",
  },
];

const TRUST_POINTS = [
  "Bank-level encrypted checkout",
  "No account or login required",
  "Instant payment confirmation",
  "Accepted by all major cards",
];

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function PayHero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.set([".ph-eyebrow", ".ph-word", ".ph-sub", ".ph-badge"], {
        opacity: 1,
        y: 0,
        clearProps: "all",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".ph-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          ".ph-word",
          { opacity: 0, y: "110%", stagger: 0.06, duration: 0.75, immediateRender: false },
          "-=0.3"
        )
        .from(
          ".ph-sub",
          { opacity: 0, y: 16, duration: 0.6, immediateRender: false },
          "-=0.4"
        )
        .from(
          ".ph-badge",
          { opacity: 0, y: 12, stagger: 0.07, duration: 0.5, immediateRender: false, clearProps: "opacity,transform" },
          "-=0.38"
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#FAF5F1", display: "flex", alignItems: "center", minHeight: "56vh" }}
    >
      <Grain op={0.04} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[720px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.9 0.045 340 / 0.35) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-28 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.93 0.03 60 / 0.22) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-28 lg:px-0 lg:py-32">
        <div className="ph-eyebrow mb-6 text-center">
          <Eyebrow>Secure Online Payment</Eyebrow>
        </div>

        <h1
          className="mx-auto mb-6 text-center"
          style={{
            fontFamily: "var(--font-display,'Playfair Display',Georgia,serif)",
            fontSize: "clamp(3rem,6.5vw,5.4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#16100D",
            overflow: "hidden",
          }}
        >
          {["Pay your", "bill with ease."].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split(" ").map((w, wi) => {
                const isLast = li === 1 && wi === line.split(" ").length - 1;
                return (
                  <span
                    key={wi}
                    className="ph-word mr-[0.22em] inline-block"
                    style={{
                      fontStyle: isLast ? "italic" : "normal",
                      color: isLast ? "oklch(0.44 0.13 322)" : undefined,
                    }}
                  >
                    {w}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p
          className="ph-sub mx-auto mb-10 max-w-[520px] text-center leading-[1.85]"
          style={{ color: "#7A7068", fontSize: "clamp(0.9rem,1.1vw,1rem)" }}
        >
          Scan the QR code with your phone, or click through to our secure portal —
          your payment is processed safely in under a minute.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {TRUST_POINTS.map((t) => (
            <div
              key={t}
              className="ph-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold"
              style={{
                background: "oklch(0.91 0.055 330 / 0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid oklch(0.72 0.12 320 / 0.35)",
                color: "oklch(0.34 0.14 322)",
                boxShadow:
                  "0 1px 3px oklch(0.55 0.12 320 / 0.12), 0 4px 14px oklch(0.55 0.12 320 / 0.1)",
              }}
            >
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── QR + Payment card section (dark) ──────────────────────────────────── */
function PaymentCardSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".pc-left", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        x: -45,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      });
      gsap.from(".pc-right", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        x: 45,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".pc-hl", {
        scrollTrigger: { trigger: ref.current, start: "top 68%" },
        y: 14,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#2A1E2A" }}
    >
      <Grain op={0.045} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.88 0.06 320 / 0.09) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24 lg:px-0 lg:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* LEFT — QR card */}
          <div className="pc-left flex flex-col items-center">
            <div className="relative w-full max-w-[380px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-20px] rounded-[2.2rem]"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, oklch(0.72 0.12 320 / 0.22) 0%, transparent 65%)",
                  filter: "blur(20px)",
                }}
              />

              <div
                className="relative flex w-full flex-col items-center gap-5 p-9"
                style={{
                  borderRadius: "1.75rem 4.5rem 1.75rem 1.75rem",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                  boxShadow:
                    "0 4px 8px oklch(0 0 0 / 0.22), 0 24px 60px oklch(0 0 0 / 0.38)",
                }}
              >
                <div
                  className="overflow-hidden rounded-2xl bg-white p-4"
                  style={{ boxShadow: "0 8px 30px oklch(0 0 0 / 0.25)" }}
                >
                  <Image
                    src="/payment.png"
                    alt="Scan to pay QR code"
                    width={230}
                    height={230}
                    className="h-[230px] w-[230px] object-contain"
                  />
                </div>

                <div
                  className="flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{
                    background: "oklch(0.88 0.06 320 / 0.12)",
                    border: "1px solid oklch(0.75 0.1 320 / 0.25)",
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.72 0.14 320)" }} />
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "oklch(0.88 0.07 320)" }}
                  >
                    Scan to Pay
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — copy + CTA */}
          <div className="pc-right flex flex-col">
            <div className="mb-4">
              <Eyebrow light>Online Payment Portal</Eyebrow>
            </div>

            <h2
              className="mb-5 leading-[1.04] tracking-[-0.03em] text-white"
              style={{
                fontFamily: "var(--font-display,'Playfair Display',Georgia,serif)",
                fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
              }}
            >
              Ready when{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.82 0.09 320)" }}>you are.</span>
            </h2>

            <div className="mb-7 flex items-center gap-2">
              <div
                className="h-[2px] w-12 rounded-full"
                style={{ background: "linear-gradient(to right, oklch(0.72 0.12 320), transparent)" }}
              />
              <div className="h-[2px] w-5 rounded-full" style={{ background: "oklch(0.65 0.09 320 / 0.4)" }} />
            </div>

            <p
              className="mb-8 max-w-[440px] text-[14.5px] leading-[1.9]"
              style={{ color: "oklch(1 0 0 / 0.55)" }}
            >
              Click below to open our secure payment portal powered by Valor Paytech.
              You&apos;ll be able to enter your invoice details and complete your
              payment in just a few moments — no account required.
            </p>

            <a
              href={PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(to right, oklch(0.58 0.14 322), oklch(0.46 0.13 320))",
                boxShadow: "0 10px 32px oklch(0.55 0.14 322 / 0.4)",
              }}
            >
              Open Payment Portal
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <ul className="mt-10 flex flex-col gap-2.5">
              {["Encrypted end-to-end via Valor Paytech", "Works on any phone, tablet, or desktop", "Receipt sent automatically after payment"].map(
                (h, i) => (
                  <li key={i} className="pc-hl flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: "oklch(0.7 0.14 150)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[13.5px] leading-snug" style={{ color: "oklch(1 0 0 / 0.55)" }}>
                      {h}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Steps section (light) ─────────────────────────────────────────────── */
function StepsSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".st-ew", {
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
        y: 14,
        opacity: 0,
        duration: 0.5,
      });
      gsap.from(".st-hd", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.07,
      });
      gsap.from(".st-cd", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: "#FAF5F1" }}>
      <Grain op={0.03} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.93 0.03 60 / 0.22) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24 lg:px-0 lg:py-28">
        <div className="st-ew mb-5 text-center">
          <Eyebrow>How it works</Eyebrow>
        </div>
        <h2
          className="st-hd mx-auto mb-14 max-w-lg text-center leading-[1.05] tracking-[-0.025em]"
          style={{
            fontFamily: "var(--font-display,'Playfair Display',serif)",
            fontSize: "clamp(2rem,3.8vw,2.9rem)",
            color: "#16100D",
          }}
        >
          Three steps to a{" "}
          <span className="italic" style={{ color: "oklch(0.44 0.1 55)" }}>completed payment.</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="st-cd flex flex-col rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.76)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid oklch(0.84 0.05 320 / 0.2)",
                boxShadow:
                  "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 8px 24px oklch(0.3 0.06 320 / 0.05)",
              }}
            >
              <span
                className="mb-4 font-display text-[2.2rem] font-bold leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-display,'Playfair Display',serif)",
                  color: "oklch(0.48 0.13 322 / 0.35)",
                }}
              >
                {s.n}
              </span>
              <h3 className="mb-2 text-[16px] font-semibold" style={{ color: "#16100D" }}>
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-[1.85]" style={{ color: "#7A7068" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page export ───────────────────────────────────────────────────────── */
export default function PayPage() {
  return (
    <main style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
      <PayHero />
      <PaymentCardSection />
      <StepsSection />
    </main>
  );
}