import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ image, category, readTime, title, excerpt, href }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-[#c4a8d4]">
      {/* Image */}
      <div className="relative h-[180px] w-full overflow-hidden sm:h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-foreground">
            {category}
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-foreground/70">
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">
          {excerpt}
        </p>

        {/* Read more */}
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          Read more
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}