"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

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
      gsap.set(".contact-hero-label", { opacity: 0, y: 18 });
      gsap.set(".contact-hero-heading .word", { opacity: 0, yPercent: 110 });
      gsap.set(".contact-hero-rule", { scaleX: 0, opacity: 0 });
      gsap.set(".contact-hero-sub", { opacity: 0, y: 20 });
      gsap.set(".contact-hero-cta", { opacity: 0, y: 18 });
      gsap.set(".contact-hero-card", { opacity: 0, y: 30, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { duration: 0.85, ease: "power4.out" },
      });
      tl.to(".contact-hero-label", { opacity: 1, y: 0 })
        .to(
          ".contact-hero-heading .word",
          { opacity: 1, yPercent: 0, stagger: 0.06, duration: 0.9 },
          "-=0.5",
        )
        .to(
          ".contact-hero-rule",
          { scaleX: 1, opacity: 1, duration: 0.6 },
          "-=0.5",
        )
        .to(".contact-hero-sub", { opacity: 1, y: 0 }, "-=0.45")
        .to(".contact-hero-cta", { opacity: 1, y: 0, stagger: 0.12 }, "-=0.35")
        .to(".contact-hero-card", { opacity: 1, y: 0, scale: 1 }, "-=0.4");

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

  return (
    <section
      ref={ref}
      className="relative min-h-[72vh] overflow-hidden bg-[#FAF5F1]"
      style={{
        fontFamily: "var(--font-body, 'DM Sans', system-ui, sans-serif)",
      }}
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
        {/* LEFT */}
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
            className="contact-hero-heading overflow-hidden leading-[1.04] tracking-[-0.03em] text-[#18120F]"
            style={{
              fontFamily:
                "var(--font-display, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(2.6rem, 5.2vw, 4.1rem)",
            }}
          >
            {[
              ["Your", "care", "starts"],
              ["with", "a", "conversation."],
            ].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.map((word, wi) => (
                  <span key={wi} className="word mr-[0.22em] inline-block">
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className="contact-hero-rule mt-6 flex items-center gap-3"
            style={{ transformOrigin: "left" }}
          >
            <div
              className="h-[2px] w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.55 0.13 322), oklch(0.7 0.12 200 / 0.7))",
              }}
            />
            <div
              className="h-[2px] w-6 rounded-full"
              style={{ background: "oklch(0.88 0.09 200 / 0.6)" }}
            />
          </div>

          <p
            className="contact-hero-sub mt-7 max-w-[520px] text-[15px] leading-[1.9]"
            style={{ color: "#7A7068" }}
          >
            Call us, send a message, or request an appointment online. Our team
            will help you choose the right visit and guide you every step of the
            way.
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
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
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
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
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
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.15 200), oklch(0.78 0.14 180))",
                  boxShadow: "0 6px 16px oklch(0.4 0.1 200 / 0.4)",
                }}
              >
                (941) 500-3100
              </Link>
              <div
                className="mt-6 h-px"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.8 0.08 200 / 0.5), oklch(0.9 0.06 330 / 0.6), transparent)",
                }}
              />
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

// ─── Contact Form (Web3Forms) ─────────────────────────────────────────────────

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  reason: "",
  message: "",
};

// Inline field wrapper — reuses the same visual style across all inputs
function FieldWrap({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium text-[#4A413B]">
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: "oklch(0.5 0.18 20)" }}>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          className="text-[11px] font-medium"
          style={{ color: "oklch(0.5 0.18 20)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function InputBox({ focused, error, children }) {
  return (
    <div
      className="flex items-center rounded-2xl px-3.5 py-2.5 transition-all duration-200"
      style={{
        background: "oklch(0.98 0.01 80)",
        border: `1px solid ${error ? "oklch(0.5 0.18 20 / 0.6)" : focused ? "oklch(0.52 0.12 320 / 0.6)" : "oklch(0.9 0.02 80)"}`,
        boxShadow:
          focused && !error
            ? "0 0 0 3px oklch(0.52 0.12 320 / 0.1)"
            : error
              ? "0 0 0 3px oklch(0.5 0.18 20 / 0.08)"
              : "none",
      }}
    >
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]";

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const formRef = useRef(null);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.reason) e.reason = "Please select a reason for your visit.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          // Web3Forms hidden config
          subject: `Appointment Request — ${form.reason}`,
          from_name: "Women's Care of Bradenton Website",
          botcheck: "",
          // Form fields
          "Full Name": form.name,
          Email: form.email,
          Phone: form.phone || "—",
          "Preferred Date": form.date || "—",
          "Preferred Time": form.time || "—",
          Reason: form.reason,
          Message: form.message || "—",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "oklch(0.93 0.06 150 / 0.35)",
            border: "1px solid oklch(0.75 0.12 150 / 0.4)",
          }}
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            style={{ color: "oklch(0.45 0.15 150)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <p className="text-[20px] font-semibold text-[#18120F]">
            Request received!
          </p>
          <p
            className="mt-2 max-w-[320px] text-[13.5px] leading-[1.8]"
            style={{ color: "#7A7068" }}
          >
            Thank you for reaching out. Our team will call you within one
            business day to confirm your appointment.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="mt-1 rounded-full px-5 py-2 text-[12.5px] font-semibold transition-all duration-300 hover:brightness-105"
          style={{
            background: "oklch(0.42 0.12 320)",
            color: "#fff",
            boxShadow: "0 4px 14px oklch(0.42 0.12 320 / 0.28)",
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Honeypot — hidden from humans, traps bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
      />

      {/* Error banner */}
      {status === "error" && (
        <div
          className="flex items-start gap-2.5 rounded-2xl p-3.5 text-[13px] leading-[1.7]"
          style={{
            background: "oklch(0.97 0.03 20 / 0.6)",
            border: "1px solid oklch(0.75 0.12 20 / 0.35)",
            color: "oklch(0.4 0.15 20)",
          }}
        >
          <svg
            className="mt-0.5 h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          Something went wrong. Please try again or call us at (941) 500-3100.
        </div>
      )}

      {/* Name */}
      <FieldWrap label="Full name" required error={errors.name}>
        <InputBox focused={focused === "name"} error={errors.name}>
          <input
            type="text"
            placeholder="Jane Doe"
            value={form.name}
            onChange={set("name")}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused("")}
            className={inputClass}
          />
        </InputBox>
      </FieldWrap>

      {/* Email + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="Email" required error={errors.email}>
          <InputBox focused={focused === "email"} error={errors.email}>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
        <FieldWrap label="Phone" error={errors.phone}>
          <InputBox focused={focused === "phone"} error={errors.phone}>
            <input
              type="tel"
              placeholder="(941) 555-1234"
              value={form.phone}
              onChange={set("phone")}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
      </div>

      {/* Date + Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="Preferred date" error={errors.date}>
          <InputBox focused={focused === "date"} error={errors.date}>
            <input
              type="date"
              value={form.date}
              onChange={set("date")}
              onFocus={() => setFocused("date")}
              onBlur={() => setFocused("")}
              min={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
        <FieldWrap label="Preferred time" error={errors.time}>
          <InputBox focused={focused === "time"} error={errors.time}>
            <input
              type="time"
              value={form.time}
              onChange={set("time")}
              onFocus={() => setFocused("time")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
      </div>

      {/* Reason */}
      <FieldWrap label="Reason for visit" required error={errors.reason}>
        <InputBox focused={focused === "reason"} error={errors.reason}>
          <select
            value={form.reason}
            onChange={set("reason")}
            onFocus={() => setFocused("reason")}
            onBlur={() => setFocused("")}
            className={`${inputClass} appearance-none`}
            style={{ color: form.reason ? "#18120F" : "oklch(0.7 0.02 80)" }}
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
        </InputBox>
      </FieldWrap>

      {/* Message */}
      <FieldWrap label="Message (optional)" error={errors.message}>
        <div
          className="rounded-2xl px-3.5 py-2.5 transition-all duration-200"
          style={{
            background: "oklch(0.98 0.01 80)",
            border: `1px solid ${focused === "message" ? "oklch(0.52 0.12 320 / 0.6)" : "oklch(0.9 0.02 80)"}`,
            boxShadow:
              focused === "message"
                ? "0 0 0 3px oklch(0.52 0.12 320 / 0.1)"
                : "none",
          }}
        >
          <textarea
            rows={4}
            placeholder="Share anything you'd like us to know before your visit."
            value={form.message}
            onChange={set("message")}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused("")}
            className="w-full resize-none bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]"
          />
        </div>
      </FieldWrap>

      {/* Submit */}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          style={{
            background: "oklch(0.42 0.12 320)",
            boxShadow: "0 4px 16px oklch(0.42 0.12 320 / 0.3)",
          }}
        >
          {status === "loading" ? (
            <>
              {/* Spinner */}
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Submit request
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
            </>
          )}
        </button>
        <p
          className="text-[11px]"
          style={{ color: "oklch(0.5 0.06 320 / 0.8)" }}
        >
          We&apos;ll never share your information. For non-emergency requests
          only.
        </p>
      </div>
    </form>
  );
}

// ─── Details + Form Section ───────────────────────────────────────────────────

function ContactDetailsSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.set(".contact-detail", { y: 32, opacity: 0 });
      gsap.set(".contact-form-wrap", { y: 26, opacity: 0 });

      gsap.to(".contact-detail", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.to(".contact-form-wrap", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
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
                className="leading-[1.12] tracking-[-0.02em] text-[#16100D]"
                style={{
                  fontFamily: "var(--font-display, 'Playfair Display', serif)",
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
                Bradenton, Sarasota, and the surrounding communities. Ample
                on-site parking and a calm reception area designed for privacy
                and comfort.
              </p>
            </div>

            <div className="contact-detail grid gap-5 sm:grid-cols-2">
              {/* Address card */}
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
                  4216 Cortez Rd W<br />
                  Bradenton, FL 34210
                </p>
                <Link
                  href="https://maps.google.com/?q=4216+Cortez+Rd+W+Bradenton+FL+34210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors hover:opacity-80"
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

              {/* Contact card */}
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
                <div className="mt-2 space-y-1 text-[14px] text-[#18120F]">
                  <p>
                    Phone:{" "}
                    <Link href="tel:9415003100" className="hover:underline">
                      (941) 500-3100
                    </Link>
                  </p>
                  <p>
                    Email:{" "}
                    <Link
                      href="mailto:info@womenscarebradenton.com"
                      className="hover:underline"
                    >
                      info@womenscarebradenton.com
                    </Link>
                  </p>
                </div>
                <p className="mt-3 text-[12px]" style={{ color: "#8A817A" }}>
                  For emergencies, please call 911 or visit the nearest
                  emergency room.
                </p>
              </div>
            </div>

            {/* Hours */}
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
                  <span className="font-semibold text-[#18120F]">Friday</span>
                  <br />
                  8:00am – 1:00pm
                </p>
              </div>
              <div
                className="mt-3 h-px"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.8 0.14 65 / 0.6), oklch(0.8 0.08 200 / 0.5), transparent)",
                }}
              />
            </div>
          </div>

          {/* RIGHT: Form */}
          <div
            className="contact-form-wrap rounded-[26px] p-6 sm:p-7"
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
              <p className="mt-1 text-[14px]" style={{ color: "#7A7068" }}>
                Share a few details and our team will call you to confirm your
                visit.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Map Section ──────────────────────────────────────────────────────────────

function MapSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.set(".contact-map-copy", { x: -40, opacity: 0 });
      gsap.set(".contact-map-frame", { x: 40, opacity: 0 });

      gsap.to(".contact-map-copy", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      });
      gsap.to(".contact-map-frame", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.08,
      });
      gsap.to(".contact-map-frame-inner", {
        y: -10, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAF5F1]">
      <GrainOverlay opacity={0.02} />
      <DotGrid color="oklch(0.55 0.06 320)" opacity={0.03} />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 lg:px-0 lg:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-14">

          {/* Copy */}
          <div className="contact-map-copy flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(to left, oklch(0.55 0.1 200 / 0.55), transparent)" }} />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: "oklch(0.42 0.12 320)" }}>
                Map &amp; directions
              </span>
            </div>
            <h2 className="leading-[1.12] tracking-[-0.02em] text-[#16100D]"
              style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
              Easy to reach from{" "}
              <span className="italic" style={{ color: "oklch(0.52 0.12 65)" }}>wherever you are.</span>
            </h2>
            <p className="text-[14.5px] leading-[1.9]" style={{ color: "#7A7068" }}>
              Women&apos;s Care of Bradenton is centrally located on Cortez Road West, minutes from US-41
              and just a short drive from downtown Bradenton, Sarasota, and the Gulf beaches.
            </p>
            <ul className="space-y-2 text-[13.5px]" style={{ color: "#7A7068" }}>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "oklch(0.55 0.12 150)" }} />
                Free on-site parking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "oklch(0.55 0.12 150)" }} />
                Ground floor access
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "oklch(0.55 0.12 150)" }} />
                Wheelchair accessible entrance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "oklch(0.55 0.12 150)" }} />
                Pharmacy and labs nearby
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="contact-map-frame relative">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[30px]"
              style={{ background: "radial-gradient(circle at 20% 0%, oklch(0.9 0.06 330 / 0.3), transparent 65%)", filter: "blur(22px)" }} />
            <div className="contact-map-frame-inner relative overflow-hidden rounded-[28px]"
              style={{ background: "linear-gradient(145deg, oklch(0.2 0.05 220 / 0.8), oklch(0.25 0.08 260))", boxShadow: "0 6px 18px oklch(0.3 0.04 60 / 0.18), 0 24px 60px oklch(0.3 0.04 60 / 0.22)" }}>
              <div className="aspect-[4/3] w-full">
                <iframe
                  title="Women's Care of Bradenton location"
                  src="https://maps.google.com/maps?q=4216+Cortez+Rd+W+Bradenton+FL+34210&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                style={{ background: "linear-gradient(to top, oklch(0.2 0.05 220 / 0.7), transparent)" }} />
              <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-[10px]">
                Cortez Rd W
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
