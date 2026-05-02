"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { blogs, categories } from "@/lib/blogs";

gsap.registerPlugin(ScrollTrigger);

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const categoryColors = {
  "Aesthetics":       { bg: "oklch(0.95 0.04 300 / 0.5)", text: "oklch(0.38 0.14 300)" },
  "Skin Care":        { bg: "oklch(0.95 0.04 150 / 0.5)", text: "oklch(0.38 0.14 150)" },
  "Hair Removal":     { bg: "oklch(0.95 0.04 220 / 0.5)", text: "oklch(0.38 0.14 220)" },
  "Women's Health":   { bg: "oklch(0.95 0.04 340 / 0.5)", text: "oklch(0.42 0.12 320)" },
  "Preventive Care":  { bg: "oklch(0.95 0.04 60  / 0.5)", text: "oklch(0.42 0.10 60)"  },
  "Obstetrics":       { bg: "oklch(0.95 0.04 20  / 0.5)", text: "oklch(0.42 0.12 20)"  },
};

function CategoryBadge({ cat }) {
  const c = categoryColors[cat] ?? { bg: "oklch(0.93 0.02 60 / 0.5)", text: "oklch(0.42 0.06 60)" };
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.text}22` }}
    >
      {cat}
    </span>
  );
}

function BlogCard({ blog, featured = false }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`blog-card group relative flex flex-col overflow-hidden rounded-[20px] transition-all duration-500 hover:-translate-y-1.5 ${
        featured ? "md:col-span-2 md:flex-row md:items-stretch" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.68)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid oklch(0.88 0.04 320 / 0.22)",
        boxShadow:
          "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 8px 28px oklch(0.3 0.06 320 / 0.07)",
      }}
    >
      {/* Image area */}
      <div
        className={`relative shrink-0 overflow-hidden ${
          featured ? "h-48 md:h-auto md:w-[44%]" : "h-44"
        }`}
        style={{
          borderRadius: featured ? "20px 0 0 20px" : "20px 20px 0 0",
          background:
            "linear-gradient(135deg, oklch(0.9 0.04 340 / 0.5), oklch(0.93 0.03 60 / 0.35))",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: grain, backgroundSize: "180px 180px" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="select-none text-[5rem] font-bold leading-none opacity-[0.08]"
            style={{
              fontFamily: "var(--font-display,'Playfair Display',serif)",
              color: "oklch(0.42 0.12 320)",
            }}
          >
            {blog.title.charAt(0)}
          </span>
        </div>
        <div className="absolute left-3 top-3">
          <CategoryBadge cat={blog.category} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div
          className="mb-3 flex items-center gap-2 text-[11px]"
          style={{ color: "oklch(0.55 0.06 320 / 0.7)" }}
        >
          <span>{blog.date}</span>
          <span
            className="h-[3px] w-[3px] rounded-full"
            style={{ background: "oklch(0.7 0.05 320 / 0.5)" }}
          />
          <span>{blog.readTime}</span>
        </div>

        <h2
          className={`mb-3 leading-[1.12] tracking-[-0.018em] text-[#16100D] transition-colors duration-300 group-hover:text-[oklch(0.42_0.12_320)] ${
            featured ? "text-[1.4rem] sm:text-[1.6rem]" : "text-[1.1rem] sm:text-[1.2rem]"
          }`}
          style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}
        >
          {blog.title}
        </h2>

        <p
          className="mb-5 flex-1 text-[13.5px] leading-[1.82]"
          style={{ color: "#8A817A" }}
        >
          {blog.excerpt}
        </p>

        <div
          className="mt-auto flex items-center gap-1.5 text-[12.5px] font-semibold transition-all duration-300 group-hover:gap-2.5"
          style={{ color: "oklch(0.42 0.12 320)" }}
        >
          Read article
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const heroAnimated = useRef(false); // ← prevents hero re-animating on filter change
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  // ── Hero entrance — runs ONCE only ──────────────────────────────────────
  useLayoutEffect(() => {
    if (heroAnimated.current || typeof window === "undefined") return;
    heroAnimated.current = true;

    const ctx = gsap.context(() => {
      // Set initial states explicitly before animating
      gsap.set(".bh-eyebrow-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".bh-eyebrow-text", { opacity: 0, x: -8 });
      gsap.set(".bh-word",         { yPercent: 110, opacity: 0 });
      gsap.set(".bh-sub",          { opacity: 0, y: 14 });
      gsap.set(".bh-filters",      { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      tl.to(".bh-eyebrow-line",  { scaleX: 1, duration: 0.55 })
        .to(".bh-eyebrow-text",  { opacity: 1, x: 0, duration: 0.4 }, "-=0.25")
        .to(".bh-word",          { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.75 }, "-=0.2")
        .to(".bh-sub",           { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(".bh-filters",       { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");
    }, heroRef);

    return () => ctx.revert();
  }, []); // empty dep — hero animates only on mount

  // ── Cards scroll reveal — re-runs when filter changes ───────────────────
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Kill any previous ScrollTrigger instances scoped to the grid
    ScrollTrigger.getAll()
      .filter((st) => st.vars?.id === "blog-cards")
      .forEach((st) => st.kill());

    // Set cards invisible immediately so they can animate in
    gsap.set(".blog-card", { y: 24, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(".blog-card", {
        scrollTrigger: {
          id: "blog-cards",
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, gridRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.vars?.id === "blog-cards")
        .forEach((st) => st.kill());
    };
  }, [filtered]); // re-run when filtered list changes

  return (
    <main style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#FAF5F1]">
        {/* Grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.038]"
          style={{ backgroundImage: grain, backgroundSize: "200px 200px" }}
        />
        {/* Ambient blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, oklch(0.9 0.045 340 / 0.36) 0%, transparent 62%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, oklch(0.94 0.03 60 / 0.22) 0%, transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 md:pb-20 md:pt-28 lg:px-0">

          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span
              className="bh-eyebrow-line block h-[2px] w-8 rounded-full"
              style={{ background: "oklch(0.45 0.12 320)" }}
            />
            <span
              className="bh-eyebrow-text text-[10.5px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "oklch(0.42 0.12 320)" }}
            >
              Journal &amp; Insights
            </span>
          </div>

          {/* Heading — each word is a separate span for GSAP word reveal */}
          <h1
            className="mb-6 max-w-2xl"
            style={{
              fontFamily: "var(--font-display,'Playfair Display',serif)",
              fontSize: "clamp(2.6rem,5.5vw,4.2rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.028em",
              color: "#18120F",
            }}
          >
            {/* Each line is overflow-hidden to clip the yPercent slide-up */}
            {[
              ["Stories,"],
              ["guidance", "&"],
              ["expert", "insights."],
            ].map((lineWords, li) => (
              <span key={li} className="block overflow-hidden leading-[1.08]">
                {lineWords.map((w, wi) => (
                  <span key={wi} className="bh-word mr-[0.22em] inline-block">
                    {w}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="bh-sub mb-10 max-w-[440px] text-[15px] leading-[1.82]"
            style={{ color: "#7A7068" }}
          >
            Evidence-based articles from Dr. Jothivijayarani and our Women&apos;s Care
            team — written for women at every stage of life.
          </p>

          {/* Filter pills */}
          <div className="bh-filters flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                  style={
                    active
                      ? {
                          background: "oklch(0.42 0.12 320)",
                          color: "#fff",
                          boxShadow: "0 2px 12px oklch(0.42 0.12 320 / 0.3)",
                        }
                      : {
                          background: "rgba(255,255,255,0.65)",
                          color: "oklch(0.45 0.08 320)",
                          border: "1px solid oklch(0.88 0.04 320 / 0.28)",
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="mt-10 h-px"
            style={{
              background:
                "linear-gradient(to right, oklch(0.75 0.08 320 / 0.2), oklch(0.9 0.03 60 / 0.15), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── Grid ── */}
      <section ref={gridRef} className="relative overflow-hidden bg-[#FAF5F1]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: grain, backgroundSize: "200px 200px" }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-12 sm:px-8 md:pb-32 lg:px-0">
          {filtered.length === 0 ? (
            <p
              className="py-20 text-center text-[15px]"
              style={{ color: "#9A9490" }}
            >
              No articles in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((blog, i) => (
                <BlogCard
                  key={blog.slug}
                  blog={blog}
                  featured={i === 0 && activeCategory === "All"}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "oklch(0.92 0.05 330 / 0.35)",
          borderTop: "1px solid oklch(0.86 0.05 330 / 0.2)",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-16 text-center sm:px-8 lg:px-0">
          <h2
            className="text-[1.6rem] leading-snug tracking-[-0.02em] text-[#16100D]"
            style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}
          >
            Have a question not answered here?
          </h2>
          <p
            className="max-w-md text-[14px] leading-[1.82]"
            style={{ color: "#7A7068" }}
          >
            Our team is always here. Schedule a consultation and speak directly
            with Dr. Jothivijayarani.
          </p>
          <a
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={{
              background: "oklch(0.42 0.12 320)",
              boxShadow: "0 4px 16px oklch(0.42 0.12 320 / 0.3)",
            }}
          >
            Book an appointment
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}