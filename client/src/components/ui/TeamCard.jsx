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
        className="group relative overflow-hidden rounded-[28px] p-4 transition-all duration-500 hover:-translate-y-1 sm:p-5 md:p-6"
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

        {/* Top-right shimmer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.06 330 / 0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col gap-4 sm:gap-5">
          {/* Image */}
          <div
            className="relative h-[260px] w-full overflow-hidden sm:h-[300px] md:h-[320px]"
            style={{ borderRadius: "1.25rem" }}
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Bottom vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.4 0.08 320 / 0.35), transparent)",
              }}
            />
            {/* Role pill floating on image */}
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

          {/* Text */}
          <div className="px-1">
            <h3
              className="font-display leading-tight tracking-[-0.015em] text-foreground transition-colors duration-300 group-hover:text-primary"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
            >
              {name}
            </h3>

            {/* Gradient divider */}
            <div
              className="my-3 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.65 0.1 320 / 0.3), transparent)",
              }}
            />

            <p
              className="text-[13.5px] leading-[1.82]"
              style={{ color: "oklch(0.35 0.04 320 / 0.75)" }}
            >
              {description}
            </p>

            {/* Animated dot row */}
            <div className="mt-4 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === 0 ? "20px" : "6px",
                    height: "6px",
                    background:
                      i === 0
                        ? "oklch(0.55 0.12 320 / 0.6)"
                        : "oklch(0.65 0.08 320 / 0.3)",
                    transitionDelay: `${i * 40}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Small card ──────────────────────────────────
  return (
    <div
      className="group relative overflow-hidden rounded-[24px] p-4 transition-all duration-500 hover:-translate-y-0.5 sm:p-5"
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

      <div className="relative flex gap-4 sm:gap-5">
        {/* Avatar */}
        <div
          className="relative h-[88px] w-[88px] shrink-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.03] sm:h-[108px] sm:w-[108px]"
          style={{
            borderRadius: "1rem",
            boxShadow: "0 4px 14px oklch(0.3 0.08 320 / 0.12)",
          }}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="110px"
            className="object-cover"
          />
          {/* Bottom shimmer on avatar */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-10"
            style={{
              background:
                "linear-gradient(to top, oklch(0.4 0.08 320 / 0.28), transparent)",
            }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3
              className="font-display text-[15px] leading-tight tracking-[-0.012em] text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[16px]"
            >
              {name}
            </h3>

            {/* Role with leading dot */}
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "oklch(0.6 0.1 320 / 0.55)" }}
              />
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "oklch(0.45 0.1 320 / 0.75)" }}
              >
                {role}
              </p>
            </div>

            {/* Gradient divider */}
            <div
              className="my-2.5 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.65 0.1 320 / 0.25), transparent)",
              }}
            />

            <p
              className="text-[12.5px] leading-[1.8]"
              style={{ color: "oklch(0.35 0.04 320 / 0.72)" }}
            >
              {description}
            </p>
          </div>

          {/* Dot indicator */}
          <div className="mt-3 flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-300"
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
    </div>
  );
}