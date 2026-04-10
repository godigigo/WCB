"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "@/components/ui/BlogCard";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    image: "/blog/blog1.jpg",
    category: "Wellness",
    readTime: "5 min read",
    title: "What to expect at your well woman exam",
    excerpt:
      "Annual exams are essential for early detection and preventive health.",
    href: "/blog/well-woman-exam",
  },
  {
    image: "/blog/blog2.jpg",
    category: "Fertility",
    readTime: "6 min read",
    title: "Signs of infertility and when to seek help",
    excerpt:
      "Understanding your body helps you make informed decisions about family planning.",
    href: "/blog/signs-of-infertility",
  },
  {
    image: "/blog/blog3.jpg",
    category: "Procedures",
    readTime: "7 min read",
    title: "Benefits of minimally invasive surgical options",
    excerpt:
      "Modern techniques mean faster recovery and less discomfort for patients.",
    href: "/blog/minimally-invasive-surgery",
  },
];

export default function Blog() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) return;

      // Heading block
      gsap.from(".blog-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards stagger
      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
      });

      // View all button
      gsap.from(".blog-viewall", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#C4A8D4]" ref={sectionRef}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-0 lg:py-20">
        {/* Heading */}
        <div className="blog-heading max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
            Blog
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-[40px]">
            Latest from our{" "}
            <span className="italic">blog</span>
          </h2>
          <p className="mt-3 text-sm text-foreground/70 sm:text-base">
            Stay informed with articles on women&apos;s health.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.href} className="blog-card">
              <BlogCard {...post} />
            </div>
          ))}
        </div>

        {/* View all — bottom right */}
        <div className="blog-viewall mt-8 flex justify-end">
          <Button variant="outline" href="/blog">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}