import Image from "next/image";

export default function TestimonialCard({ quote, name, location, avatar }) {
  return (
    <div
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid oklch(0.84 0.04 320 / 0.22)",
        boxShadow:
          "0 2px 4px oklch(0.3 0.06 320 / 0.04), 0 12px 36px oklch(0.3 0.06 320 / 0.07)",
      }}
    >
      {/* Card inner grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.028,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Top-right soft shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-[180px] w-[180px] rounded-full transition-opacity duration-500 group-hover:opacity-[1.5]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.06 330 / 0.15) 0%, transparent 70%)",
          opacity: 0.8,
        }}
      />

      {/* ── Top block ───────────────────────── */}
      <div className="relative">

        {/* Stars + large decorative quote */}
        <div className="flex items-start justify-between gap-2">
          {/* Stars */}
          <div className="flex items-center gap-[3px]">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-[14px] w-[14px]"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ color: "oklch(0.7 0.14 55)" }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Oversized decorative quote mark */}
          <svg
            aria-hidden="true"
            className="h-9 w-9 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: "oklch(0.7 0.1 320 / 0.12)" }}
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Quote text */}
        <p
          className="mt-5 text-[14.5px] leading-[1.85]"
          style={{ color: "oklch(0.32 0.04 320 / 0.82)" }}
        >
          {quote}
        </p>
      </div>

      {/* ── Divider ─────────────────────────── */}
      <div
        className="my-5 h-px"
        style={{
          background:
            "linear-gradient(to right, oklch(0.7 0.06 320 / 0.25), oklch(0.8 0.03 60 / 0.15), transparent)",
        }}
      />

      {/* ── Author ──────────────────────────── */}
      <div className="relative flex items-center gap-3.5">
        {/* Avatar */}
        {avatar ? (
          <div
            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full"
            style={{
              boxShadow:
                "0 0 0 2px oklch(0.88 0.06 330 / 0.5), 0 2px 8px oklch(0.3 0.06 320 / 0.12)",
            }}
          >
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.9 0.06 330 / 0.8), oklch(0.86 0.07 320 / 0.7))",
              boxShadow:
                "0 0 0 2px oklch(0.88 0.06 330 / 0.45), 0 2px 8px oklch(0.3 0.06 320 / 0.1)",
            }}
          >
            <span
              className="font-display text-sm font-semibold"
              style={{ color: "oklch(0.42 0.12 320)" }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* Name + location */}
        <div className="flex flex-col gap-0.5">
          <p
            className="text-[13.5px] font-semibold leading-none tracking-[-0.01em]"
            style={{ color: "oklch(0.22 0.04 320)" }}
          >
            {name}
          </p>
          <p
            className="text-[11.5px] leading-none tracking-[0.04em]"
            style={{ color: "oklch(0.5 0.08 320 / 0.65)" }}
          >
            {location}
          </p>
        </div>

        {/* Verified badge — premium touch */}
        <div
          className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{
            background: "oklch(0.94 0.04 150 / 0.35)",
            border: "1px solid oklch(0.8 0.08 150 / 0.25)",
          }}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: "oklch(0.45 0.13 150)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "oklch(0.42 0.13 150)" }}
          >
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}