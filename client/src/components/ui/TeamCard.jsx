import Image from "next/image";

export default function TeamCard({
  variant = "large", // "large" | "small"
  image,
  name,
  role,
  description,
}) {
  const isLarge = variant === "large";

  if (isLarge) {
    // Large bento card (big photo on top, text under)
    return (
      <div className="rounded-[28px] bg-purple-faint p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="relative h-[260px] w-full overflow-hidden rounded-[24px] sm:h-[300px] md:h-[320px]">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              {role}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
              {name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {description}
            </p>

            <div className="mt-4 flex items-center gap-3 text-foreground/60">
              <span className="h-2 w-2 rounded-full bg-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-foreground/40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Small side‑by‑side card
  return (
    <div className="rounded-[24px] bg-purple-faint p-4 sm:p-5">
      <div className="flex gap-4 sm:gap-5">
        <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[20px] sm:h-[110px] sm:w-[110px]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="110px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground sm:text-base">
              {name}
            </h3>
            <p className="mt-1 text-xs font-semibold text-foreground/80 sm:text-sm">
              {role}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/75 sm:text-sm">
              {description}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3 text-foreground/60">
            <span className="h-2 w-2 rounded-full bg-foreground/40" />
            <span className="h-2 w-2 rounded-full bg-foreground/40" />
            <span className="h-2 w-2 rounded-full bg-foreground/40" />
          </div>
        </div>
      </div>
    </div>
  );
}