"use client";

import Image from "next/image";

export default function TeamCard({
  variant = "large",
  image,
  name,
  role,
  description,
}) {
  const isLarge = variant === "large";

  if (isLarge) {
    return (
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1"
        style={{
          background: "oklch(0.95 0.03 320 / 0.55)",
          border: "1px solid oklch(0.82 0.05 320 / 0.2)",
          boxShadow:
            "0 2px 4px oklch(0.3 0.08 320 / 0.04), 0 10px 32px oklch(0.3 0.08 320 / 0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Inner grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />

        {/* Hover shimmer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.06 330 / 0.18) 0%, transparent 70%)",
          }}
        />

        {/* Image — grows to fill available space */}
        <div className="relative min-h-[320px] flex-1 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Bottom vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                "linear-gradient(to top, oklch(0.4 0.08 320 / 0.45), transparent)",
            }}
          />
          {/* Role pill */}
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: "oklch(0.42 0.12 320)",
                border: "1px solid oklch(0.84 0.05 320 / 0.25)",
              }}
            >
              {role}
            </span>
          </div>
        </div>

        {/* Text — fixed bottom section, no padding waste */}
        <div className="flex shrink-0 flex-col gap-2 p-5">
          <h3
            className="font-display leading-tight tracking-[-0.015em] text-foreground transition-colors duration-300 group-hover:text-primary"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
          >
            {name}
          </h3>

          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(to right, oklch(0.65 0.1 320 / 0.3), transparent)",
            }}
          />

          <p
            className="text-[13px] leading-[1.75]"
            style={{ color: "oklch(0.35 0.04 320 / 0.75)" }}
          >
            {description}
          </p>

          <div className="mt-1 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full"
                style={{
                  width: i === 0 ? "20px" : "6px",
                  height: "6px",
                  background:
                    i === 0
                      ? "oklch(0.55 0.12 320 / 0.6)"
                      : "oklch(0.65 0.08 320 / 0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Small card ──────────────────────────────────
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] p-4 transition-all duration-500 hover:-translate-y-0.5 sm:p-5"
      style={{
        background: "oklch(0.95 0.03 320 / 0.55)",
        border: "1px solid oklch(0.82 0.05 320 / 0.2)",
        boxShadow:
          "0 2px 4px oklch(0.3 0.08 320 / 0.04), 0 8px 24px oklch(0.3 0.08 320 / 0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Inner grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Hover shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-[160px] w-[160px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.06 330 / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-4">
        {/* Top row: avatar + name/role */}
        <div className="flex gap-4">
          {/* Avatar */}
          <div
            className="relative h-[80px] w-[80px] shrink-0 overflow-hidden sm:h-[92px] sm:w-[92px]"
            style={{
              borderRadius: "0.875rem",
              boxShadow: "0 4px 14px oklch(0.3 0.08 320 / 0.12)",
            }}
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="92px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-8"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.4 0.08 320 / 0.28), transparent)",
              }}
            />
          </div>

          {/* Name + role */}
          <div className="flex flex-col justify-center gap-1">
            <h3
              className="font-display text-[15px] leading-snug tracking-[-0.012em] text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[16px]"
            >
              {name}
            </h3>
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "oklch(0.6 0.1 320 / 0.55)" }}
              />
              <p
                className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "oklch(0.45 0.1 320 / 0.75)" }}
              >
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px shrink-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.65 0.1 320 / 0.25), transparent)",
          }}
        />

        {/* Description — grows to fill remaining space */}
        <p
          className="flex-1 text-[12.5px] leading-[1.8]"
          style={{ color: "oklch(0.35 0.04 320 / 0.72)" }}
        >
          {description}
        </p>

        {/* Dot indicator — always at bottom */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: i === 0 ? "16px" : "5px",
                height: "5px",
                background:
                  i === 0
                    ? "oklch(0.58 0.1 320 / 0.55)"
                    : "oklch(0.65 0.07 320 / 0.28)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}