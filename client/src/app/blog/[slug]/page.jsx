"use client";

import { useLayoutEffect, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { blogs } from "@/lib/blogs";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function BlogPost() {
  const { slug } = useParams();                                    // ← fix 1: useParams() not params prop
  const blog     = blogs.find((b) => b.slug === slug);
  const heroRef  = useRef(null);
  const bodyRef  = useRef(null);

  // Hero animation
  useLayoutEffect(() => {
    if (!blog || typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".ph-back",  { opacity: 0, x: -12, duration: 0.4 })
        .from(".ph-label", { opacity: 0, x: -10, duration: 0.4 }, "-=0.2")
        .from(".ph-word",  { y: "100%", opacity: 0, stagger: 0.055, duration: 0.8 }, "-=0.2")
        .from(".ph-meta",  { opacity: 0, y: 12, duration: 0.5 }, "-=0.4")
        .from(".ph-intro", { opacity: 0, y: 18, duration: 0.65 }, "-=0.35");
    }, heroRef);
    return () => ctx.revert();
  }, [blog]);

  // Body sections reveal
  useLayoutEffect(() => {
    if (!blog || typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".ps-section", {
        scrollTrigger: { trigger: bodyRef.current, start: "top 80%" },
        y: 22, opacity: 0, stagger: 0.13, duration: 0.75, ease: "power3.out",
      });
      gsap.from(".ps-related-card", {
        scrollTrigger: { trigger: ".ps-related", start: "top 82%" },
        y: 20, opacity: 0, stagger: 0.12, duration: 0.65, ease: "power3.out",
      });
    }, bodyRef);
    return () => ctx.revert();
  }, [blog]);

  // fix 2: guard render instead of calling notFound() directly
  if (!blog) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FAF5F1]"
        style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "oklch(0.48 0.1 320)" }}>404</p>
        <h1 className="mb-4 text-[2rem] font-semibold text-[#18120F]"
          style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
          Article not found
        </h1>
        <Link href="/blog"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold text-white"
          style={{ background: "oklch(0.42 0.12 320)" }}>
          ← Back to all articles
        </Link>
      </main>
    );
  }

  const related = blogs
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 2);

  const words = blog.title.split(" ");

  return (
    <main style={{ fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#FAF5F1]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.038]"
          style={{ backgroundImage: grain, backgroundSize: "200px 200px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle at 35% 35%, oklch(0.9 0.045 340 / 0.34) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-20 sm:px-8 md:pb-18 md:pt-24 lg:px-0">

          {/* Back link */}
          <Link href="/blog"
            className="ph-back mb-8 inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:gap-3"
            style={{ color: "oklch(0.48 0.1 320)" }}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            All articles
          </Link>

          {/* Label row */}
          <div className="ph-label mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ background: "oklch(0.93 0.05 330 / 0.6)", color: "oklch(0.42 0.12 320)", border: "1px solid oklch(0.84 0.06 330 / 0.3)" }}>
              {blog.category}
            </span>
            <span className="h-[3px] w-[3px] rounded-full" style={{ background: "oklch(0.7 0.05 320 / 0.4)" }} />
            <span className="text-[11px]" style={{ color: "oklch(0.52 0.07 320 / 0.65)" }}>{blog.readTime}</span>
          </div>

          {/* Heading */}
          <h1 className="overflow-hidden font-display"
            style={{ fontFamily: "var(--font-display,'Playfair Display',serif)", fontSize: "clamp(2rem,4.5vw,3.2rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#18120F" }}>
            <span className="block overflow-hidden">
              {words.map((w, wi) => (
                <span key={wi} className="ph-word mr-[0.22em] inline-block">{w}</span>
              ))}
            </span>
          </h1>

          {/* Meta */}
          <div className="ph-meta mt-5 flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: "oklch(0.92 0.05 330 / 0.7)", color: "oklch(0.42 0.12 320)" }}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#18120F]">Dr. Arunachalam Jothivijayarani</p>
              <p className="text-[11.5px]" style={{ color: "#9A9490" }}>{blog.date}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px"
            style={{ background: "linear-gradient(to right, oklch(0.75 0.08 320 / 0.22), transparent)" }} />

          {/* Intro */}
          <p className="ph-intro mt-8 text-[16px] font-medium leading-[1.88]" style={{ color: "#4A4340" }}>
            {blog.content.intro}
          </p>
        </div>
      </section>

      {/* ── Article body ── */}
      <section ref={bodyRef} className="relative overflow-hidden bg-[#FAF5F1]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: grain, backgroundSize: "200px 200px" }} />

        <div className="relative mx-auto max-w-3xl px-5 pb-24 pt-6 sm:px-8 lg:px-0">

          {blog.content.sections.map((sec, i) => (
            <div key={i} className="ps-section mb-12">
              <div className="mb-4 flex items-start gap-4">
                <div className="mt-1.5 h-5 w-[3px] shrink-0 rounded-full"
                  style={{ background: "linear-gradient(to bottom, oklch(0.55 0.12 320), oklch(0.78 0.07 340 / 0.3))" }} />
                <h2 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-[#16100D]"
                  style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
                  {sec.heading}
                </h2>
              </div>
              <p className="pl-7 text-[15px] leading-[1.9]" style={{ color: "#706660" }}>
                {sec.body}
              </p>
            </div>
          ))}

          {/* CTA card */}
          <div className="mt-8 rounded-[20px] p-7"
            style={{ background: "linear-gradient(135deg, oklch(0.93 0.05 330 / 0.5) 0%, oklch(0.96 0.03 60 / 0.35) 100%)", border: "1px solid oklch(0.88 0.04 320 / 0.28)" }}>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "oklch(0.48 0.1 320)" }}>Have questions?</p>
            <h3 className="font-display mb-3 text-[1.15rem] font-semibold leading-snug text-[#16100D]"
              style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
              Our team is ready to help you.
            </h3>
            <p className="mb-5 text-[13.5px] leading-[1.8]" style={{ color: "#8A817A" }}>
              Every woman deserves personalised, compassionate care. Schedule a consultation and let us guide you.
            </p>
            <Button variant="primary" href="/contact">Book an appointment</Button>
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="ps-related relative overflow-hidden bg-[#FAF5F1]"
          style={{ borderTop: "1px solid oklch(0.88 0.03 60 / 0.3)" }}>
          <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-0">
            <div className="mb-7 flex items-center gap-3">
              <div className="h-[2px] w-6 rounded-full" style={{ background: "oklch(0.55 0.1 320 / 0.5)" }} />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "oklch(0.45 0.1 320)" }}>Related articles</span>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {related.map((b) => (
                <Link key={b.slug} href={`/blog/${b.slug}`}
                  className="ps-related-card group flex flex-col overflow-hidden rounded-[18px] transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid oklch(0.88 0.04 320 / 0.2)", boxShadow: "0 2px 8px oklch(0.3 0.06 320 / 0.05)" }}>
                  <div className="h-28 w-full"
                    style={{ background: "linear-gradient(135deg, oklch(0.9 0.04 340 / 0.4), oklch(0.93 0.03 60 / 0.3))", borderRadius: "18px 18px 0 0" }} />
                  <div className="p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "oklch(0.5 0.1 320 / 0.6)" }}>{b.category} · {b.readTime}</p>
                    <h3 className="font-display text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-[#16100D] transition-colors duration-300 group-hover:text-[oklch(0.42_0.12_320)]"
                      style={{ fontFamily: "var(--font-display,'Playfair Display',serif)" }}>
                      {b.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-1 text-[11.5px] font-semibold transition-all duration-300 group-hover:gap-2"
                      style={{ color: "oklch(0.42 0.12 320)" }}>
                      Read
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}