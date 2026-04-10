import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Our team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

const services = [
  "Gynecology",
  "Well woman exam",
  "Infertility",
  "Minimally invasive surgery",
  "Cosmetic procedures",
];

const contactLinks = [
  "1234 Healthcare Drive",
  "Bradenton, Florida",
  "(941) 500-3100",
  "Mon–Fri 8am–5pm",
  "Book appointment",
];

const compassionateLinks = [
  "Privacy policy",
  "Terms of service",
  "Patient portal",
  "Contact",
  "Careers",
];

const followLinks = ["Facebook", "Instagram", "LinkedIn", "Twitter", "YouTube"];

const resources = [
  "Patient information",
  "Insurance accepted",
  "FAQs",
  "Appointment policies",
  "Testimonials",
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-0 lg:py-14">
        {/* Newsletter row */}
        <div className="flex flex-col items-start gap-6 border-b border-white/15 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <p className="text-sm font-semibold">
              Get free women&apos;s health tips monthly
            </p>
            <p className="mt-2 text-sm text-white/80">
              Get the latest updates on women&apos;s health and wellness
              delivered to your inbox.
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col items-stretch gap-2 sm:items-end">
            <div className="flex w-full items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="h-11 flex-1 rounded-[999px] border border-white/40 bg-primary/40 px-4 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
              <button
                type="button"
                className="h-11 rounded-[999px] bg-[#C9737A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#b95d64]"
              >
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-white/70">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="mt-10 grid gap-8 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <h3 className="text-sm font-semibold">Contact us</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {contactLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Compassionate. Expert. Women-First. */}
          <div>
            <h3 className="text-sm font-semibold">
              Compassionate.
              <br />
              Expert. Women-First.
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {compassionateLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="text-sm font-semibold">Follow us</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {followLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {resources.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Womens Care of Bradenton logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-center text-xs text-white/70 sm:text-right">
            © 2025 Women&apos;s Care of Bradenton. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}