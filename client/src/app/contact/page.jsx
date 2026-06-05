"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

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

const INITIAL_FORM = {
  newPatient: "Yes",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredTime: "",
  preferredDate: "",
  insurance: "",
  gender: "",
  dob: "",
};

function FieldWrap({ label, required, error, children }) {
  return (
    <div className="min-w-0 flex flex-col gap-1.5">
      <label className="text-[12px] font-medium leading-[1.4] text-[#4A413B]">
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
          className="text-[11px] font-medium leading-[1.5]"
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
      className="flex min-w-0 items-center rounded-2xl px-3.5 py-2.5 transition-all duration-200"
      style={{
        background: "oklch(0.98 0.01 80)",
        border: `1px solid ${
          error
            ? "oklch(0.5 0.18 20 / 0.6)"
            : focused
              ? "oklch(0.52 0.12 320 / 0.6)"
              : "oklch(0.9 0.02 80)"
        }`,
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
  "min-w-0 w-full bg-transparent text-[13px] text-[#18120F] outline-none placeholder:text-[oklch(0.7_0.02_80)]";

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [status, setStatus] = useState("idle");

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.preferredTime) next.preferredTime = "Preferred time is required.";
    if (!form.preferredDate) next.preferredDate = "Select date is required.";
    if (!form.insurance.trim()) next.insurance = "Insurance is required.";
    if (!form.gender) next.gender = "Gender is required.";
    if (!form.dob) next.dob = "Date of birth is required.";

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Appointment Request — ${form.firstName} ${form.lastName}`,
          from_name: "Women's Care of Bradenton Website",
          botcheck: "",
          "New Patient": form.newPatient,
          "First Name": form.firstName,
          "Last Name": form.lastName,
          Phone: form.phone,
          Email: form.email,
          "Preferred Time": form.preferredTime,
          "Select Date": form.preferredDate,
          Insurance: form.insurance,
          Gender: form.gender,
          "Date of Birth": form.dob,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: "oklch(0.93 0.06 150 / 0.35)",
            border: "1px solid oklch(0.75 0.12 150 / 0.4)",
          }}
        >
          <svg
            className="h-7 w-7"
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
          <p className="text-[19px] font-semibold text-[#18120F]">
            Request received!
          </p>
          <p
            className="mt-2 max-w-[300px] text-[13px] leading-[1.8]"
            style={{ color: "#7A7068" }}
          >
            Thank you for reaching out. Our team will review your appointment
            request and contact you soon.
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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
      />

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
          <span className="min-w-0 break-words">
            Something went wrong. Please try again or call us at (941) 500-3100.
          </span>
        </div>
      )}

      <FieldWrap label="New patient" required>
        <div className="grid grid-cols-2 gap-3">
          {["Yes", "No"].map((option) => {
            const active = form.newPatient === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, newPatient: option }))}
                className="rounded-2xl px-4 py-3 text-[13px] font-semibold transition-all duration-200"
                style={{
                  background: active
                    ? "oklch(0.42 0.12 320)"
                    : "oklch(0.98 0.01 80)",
                  color: active ? "#fff" : "#18120F",
                  border: active
                    ? "1px solid oklch(0.42 0.12 320)"
                    : "1px solid oklch(0.9 0.02 80)",
                  boxShadow: active
                    ? "0 6px 16px oklch(0.42 0.12 320 / 0.22)"
                    : "none",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </FieldWrap>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="First name" required error={errors.firstName}>
          <InputBox focused={focused === "firstName"} error={errors.firstName}>
            <input
              type="text"
              placeholder="Lovelie"
              value={form.firstName}
              onChange={set("firstName")}
              onFocus={() => setFocused("firstName")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>

        <FieldWrap label="Last name" required error={errors.lastName}>
          <InputBox focused={focused === "lastName"} error={errors.lastName}>
            <input
              type="text"
              placeholder="Colas"
              value={form.lastName}
              onChange={set("lastName")}
              onFocus={() => setFocused("lastName")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="Phone" required error={errors.phone}>
          <InputBox focused={focused === "phone"} error={errors.phone}>
            <input
              type="tel"
              placeholder="9419322834"
              value={form.phone}
              onChange={set("phone")}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>

        <FieldWrap label="Email" required error={errors.email}>
          <InputBox focused={focused === "email"} error={errors.email}>
            <input
              type="email"
              placeholder="colaslovelie96@gmail.com"
              value={form.email}
              onChange={set("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="Preferred time" required error={errors.preferredTime}>
          <InputBox
            focused={focused === "preferredTime"}
            error={errors.preferredTime}
          >
            <select
              value={form.preferredTime}
              onChange={set("preferredTime")}
              onFocus={() => setFocused("preferredTime")}
              onBlur={() => setFocused("")}
              className={`${inputClass} appearance-none`}
              style={{
                color: form.preferredTime ? "#18120F" : "oklch(0.7 0.02 80)",
              }}
            >
              <option value="" disabled>
                Select time
              </option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>First available</option>
            </select>
          </InputBox>
        </FieldWrap>

        <FieldWrap label="Select date" required error={errors.preferredDate}>
          <InputBox
            focused={focused === "preferredDate"}
            error={errors.preferredDate}
          >
            <input
              type="date"
              value={form.preferredDate}
              onChange={set("preferredDate")}
              onFocus={() => setFocused("preferredDate")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrap label="Insurance" required error={errors.insurance}>
          <InputBox focused={focused === "insurance"} error={errors.insurance}>
            <input
              type="text"
              placeholder="Cigna"
              value={form.insurance}
              onChange={set("insurance")}
              onFocus={() => setFocused("insurance")}
              onBlur={() => setFocused("")}
              className={inputClass}
            />
          </InputBox>
        </FieldWrap>

        <FieldWrap label="Gender" required error={errors.gender}>
          <InputBox focused={focused === "gender"} error={errors.gender}>
            <select
              value={form.gender}
              onChange={set("gender")}
              onFocus={() => setFocused("gender")}
              onBlur={() => setFocused("")}
              className={`${inputClass} appearance-none`}
              style={{ color: form.gender ? "#18120F" : "oklch(0.7 0.02 80)" }}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </InputBox>
        </FieldWrap>
      </div>

      <FieldWrap label="Date of birth" required error={errors.dob}>
        <InputBox focused={focused === "dob"} error={errors.dob}>
          <input
            type="date"
            value={form.dob}
            onChange={set("dob")}
            onFocus={() => setFocused("dob")}
            onBlur={() => setFocused("")}
            className={inputClass}
          />
        </InputBox>
      </FieldWrap>

      <div className="flex flex-col gap-3 pt-1 md:gap-3 lg:flex-row lg:items-end lg:justify-between">
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
          className="max-w-full text-[11px] leading-[1.6] lg:max-w-[185px] lg:text-right"
          style={{ color: "oklch(0.5 0.06 320 / 0.8)" }}
        >
          We&apos;ll never share your information. For non-emergency requests only.
        </p>
      </div>
    </form>
  );
}

function ContactInfoCard({ icon, label, title, meta, href, accent, bg, border }) {
  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="contact-hero-info-tab flex h-full min-h-[150px] min-w-0 flex-col rounded-[18px] p-4 transition-all duration-300 hover:-translate-y-1 sm:p-4"
      style={{
        background: bg,
        border,
        boxShadow:
          "0 2px 4px oklch(0.3 0.05 60 / 0.03), 0 8px 22px oklch(0.3 0.05 60 / 0.06)",
      }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ background: accent }}
      >
        {icon}
      </div>

      <div className="mt-4 min-w-0 flex-1">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "#6C625D" }}
        >
          {label}
        </p>

        <p
          className="mt-1 break-words text-[13px] font-semibold leading-[1.5] text-[#18120F]"
          style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
        >
          {title}
        </p>

        <p
          className="mt-1 break-words text-[11px] leading-[1.55] text-[#8A817A]"
          style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
        >
          {meta}
        </p>
      </div>
    </Link>
  );
}

function ContactHero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.set(".contact-hero-label", { opacity: 0, y: 18 });
      gsap.set(".contact-hero-heading .word", { opacity: 0, yPercent: 110 });
      gsap.set(".contact-hero-rule", { scaleX: 0, opacity: 0 });
      gsap.set(".contact-hero-sub", { opacity: 0, y: 20 });
      gsap.set(".contact-hero-info-tab", { opacity: 0, y: 18 });
      gsap.set(".contact-hero-form-wrap", { opacity: 0, y: 26, scale: 0.98 });

      const tl = gsap.timeline({
        defaults: { duration: 0.85, ease: "power4.out" },
      });

      tl.to(".contact-hero-label", { opacity: 1, y: 0 })
        .to(
          ".contact-hero-heading .word",
          { opacity: 1, yPercent: 0, stagger: 0.06, duration: 0.9 },
          "-=0.5"
        )
        .to(
          ".contact-hero-rule",
          { scaleX: 1, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .to(".contact-hero-sub", { opacity: 1, y: 0 }, "-=0.45")
        .to(
          ".contact-hero-info-tab",
          { opacity: 1, y: 0, stagger: 0.08 },
          "-=0.25"
        )
        .to(
          ".contact-hero-form-wrap",
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.45"
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FAF5F1]"
      style={{ fontFamily: "var(--font-body, 'DM Sans', system-ui, sans-serif)" }}
    >
      <GrainOverlay opacity={0.04} />
      <DotGrid color="oklch(0.55 0.06 320)" opacity={0.035} />

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
        className="pointer-events-none absolute -bottom-24 -left-28 h-[440px] w-[440px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.9 0.08 190 / 0.24), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-0 lg:py-24">
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.04fr)_minmax(380px,0.96fr)] xl:gap-12">
          <div className="min-w-0 pt-2">
            <div className="contact-hero-label mb-6 flex items-center gap-3">
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
              className="contact-hero-heading max-w-[650px] overflow-hidden leading-[1.02] tracking-[-0.035em] text-[#18120F]"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)",
                fontSize: "clamp(2.6rem, 5vw, 4.3rem)",
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
              className="contact-hero-sub mt-7 max-w-[580px] text-[15px] leading-[1.9]"
              style={{ color: "#7A7068" }}
            >
              Call us, send a message, or request an appointment online. Our team
              will help you choose the right visit and guide you every step of the
              way.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <ContactInfoCard
                href="tel:9415003100"
                label="Call us"
                title="(941) 500-3100"
                meta="Mon–Thu 8am–5pm · Fri 8am–1pm"
                accent="oklch(0.9 0.08 200 / 0.4)"
                bg="linear-gradient(135deg, oklch(0.98 0.02 90), oklch(0.94 0.04 200 / 0.65))"
                border="1px solid oklch(0.9 0.05 200 / 0.6)"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: "oklch(0.42 0.12 200)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5.25C3 4.56 3.56 4 4.25 4h2.1c.53 0 1 .37 1.12.89l.74 3.29a1.1 1.1 0 01-.55 1.22l-1.27.64a.75.75 0 00-.38.92 11.04 11.04 0 006.02 6.02.75.75 0 00.92-.38l.64-1.27a1.1 1.1 0 011.22-.55l3.29.74c.52.12.89.59.89 1.12v2.1c0 .69-.56 1.25-1.25 1.25H18C10.82 21 5 15.18 5 8V6.25C5 5.56 4.44 5 3.75 5H3z"
                    />
                  </svg>
                }
              />

              <ContactInfoCard
                href="mailto:info@womenscarebradenton.com"
                label="Email us"
                title="info@womenscarebradenton.com"
                meta="Non-urgent enquiries"
                accent="oklch(0.92 0.07 320 / 0.4)"
                bg="linear-gradient(135deg, oklch(0.98 0.02 90), oklch(0.95 0.05 330 / 0.6))"
                border="1px solid oklch(0.9 0.05 320 / 0.55)"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: "oklch(0.42 0.12 320)" }}
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 7l10 7 10-7"
                    />
                  </svg>
                }
              />

              <ContactInfoCard
                href="https://maps.app.goo.gl/fTnwRxtucZZXNYZk8"
                label="Our location"
                title="4216 Cortez Rd W, Bradenton, FL 34210"
                meta="Free parking on site"
                accent="oklch(0.92 0.08 65 / 0.35)"
                bg="linear-gradient(135deg, oklch(0.98 0.02 90), oklch(0.95 0.04 65 / 0.5))"
                border="1px solid oklch(0.9 0.04 65 / 0.5)"
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: "oklch(0.45 0.14 65)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
                    />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="contact-hero-form-wrap min-w-0 xl:pt-1">
            <div className="relative mx-auto w-full max-w-[520px] xl:ml-auto xl:mr-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-16px] rounded-[30px]"
                style={{
                  background:
                    "conic-gradient(from 210deg, oklch(0.9 0.08 200 / 0.34), transparent 30%, transparent 70%, oklch(0.9 0.08 330 / 0.32))",
                  opacity: 0.7,
                  filter: "blur(18px)",
                }}
              />

              <div
                className="relative overflow-hidden rounded-[26px] p-5 sm:p-6"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, oklch(0.97 0.04 330 / 0.82), oklch(0.97 0.03 80))",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid oklch(0.93 0.04 320 / 0.8)",
                  boxShadow:
                    "0 2px 6px oklch(0.3 0.03 60 / 0.05), 0 18px 42px oklch(0.3 0.03 60 / 0.11)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-[180px] w-[180px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.93 0.08 200 / 0.32), transparent 70%)",
                  }}
                />

                <div className="relative z-[1] mb-5">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "oklch(0.48 0.1 200)" }}
                  >
                    Request an appointment
                  </p>
                  <p
                    className="mt-1 text-[14px] leading-[1.6]"
                    style={{ color: "#7A7068" }}
                  >
                    Complete the form below and our team will review your request.
                  </p>
                </div>

                <div className="relative z-[1] min-w-0">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.set(".contact-map-copy", { x: -36, opacity: 0 });
      gsap.set(".contact-map-frame", { x: 36, opacity: 0 });

      gsap.to(".contact-map-copy", {
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
        x: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.to(".contact-map-frame", {
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
        x: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.06,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF5F1]">
      <GrainOverlay opacity={0.02} />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 md:pb-24 lg:px-0 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <div className="contact-map-copy max-w-[500px] min-w-0">
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
                Map &amp; directions
              </span>
            </div>

            <h2
              className="mt-4 leading-[1.12] tracking-[-0.02em] text-[#16100D]"
              style={{
                fontFamily: "var(--font-display, 'Playfair Display', serif)",
                fontSize: "clamp(2rem, 3vw, 2.7rem)",
              }}
            >
              Easy to reach from{" "}
              <span className="italic" style={{ color: "oklch(0.52 0.12 65)" }}>
                wherever you are.
              </span>
            </h2>

            <p
              className="mt-5 text-[14.5px] leading-[1.9]"
              style={{ color: "#7A7068" }}
            >
              Women&apos;s Care of Bradenton is centrally located on Cortez Road
              West, minutes from US-41 and just a short drive from downtown
              Bradenton, Sarasota, and the Gulf beaches.
            </p>

            <ul
              className="mt-6 space-y-2 text-[13.5px]"
              style={{ color: "#7A7068" }}
            >
              {[
                "Free on-site parking",
                "Ground floor access",
                "Wheelchair accessible entrance",
                "Pharmacy and labs nearby",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "oklch(0.55 0.12 150)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="https://maps.app.goo.gl/fTnwRxtucZZXNYZk8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 hover:brightness-110"
              style={{
                background: "oklch(0.42 0.12 320)",
                color: "#fff",
                boxShadow: "0 4px 14px oklch(0.42 0.12 320 / 0.28)",
              }}
            >
              Get directions
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
                  d="M7 17L17 7m0 0H9m8 0v8"
                />
              </svg>
            </Link>
          </div>

          <div className="contact-map-frame min-w-0">
            <div
              className="overflow-hidden rounded-[28px]"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.2 0.05 220 / 0.8), oklch(0.25 0.08 260))",
                boxShadow:
                  "0 6px 18px oklch(0.3 0.04 60 / 0.16), 0 24px 60px oklch(0.3 0.04 60 / 0.18)",
              }}
            >
              <div className="aspect-[1.35/1] w-full">
                <iframe
                  title="Women's Care of Bradenton location"
                  src="https://maps.google.com/maps?q=4216+Cortez+Rd+W,+Bradenton,+FL+34210&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main style={{ fontFamily: "var(--font-body, 'DM Sans', system-ui, sans-serif)" }}>
      <ContactHero />
      <MapSection />
    </main>
  );
}