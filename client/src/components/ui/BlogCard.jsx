import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ image, category, readTime, title, excerpt, href }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      style={{
        background: "rgba(196,168,212,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid oklch(0.72 0.08 320 / 0.22)",
        boxShadow:
          "0 2px 4px oklch(0.3 0.08 320 / 0.05), 0 12px 36px oklch(0.3 0.08 320 / 0.09)",
      }}
    >
      {/* ── Inner grain texture ───────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[28px]"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* ── Image ─────────────────────────────── */}
      <div className="relative h-[190px] w-full overflow-hidden sm:h-[210px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Bottom gradient on image */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20"
          style={{
            background:
              "linear-gradient(to top, oklch(0.55 0.09 320 / 0.35), transparent)",
          }}
        />

        {/* Category pill — floating over image */}
        <div className="absolute bottom-3 left-4">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "oklch(0.42 0.12 320)",
              border: "1px solid oklch(0.84 0.05 320 / 0.3)",
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">

        {/* Read time */}
        <div className="mb-3 flex items-center gap-2">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: "oklch(0.45 0.1 320 / 0.65)" }}
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <span
            className="text-[11.5px] tracking-[0.06em]"
            style={{ color: "oklch(0.38 0.08 320 / 0.65)" }}
          >
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display leading-[1.2] tracking-[-0.018em] text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[19px]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
        >
          {title}
        </h3>

        {/* Divider */}
        <div
          className="my-3 h-px"
          style={{
            background:
              "linear-gradient(to right, oklch(0.6 0.08 320 / 0.3), transparent)",
          }}
        />

        {/* Excerpt */}
        <p
          className="flex-1 text-[13.5px] leading-[1.82]"
          style={{ color: "oklch(0.3 0.04 320 / 0.72)" }}
        >
          {excerpt}
        </p>

        {/* Read more */}
        <div className="mt-5 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-300 group-hover:text-primary"
            style={{ color: "oklch(0.38 0.1 320)" }}
          >
            Read article
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5"
              style={{
                background: "oklch(0.88 0.06 320 / 0.5)",
                color: "oklch(0.42 0.12 320)",
              }}
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </span>

          {/* Subtle dot accent */}
          <div className="flex items-center gap-1">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "oklch(0.72 0.1 320 / 0.5)" }}
            />
            <div
              className="h-1 w-1 rounded-full"
              style={{ background: "oklch(0.78 0.07 320 / 0.35)" }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}