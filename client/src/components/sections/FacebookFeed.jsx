"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const posts = [
  { id: 1, href: "https://www.facebook.com/reel/896332336795043" },
  { id: 2, href: "https://www.facebook.com/reel/3900003103640485" },
  { id: 3, href: "https://www.facebook.com/reel/812397998599756" },
  { id: 4, href: "https://www.facebook.com/reel/844748464565248" },
  { id: 5, href: "https://www.facebook.com/reel/1677335790132304" },
  { id: 6, href: "https://www.facebook.com/reel/1300422035343498" },
];

const CARD_W = 320;
const CARD_H = 568;
const CARD_GAP = 20;

function EmbedCard({ href }) {
  const encodedUrl = encodeURIComponent(href);
  const embedSrc = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=${CARD_W}&height=${CARD_H}&appId`;

  return (
    <div
      className="fb-post-card group relative shrink-0 overflow-hidden transition-all duration-500 hover:-translate-y-2"
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        borderRadius: "24px",
        border: "1px solid oklch(0.88 0.04 320 / 0.18)",
        boxShadow:
          "0 2px 6px oklch(0.3 0.06 320 / 0.04), 0 12px 36px oklch(0.3 0.06 320 / 0.08)",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <iframe
        src={embedSrc}
        width={CARD_W}
        height={CARD_H}
        style={{
          border: "none",
          overflow: "hidden",
          borderRadius: "24px",
          display: "block",
          pointerEvents: "auto",
        }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook reel"
        loading="lazy"
      />
      {/* Hover ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1.5px oklch(0.58 0.1 320 / 0.28)" }}
      />
    </div>
  );
}

export default function FacebookFeed() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const hasAnimated = useRef(false);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  // Facebook SDK
  useEffect(() => {
    if (document.getElementById("facebook-jssdk")) return;
    const s = document.createElement("script");
    s.id = "facebook-jssdk";
    s.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v25.0";
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  // Sync active dot to scroll position
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (CARD_W + CARD_GAP));
      setActiveIdx(Math.min(idx, posts.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance
  useLayoutEffect(() => {
    if (hasAnimated.current || typeof window === "undefined") return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set(".fb-eyebrow", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".fb-label",   { opacity: 0, x: -8 });
      gsap.set(".fb-title",   { opacity: 0, y: 24 });
      gsap.set(".fb-desc",    { opacity: 0, y: 16 });
      gsap.set(".fb-actions", { opacity: 0, y: 14 });
      gsap.set(".fb-track",   { opacity: 0, y: 20 });
      gsap.set(".fb-cta",     { opacity: 0, y: 14 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
        .to(".fb-eyebrow", { scaleX: 1, duration: 0.5 })
        .to(".fb-label",   { opacity: 1, x: 0, duration: 0.4 }, "-=0.2")
        .to(".fb-title",   { opacity: 1, y: 0, duration: 0.7 }, "-=0.25")
        .to(".fb-desc",    { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
        .to(".fb-actions", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(".fb-track",   { opacity: 1, y: 0, duration: 0.65 }, "-=0.3")
        .to(".fb-cta",     { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Drag-to-scroll
  const onMouseDown = (e) => {
    if (e.target.tagName === "IFRAME") return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollStart.current - (x - startX.current) * 1.2;
  };

  const scrollTo = (idx) => {
    trackRef.current?.scrollTo({
      left: idx * (CARD_W + CARD_GAP),
      behavior: "smooth",
    });
  };

  const scroll = (dir) => {
    const next = Math.max(0, Math.min(posts.length - 1, activeIdx + dir));
    scrollTo(next);
  };

  return (
    // ✅ FIX 1: overflow-hidden restored to clip card bleed
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAF5F1]"
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{ backgroundImage: grain, backgroundSize: "200px 200px" }}
      />

      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 40%, oklch(0.9 0.045 340 / 0.25) 0%, transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.94 0.03 60 / 0.16) 0%, transparent 65%)",
        }}
      />

      {/* ── Top divider line ── */}
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.78 0.06 320 / 0.18), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-0 lg:py-24">

        {/* ── Header row ── */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* Left */}
          <div className="max-w-lg">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="fb-eyebrow block h-[2px] w-7 rounded-full"
                style={{ background: "oklch(0.45 0.12 320)" }}
              />
              <span
                className="fb-label text-[10.5px] font-bold uppercase tracking-[0.24em]"
                style={{ color: "oklch(0.42 0.12 320)" }}
              >
                Stay Connected
              </span>
            </div>

            <h2
              className="fb-title mb-3 leading-[1.05] text-[#18120F]"
              style={{
                fontFamily: "var(--font-display,'Playfair Display',serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Latest from our{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.42 0.12 320)" }}>
                Facebook
              </span>
            </h2>

            <p
              className="fb-desc text-[14.5px] leading-[1.82]"
              style={{ color: "#7A7068" }}
            >
              Watch our latest reels and health tips from the Women&apos;s Care
              of Bradenton team.
            </p>
          </div>

          {/* Right — arrows + follow */}
          <div className="fb-actions flex shrink-0 items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              disabled={activeIdx === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30"
              style={{
                borderColor: "oklch(0.88 0.04 320 / 0.35)",
                color: "oklch(0.42 0.12 320)",
                background: "rgba(255,255,255,0.6)",
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              disabled={activeIdx === posts.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30"
              style={{
                borderColor: "oklch(0.88 0.04 320 / 0.35)",
                color: "oklch(0.42 0.12 320)",
                background: "rgba(255,255,255,0.6)",
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div
              className="h-6 w-px"
              style={{ background: "oklch(0.82 0.04 320 / 0.35)" }}
            />

            <a
              href="https://www.facebook.com/thewomenscarebrandenton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{
                background: "oklch(0.42 0.12 320)",
                boxShadow: "0 4px 18px oklch(0.42 0.12 320 / 0.3)",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Follow us
            </a>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div
          ref={trackRef}
          className="fb-track flex gap-5 overflow-x-auto pb-6 pt-2"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            // ✅ FIX 2: right padding so last card has breathing room before clipping
            paddingRight: "40px",
          }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <style>{`.fb-track::-webkit-scrollbar { display: none; }`}</style>
          {posts.map((post) => (
            <div key={post.id} style={{ scrollSnapAlign: "start" }}>
              <EmbedCard href={post.href} />
            </div>
          ))}
        </div>

        {/* ── Bottom row ── */}
        <div className="fb-cta mt-4 flex items-center justify-between">

          {/* Live dot indicators — clickable */}
          <div className="flex items-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to reel ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? "24px" : "6px",
                  height: "6px",
                  background:
                    i === activeIdx
                      ? "oklch(0.42 0.12 320)"
                      : "oklch(0.78 0.05 320 / 0.45)",
                }}
              />
            ))}
          </div>

          {/* See all */}
          <a
            href="https://www.facebook.com/thewomenscarebrandenton/reels"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[13px] font-semibold transition-all duration-300 hover:bg-white hover:shadow-md active:scale-95"
            style={{
              borderColor: "oklch(0.88 0.04 320 / 0.35)",
              color: "oklch(0.42 0.12 320)",
              background: "rgba(255,255,255,0.6)",
            }}
          >
            See all reels
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.78 0.06 320 / 0.18), transparent)",
          }}
        />
      </div>
    </section>
  );
}