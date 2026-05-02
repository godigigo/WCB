"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

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
  const line   = light ? "oklch(1 0 0 / 0.3)"   : "oklch(0.55 0.1 320 / 0.4)";
  return (
    <div className="inline-flex items-center gap-3">
      <div className="h-px w-7 rounded-full" style={{ background: line }} />
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
        {children}
      </span>
      <div className="h-px w-7 rounded-full" style={{ background: line }} />
    </div>
  );
}

/* ─── Team data (every detail from your existing site) ──────────────────── */
const MEMBERS = [
  {
    id: "dr-jothi",
    name: "Dr. Arunachalam Jothivijayarani",
    nameShort: "Dr. Jothivijayarani",
    role: "Founder & Lead Physician",
    credentials: "MD — Double Board Certified, Family Practice & OB/GYN",
    image: "/team/team-1.jpg",
    highlights: [
      "University of Iowa Medical School",
      "Doctor of the Year — Blake Medical Center 2017",
      "Sarasota Top Doctors Award (annually since 2008)",
      "Highly rated Robotic Surgeon, Bradenton/Sarasota area",
      "Member, American College of Obstetrics & Gynecology",
      "Hospital privileges at 5 Bradenton & Sarasota facilities",
    ],
    bio: [
      "Dr. A. Jothivijayarani, the founder of Womens Care of Bradenton in Bradenton, Florida, has been working in private practice for over thirty years. Dr. Jothi attended the University of Iowa Medical School, where she earned double board certifications in Family Practice and Gynecology. Her residency concentrated on infertility and gynecologic procedures, each under the guidance of renowned specialists. During her residency, she won the prestigious \"Above and Beyond\" award for her outstanding patient care.",
      "Dr. Jothi holds hospital staff privileges at Blake Medical Center, Manatee Memorial Hospital, Lakewood Ranch Medical Center, Doctors Hospital of Sarasota, and Sarasota Memorial Hospital. She specializes in high risk OB, advanced laparoscopic surgeries, and hysterectomies for the treatment of fibroids, pelvic pain, endometriosis, and ovarian masses. She is a member of the American College of Obstetrics and Gynecology. Additionally, she has professional certifications from the International Society of Cosmetogynecology and the Center for Mind-Body Medicine.",
      "Dr. Jothi is one of the highly rated Robotic Surgeons in the Bradenton/Sarasota area. Each year, she has been awarded the Sarasota Top Doctors Award in addition to being a recipient of the highly coveted Doctor of the Year 2017 award from Blake Medical Center. Dr. Jothi's vision is to provide compassionate and personal care to women of all ages. She believes in empowering her patients with the knowledge and tools to make the most informed decisions for themselves in their health journeys.",
      "When asked what she considers her greatest professional accomplishment, Dr. Jothi answers: it is passionately taking care of multiple generations of women within the same family. Her drive and commitment to the field of OB/GYN extend beyond her practice, as she actively participates in mentoring programs for both young women and youth interested in pursuing health care professions.",
      "Dr. Jothi resides in Bradenton with her husband and has two children who are currently attending college. In her free time, she finds herself reading, traveling, doing yoga and spending time with family and friends.",
    ],
    reviews: [
      {
        text: "Dr. Jothi is absolutely AMAZING! I could have her as my primary physician as well. I'd absolutely do it! She truly cares about people and you're not just a number. Hands down BEST DOCTOR EVER!",
        author: "",
      },
      {
        text: "Dr. Jothi and her staff are wonderful. I have been her patient for the last six years and she is one of a few doctors I trust with my life. I highly recommend her as she has excellent patient care.",
        author: "",
      },
    ],
  },
  {
    id: "katelin-schulte",
    name: "Katelin Schulte, APRN",
    nameShort: "Katelin Schulte",
    role: "Advanced Practice Registered Nurse",
    credentials: "APRN — University of St. Francis, Joliet IL",
    image: "/team/team-2.jpg",
    highlights: [
      "Master of Science — University of St. Francis, Joliet, IL",
      "Comprehensive OB/GYN clinical experience",
      "Evidence-based practice advocate",
      "Culturally competent care for diverse populations",
      "Patient education & quality improvement focus",
    ],
    bio: [
      "Katelin Schulte is a Compassionate Family Nurse Practitioner with comprehensive OB/GYN experience dedicated to evidence-based practice and providing culturally competent care to diverse populations. She completed her Master of Science degree at the University of St. Francis in Joliet, Illinois. She is passionate about quality improvement projects and patient education to teach patients how to develop healthy lifestyles to promote well-being and prevent disease.",
      "In her free time, she enjoys spending time with her husband, children, and beloved pets.",
    ],
    reviews: [],
  },
  {
    id: "gail-shafran",
    name: "Gail Shafran MSN FNP-BC, NP",
    nameShort: "Gail Shafran",
    role: "Nurse Practitioner",
    credentials: "MSN FNP-BC, NP",
    image: "/team/team-3.jpg",
    highlights: [
      "MSN — Family Nurse Practitioner, Board Certified",
      "Nurse Practitioner, Bradenton, FL",
      "Currently accepting new patients",
    ],
    bio: [
      "Gail Shafran, FNP works in Bradenton, FL as a Nurse Practitioner. The office is accepting new patients.",
    ],
    reviews: [],
  },
  {
    id: "kandyce-lopez",
    name: "Kandyce Lopez, PA",
    nameShort: "Kandyce Lopez",
    role: "Physician Associate",
    credentials: "PA — University of Central Florida & Barry University",
    image: "/team/team-4.jpg",
    highlights: [
      "BS Health Sciences — University of Central Florida",
      "MS Clinical Medical Science — Barry University",
      "Member, Association of Physician Associates in OB/GYN",
      "Bilingual — English & Spanish",
      "Specialises in women's care & reproductive health",
    ],
    bio: [
      "Kandyce is our certified physician associate. She holds a Bachelor of Science in Health Sciences from the University of Central Florida and a Masters of Clinical Medical Science degree from Barry University. She is a member of the Association of Physician Associates in Obstetrics and Gynecology.",
      "As a Cuban American bilingual Spanish-speaking provider, Kandyce specialises in women's care and reproductive health. She is compassionate and prioritises preventative medicine while aiming to treat the body as a whole. Her objective is to involve you as an active participant in your wellness journey while delivering exceptional care.",
      "In her free time, Kandyce cherishes moments with her family, friends and pets here in Florida. When she's not at the beach, she's training for a run, attending church service or taking long walks with her DSLR camera.",
    ],
    reviews: [],
  },
];

const SHARED_REVIEWS = [
  {
    text: "I felt that it is a very comfortable place and feel that questions were answered and that everyone was very professional. Did not see DR JOTHI this visit but felt that I was well taken care of.",
    author: "Jody H.",
  },
  {
    text: "I felt the staff really took the time to listen to my concerns and develop a plan. Great first ob gyn experience.",
    author: "Patricia D.",
  },
  {
    text: "She was sweet and took her time discussing treatment ideas.",
    author: "Shawna P.",
  },
  {
    text: "Didn't have a long wait, saw the PA and she was great. New patient I was, although I have known Dr for a few years. Lovely office and great visit.",
    author: "Kathleen C.",
  },
];

/* ─── Smooth scroll helper ──────────────────────────────────────────────── */
// ↓ CHANGE 2: smooth scroll handler — replaces default anchor jump
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80; // 80px nav offset
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function TeamHero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.set([".th-eyebrow", ".th-word", ".th-sub", ".th-pill"], {
        opacity: 1,
        y: 0,
        clearProps: "all",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".th-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(".th-word",    { opacity: 0, y: "110%", stagger: 0.06, duration: 0.75, immediateRender: false }, "-=0.3")
        .from(".th-sub",     { opacity: 0, y: 16, duration: 0.6, immediateRender: false }, "-=0.4")
        .from(".th-pill",    { opacity: 0, y: 12, stagger: 0.07, duration: 0.5, immediateRender: false, clearProps: "opacity,transform" }, "-=0.38");
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#FAF5F1", display: "flex", alignItems: "center", minHeight: "60vh" }}
    >
      <Grain op={0.04} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[720px] w-[720px] rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%, oklch(0.9 0.045 340 / 0.35) 0%, transparent 60%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-28 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle at 60% 60%, oklch(0.93 0.03 60 / 0.22) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-28 lg:px-0 lg:py-32">
        <div className="th-eyebrow mb-6 text-center">
          <Eyebrow>Women&apos;s Care of Bradenton</Eyebrow>
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
          {["Meet our", "expert team."].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split(" ").map((w, wi) => (
                <span key={wi} className="th-word mr-[0.22em] inline-block">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="th-sub mx-auto mb-10 max-w-[500px] text-center leading-[1.85]"
          style={{ color: "#7A7068", fontSize: "clamp(0.9rem,1.1vw,1rem)" }}
        >
          Four experienced clinicians united by a single commitment — compassionate,
          expert women&apos;s healthcare in Bradenton, FL.
        </p>

        {/* ↓ CHANGE 1: Quick-nav pills — richer highlighted style + CHANGE 2: smooth scroll onClick */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {MEMBERS.map((m) => (
            <button
              key={m.id}
              onClick={() => smoothScrollTo(m.id)}
              className="th-pill group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                // ↓ CHANGE 1: warm rose-mauve tinted fill — makes pills feel highlighted
                background: "oklch(0.91 0.055 330 / 0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid oklch(0.72 0.12 320 / 0.35)",
                color: "oklch(0.34 0.14 322)",
                boxShadow:
                  "0 1px 3px oklch(0.55 0.12 320 / 0.12), 0 4px 14px oklch(0.55 0.12 320 / 0.1)",
                opacity: 1,
              }}
            >
              <div
                className="h-5 w-5 shrink-0 overflow-hidden rounded-full"
                style={{ border: "1.5px solid oklch(0.7 0.1 320 / 0.45)" }}
              >
                <Image src={m.image} alt="" width={20} height={20} className="object-cover" />
              </div>
              {m.nameShort}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Single member section ─────────────────────────────────────────────── */
function MemberSection({ member, index }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const isDark = index % 2 !== 0;
  const bioToShow = expanded ? member.bio : member.bio.slice(0, 2);
  const hasMore = member.bio.length > 2;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".ms-left",  {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        x: -45, opacity: 0, duration: 1.0, ease: "power3.out",
      });
      gsap.from(".ms-right", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        x:  45, opacity: 0, duration: 1.0, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".ms-hl", {
        scrollTrigger: { trigger: ref.current, start: "top 68%" },
        y: 14, opacity: 0, duration: 0.65, ease: "power3.out", stagger: 0.08, delay: 0.2,
      });
      gsap.from(".ms-rv", {
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
        y: 18, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.22,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const bg          = isDark ? "#2A1E2A" : "#FAF5F1";
  const textPrimary = isDark ? "#EDE6E0" : "#16100D";
  const textMuted   = isDark ? "oklch(1 0 0 / 0.55)" : "#7A7068";
  const cardBg      = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.74)";
  const cardBorder  = isDark
    ? "1px solid oklch(1 0 0 / 0.1)"
    : "1px solid oklch(0.84 0.05 320 / 0.22)";

  return (
    <section
      ref={ref}
      id={member.id}
      className="relative w-full overflow-hidden"
      style={{ background: bg, scrollMarginTop: "5rem" }}
    >
      <Grain op={isDark ? 0.045 : 0.028} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${
            isDark ? "oklch(0.88 0.06 320 / 0.07)" : "oklch(0.9 0.045 340 / 0.28)"
          } 0%, transparent 60%)`,
        }}
      />
      {isDark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.05,
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24 lg:px-0 lg:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start md:gap-16">

          {/* LEFT — portrait + highlights */}
          <div className="ms-left flex flex-col items-start">
            <div className="relative w-full max-w-[400px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-16px] rounded-[2rem]"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, ${
                    isDark ? "oklch(0.72 0.12 320 / 0.18)" : "oklch(0.87 0.07 330 / 0.22)"
                  } 0%, transparent 65%)`,
                  filter: "blur(18px)",
                }}
              />

              <div
                className="relative w-full overflow-hidden"
                style={{
                  borderRadius: "1.75rem 4.5rem 1.75rem 1.75rem",
                  aspectRatio: "4/5",
                  boxShadow: isDark
                    ? "0 4px 8px oklch(0 0 0 / 0.22), 0 24px 60px oklch(0 0 0 / 0.38)"
                    : "0 4px 8px oklch(0.2 0.03 60 / 0.06), 0 20px 52px oklch(0.2 0.03 60 / 0.13)",
                }}
              >
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 42vw, 90vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32"
                  style={{
                    background: `linear-gradient(to top, ${
                      isDark ? "oklch(0.2 0.06 320 / 0.55)" : "oklch(0.18 0.04 320 / 0.42)"
                    } 0%, transparent 100%)`,
                  }}
                />
              </div>

              <div
                className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-1.5"
                style={{
                  background: isDark ? "rgba(42,30,42,0.92)" : "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: `1px solid ${
                    isDark ? "oklch(1 0 0 / 0.12)" : "oklch(0.84 0.06 320 / 0.4)"
                  }`,
                  boxShadow: "0 4px 16px oklch(0.2 0.02 60 / 0.1)",
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.58 0.12 320)" }} />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: isDark ? "oklch(0.88 0.06 320)" : "oklch(0.38 0.12 322)" }}
                >
                  {member.role}
                </span>
              </div>
            </div>

            {member.highlights.length > 0 && (
              <ul className="mt-10 flex w-full max-w-[400px] flex-col gap-2.5">
                {member.highlights.map((h, i) => (
                  <li key={i} className="ms-hl flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: isDark ? "oklch(0.7 0.14 150)" : "oklch(0.44 0.14 150)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-[13.5px] leading-snug" style={{ color: textMuted }}>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT — bio + reviews */}
          <div className="ms-right flex flex-col">
            <div className="mb-4"><Eyebrow light={isDark}>{member.role}</Eyebrow></div>

            <h2
              className="mb-2 leading-[1.04] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-display,'Playfair Display',Georgia,serif)",
                fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
                color: textPrimary,
              }}
            >
              {member.name}
            </h2>

            <div className="mb-6">
              <span
                className="inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{
                  background: isDark
                    ? "oklch(0.88 0.06 320 / 0.12)"
                    : "oklch(0.93 0.05 330 / 0.55)",
                  color: isDark ? "oklch(0.88 0.07 320)" : "oklch(0.42 0.12 322)",
                  border: `1px solid ${
                    isDark ? "oklch(0.75 0.1 320 / 0.2)" : "oklch(0.82 0.07 330 / 0.3)"
                  }`,
                }}
              >
                {member.credentials}
              </span>
            </div>

            <div className="mb-7 flex items-center gap-2">
              <div
                className="h-[2px] w-12 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${
                    isDark ? "oklch(0.72 0.12 320)" : "oklch(0.48 0.13 322)"
                  }, transparent)`,
                }}
              />
              <div
                className="h-[2px] w-5 rounded-full"
                style={{
                  background: isDark ? "oklch(0.65 0.09 320 / 0.4)" : "oklch(0.8 0.07 340 / 0.35)",
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              {bioToShow.map((para, i) => (
                <p key={i} className="text-[14.5px] leading-[1.9]" style={{ color: textMuted }}>
                  {para}
                </p>
              ))}
            </div>

            {hasMore && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="mt-5 inline-flex items-center gap-2 self-start text-[12.5px] font-semibold transition-all duration-200"
                style={{ color: isDark ? "oklch(0.82 0.08 320)" : "oklch(0.44 0.12 320)" }}
              >
                {expanded ? "Show less" : "Read full bio"}
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {member.reviews.length > 0 && (
              <div className="mt-10 flex flex-col gap-4">
                <p
                  className="text-[10.5px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: isDark ? "oklch(1 0 0 / 0.35)" : "oklch(0.5 0.08 320 / 0.5)" }}
                >
                  Patient reviews
                </p>
                {member.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="ms-rv rounded-2xl p-5"
                    style={{
                      background: cardBg,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: cardBorder,
                      boxShadow: "0 2px 8px oklch(0.2 0.02 60 / 0.06)",
                    }}
                  >
                    <svg
                      className="mb-3 h-5 w-5 opacity-25"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: isDark ? "white" : "oklch(0.5 0.1 320)" }}
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-[13.5px] italic leading-[1.8]" style={{ color: textMuted }}>
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-16 h-px w-full"
          style={{
            background: isDark
              ? "linear-gradient(to right, transparent, oklch(1 0 0 / 0.1), transparent)"
              : "linear-gradient(to right, transparent, oklch(0.7 0.08 320 / 0.18), transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* ─── Shared patient reviews ────────────────────────────────────────────── */
function ReviewsSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".rv-ew", {
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
        y: 14, opacity: 0, duration: 0.5,
      });
      gsap.from(".rv-hd", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 24, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.07,
      });
      gsap.from(".rv-cd", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.1,
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
        <div className="rv-ew mb-5 text-center"><Eyebrow>Patient feedback</Eyebrow></div>
        <h2
          className="rv-hd mx-auto mb-14 max-w-lg text-center leading-[1.05] tracking-[-0.025em]"
          style={{
            fontFamily: "var(--font-display,'Playfair Display',serif)",
            fontSize: "clamp(2rem,3.8vw,2.9rem)",
            color: "#16100D",
          }}
        >
          Hear it from our{" "}
          <span className="italic" style={{ color: "oklch(0.44 0.1 55)" }}>patients.</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHARED_REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rv-cd flex flex-col rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.76)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid oklch(0.84 0.05 320 / 0.2)",
                boxShadow:
                  "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 8px 24px oklch(0.3 0.06 320 / 0.05)",
              }}
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: "oklch(0.7 0.16 80)" }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 text-[13.5px] italic leading-[1.85]" style={{ color: "#7A7068" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              {r.author && (
                <p className="mt-4 text-[12px] font-semibold" style={{ color: "oklch(0.42 0.12 320)" }}>
                  — {r.author}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────────────── */
function CTASection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-in", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#2A1E2A", borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
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
        className="pointer-events-none absolute -right-32 -top-32 h-[540px] w-[540px] rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%, oklch(0.82 0.1 320 / 0.1) 0%, transparent 60%)" }}
      />

      <div className="cta-in relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-5 py-24 text-center sm:px-8 md:py-28">
        <div className="mb-1"><Eyebrow light>Ready to begin?</Eyebrow></div>
        <h2
          className="leading-[1.05] tracking-[-0.025em] text-white"
          style={{
            fontFamily: "var(--font-display,'Playfair Display',serif)",
            fontSize: "clamp(2rem,4vw,3.2rem)",
          }}
        >
          Take charge of your{" "}
          <span className="italic" style={{ color: "oklch(0.82 0.09 320)" }}>health today.</span>
        </h2>
        <p className="max-w-[420px] text-[15px] leading-[1.85]" style={{ color: "oklch(1 0 0 / 0.55)" }}>
          Schedule an appointment with our expert, compassionate team in Bradenton, FL.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href="/book-appointment">Book an appointment</Button>
          <Button variant="outline" href="tel:9415003100">Call (941) 500-3100</Button>
        </div>
        <p className="mt-1 text-[11.5px]" style={{ color: "oklch(1 0 0 / 0.35)" }}>
          4216 Cortez Rd W, Bradenton, FL 34210 · Mon–Thu 8am–5pm · Fri 8am–1pm
        </p>
      </div>
    </section>
  );
}

/* ─── Page export ───────────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <main style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
      <TeamHero />
      {MEMBERS.map((member, index) => (
        <MemberSection key={member.id} member={member} index={index} />
      ))}
      <ReviewsSection />
      <CTASection />
    </main>
  );
}