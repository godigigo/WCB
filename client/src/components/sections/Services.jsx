import ServiceCard from "@/components/ui/ServiceCard";

const teamLeftColumn = [
  {
    variant: "large",
    image: "/team/team-1.jpg", // Dr. J (large portrait)
    name: "Dr. Jothivijayarani",
    role: "Founder and lead physician",
    description:
      "Thirty years of women's healthcare with board certifications in family practice and gynecology.",
  },
  {
    variant: "small",
    image: "/team/team-2.jpg",
    name: "Michelle Thompson",
    role: "Clinical coordinator",
    description:
      "Ensures smooth patient experiences and manages scheduling with professionalism and warmth.",
  },
  {
    variant: "small",
    image: "/team/team-3.png",
    name: "Dr. Sarah Mitchell",
    role: "OB/GYN specialist",
    description:
      "Specializes in minimally invasive procedures and reproductive health with compassionate patient care.",
  },
];

const teamRightColumn = [
  {
    variant: "small",
    image: "/team/team-4.jpeg",
    name: "Jennifer Rodriguez",
    role: "Nurse practitioner",
    description:
      "Provides comprehensive women's health services with a focus on preventive care and education.",
  },
  {
    variant: "small",
    image: "/team/team-5.jpg",
    name: "Amanda Chen",
    role: "Physician assistant",
    description:
      "Delivers personalized care in gynecology and well woman exams with attention to detail.",
  },
  {
    variant: "large",
    image: "/team/team-6.jpg",
    name: "Lisa Patterson",
    role: "Medical assistant",
    description:
      "Supports clinical operations and patient comfort with genuine care and efficiency.",
  },
];

export default function Services() {
  return (
    <section className="w-full bg-primary">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-white sm:px-6 sm:py-12 md:py-16 lg:px-0 lg:py-20">
        {/* Heading */}
        <header className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Team
          </p>
          <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl md:text-[40px]">
            Meet our <span className="italic">Experts..</span>
          </h2>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            Experienced physicians dedicated to your care.
          </p>
        </header>

        {/* Bento grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start lg:gap-8">
          {/* LEFT column: big card + two small below */}
          <div className="flex flex-col gap-6">
            {teamLeftColumn.map((member) => (
              <ServiceCard key={member.name} {...member} />
            ))}
          </div>

          {/* RIGHT column: two small top + large bottom */}
          <div className="flex flex-col gap-6">
            {teamRightColumn.map((member) => (
              <ServiceCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}