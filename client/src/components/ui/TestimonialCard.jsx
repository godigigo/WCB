import Image from "next/image";

export default function TestimonialCard({ quote, name, location, avatar }) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-[24px] bg-white/60 p-6 shadow-sm ring-1 ring-foreground/5 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:ring-foreground/10 sm:p-7">
      {/* Top row: stars + quote mark */}
      <div>
        <div className="flex items-center justify-between">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Decorative quote mark */}
          <svg
            className="h-8 w-8 text-primary/15"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Quote */}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
          {quote}
        </p>
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-foreground/8" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {avatar ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-faint ring-2 ring-primary/20">
            <span className="font-display text-sm font-semibold text-primary">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-foreground/50">{location}</p>
        </div>
      </div>
    </div>
  );
}