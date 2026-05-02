"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Shared visual primitives ────────────────────────────────────────────────

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Grain({ opacity = 0.035 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: grain,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div
        className="h-[1px] w-7 rounded-full"
        style={{ background: "oklch(0.55 0.1 320 / 0.45)" }}
      />
      <span
        className="text-[10.5px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: "oklch(0.42 0.12 320)" }}
      >
        {children}
      </span>
      <div
        className="h-[1px] w-7 rounded-full"
        style={{ background: "oklch(0.55 0.1 320 / 0.45)" }}
      />
    </div>
  );
}

// ─── Hero / Heading band ─────────────────────────────────────────────────────

function PrivacyHero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".pn-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          ".pn-word",
          {
            opacity: 0,
            y: "100%",
            stagger: 0.05,
            duration: 0.8,
          },
          "-=0.35",
        )
        .from(
          ".pn-sub",
          {
            opacity: 0,
            y: 18,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          ".pn-meta",
          {
            opacity: 0,
            y: 12,
            duration: 0.6,
          },
          "-=0.45",
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FAF5F1]"
      style={{
        fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
      }}
    >
      <Grain opacity={0.04} />

      {/* ambient shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[720px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.9 0.045 340 / 0.38) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-36 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, oklch(0.93 0.03 60 / 0.25) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-24 sm:px-8 md:pb-20 md:pt-28 lg:px-0 lg:pb-24 lg:pt-32">
        <div className="pn-eyebrow mb-6">
          <Eyebrow>Privacy & terms</Eyebrow>
        </div>

        <h1
          className="mb-5 overflow-hidden font-display"
          style={{
            fontFamily: "var(--font-display,'Playfair Display',Georgia,serif)",
            fontSize: "clamp(2.4rem,4.4vw,3.4rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#18120F",
          }}
        >
          {["Notice of Privacy", "Practices"].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split(" ").map((w, wi) => (
                <span
                  key={wi}
                  className="pn-word mr-[0.22em] inline-block"
                >
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="pn-sub mb-4 max-w-2xl text-[14.5px] leading-[1.8]"
          style={{ color: "#7A7068" }}
        >
          This Notice describes how medical information about you may be used and
          disclosed and how you can access this information. Please review it
          carefully.
        </p>

        <p
          className="pn-meta text-[12px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "oklch(0.42 0.12 320)" }}
        >
          Effective Date: January 2026
        </p>
      </div>
    </section>
  );
}

// ─── Content section (scroll-fade) ───────────────────────────────────────────

function PrivacyContent() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".pn-block").forEach((el, idx) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: idx === 0 ? 0.05 : 0,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-t border-[oklch(0.9_0.02_60/0.6)] bg-[#FAF5F1]"
    >
      <Grain opacity={0.02} />

      <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-20 lg:px-0 lg:py-24">
        {/* Intro line mirrors your legal header */}
        <div className="pn-block mb-10 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <p>
            <strong>Your Information. Your Rights. Our Responsibilities.</strong>
          </p>
          <p>
            This notice describes how <strong>MEDICAL INFORMATION ABOUT YOU</strong> may be
            used and disclosed by your healthcare provider and the medical
            practice responsible for your care (“Practice”) and how you can get
            access to this information. Please review it carefully.
          </p>
        </div>

        {/* YOUR RIGHTS */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            YOUR RIGHTS
          </h2>
          <p>
            When it comes to your health information, you have certain rights.
            This section explains your rights and some of our responsibilities to
            help you.
          </p>
          <p className="font-semibold">You have the right to:</p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Get a copy of your paper or electronic medical record
          </h3>
          <p>
            You can ask to inspect or get an electronic or paper copy of your
            medical record and other health information we have about you. Ask
            us how to do this.
          </p>
          <p>
            We will provide a copy or a summary of your health information,
            usually within 30 days of your request. We may charge a reasonable,
            cost-based fee.
          </p>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            Amend (correct) your paper or electronic medical record
          </h3>
          <p>
            You can ask us to correct health information about you that you
            think is incorrect or incomplete. Ask us how to do this.
          </p>
          <p>
            We may say “no” to your request, but we’ll tell you why in writing
            within 60 days.
          </p>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            Request confidential communication
          </h3>
          <p>
            You can ask us to contact you in a specific way (for example, home
            or office phone) or to send mail to a different address.
          </p>
          <p>We will say “yes” to all reasonable requests.</p>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            Ask us to limit the information we share
          </h3>
          <p>
            You can ask us not to use or share certain health information for
            treatment, payment, or our operations.
          </p>
          <p>
            We are not required to agree to your request, and we may say “no” if
            it would affect your care.
          </p>
          <p>
            If you pay for a service or health care item out-of-pocket in full,
            you can ask us not to share that information for the purpose of
            payment or our operations with your health insurer.
          </p>
          <p>
            We will say “yes” unless a law requires us to share that
            information.
          </p>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            Get a list of those with whom we’ve shared your information
          </h3>
          <p>
            You can ask for a list (accounting) of the times we’ve shared your
            health information for six years prior to the date you ask, who we
            shared it with, and why.
          </p>
          <p>
            We will include all the disclosures except for those about
            treatment, payment, and health care operations, and certain other
            disclosures (such as any you asked us to make). We’ll provide one
            accounting a year for free but will charge a reasonable, cost-based
            fee if you ask for another one within 12 months.
          </p>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            Get a copy of this privacy notice
          </h3>
          <p>
            You can ask for a paper copy of this notice at any time, even if you
            have agreed to receive the notice electronically. We will provide
            you with a paper copy promptly.
          </p>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            Choose someone to act for you
          </h3>
          <p>
            If you have given someone medical power of attorney or if someone is
            your legal guardian, that person can exercise your rights and make
            choices about your health information.
          </p>
          <p>
            We will make sure the person has this authority and can act for you
            before we take any action.
          </p>
        </article>

        {/* YOUR CHOICES */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            YOUR CHOICES
          </h2>
          <p>
            For certain health information, you can tell us your choices about
            what we share. If you have a clear preference for how we share your
            information in the situations described below, talk to us. Tell us
            what you want us to do, and we will follow your instructions.
          </p>
          <p>In these cases, you have both the right and choice to tell us to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Share information with your family, close friends, or others
              involved in your care
            </li>
            <li>Share information in a disaster relief situation</li>
          </ul>
          <p>
            If you are not able to tell us your preference, for example if you
            are unconscious, we may go ahead and share your information if we
            believe it is in your best interest. We may also share your
            information when needed to lessen a serious and imminent threat to
            health or safety.
          </p>

          <p>In these cases, we never share your information unless you give us written permission:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Marketing purposes</li>
            <li>Sale of your information</li>
            <li>Most sharing of psychotherapy notes</li>
          </ul>

          <h3 className="mt-4 text-[15px] font-semibold text-[#1C1814]">
            In the case of fundraising:
          </h3>
          <p>
            We may contact you for fundraising efforts, but you can tell us not
            to contact you again.
          </p>
        </article>

        {/* OUR USES AND DISCLOSURES (typical) */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            OUR USES AND DISCLOSURES
          </h2>
          <p>
            <strong>How do we typically use or share your health information?</strong> We
            typically use or share your health information in the following
            ways:
          </p>

          <h3 className="mt-2 text-[15px] font-semibold text-[#1C1814]">
            Treatment
          </h3>
          <p>
            We can use your health information and share it with other
            professionals who are treating you (i.e., a doctor treating you for
            an injury asks another doctor about your overall health condition).
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Payment
          </h3>
          <p>
            We can use and share your health information to bill and get payment
            from health plans or other entities (i.e., we give information about
            you to your health insurance plan so it will pay for your services).
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Healthcare Operations
          </h3>
          <p>
            We can use and share your health information to run our practice,
            improve your care, and contact you when necessary (i.e., we use
            health information about you to manage your treatment and services).
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Appointment Reminders, Treatment Alternatives, and Health-Related
            Benefits and Services
          </h3>
          <p>
            We may use and disclose health information to contact you as a
            reminder that you have an appointment with us. We may use and
            disclose health information to tell you about treatment options or
            alternatives or health-related benefits and services that may be of
            interest to you. We also may make your health information available
            for you to access through a secure online patient portal (if
            applicable).
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            De-identified Health Information
          </h3>
          <p>
            We may use your health information to create “de-identified”
            information that is not identifiable to any individual in accordance
            with the Health Insurance Portability and Accountability Act of 1996
            (“HIPAA”). Federal law does not restrict the use of patient health
            information once it becomes “de-identified” data in a manner
            provided under HIPAA so as to not disclose your identity. We may
            create data sets of de-identified information of many patients to
            share with outside persons and companies to discover methods and
            products to diagnose and treat diseases. We may also disclose your
            health information to a business associate for the purpose of
            creating de-identified information.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Limited Data Set
          </h3>
          <p>
            We may use your health information to create a “limited data set” by
            removing certain identifying information. We may also disclose your
            health information to a business associate for the purpose of
            creating a limited data set. We may use and disclose a limited data
            set only for research, public health or healthcare operations
            purposes. We may create a limited data set of many patients to share
            with outside persons and companies to perform research, public
            health or healthcare operations. Persons or companies receiving the
            limited data set must sign an agreement to protect your health
            information.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Business Associates
          </h3>
          <p>
            We may disclose your health information to our business associates
            who perform functions on our behalf or provide us with services, if
            the information is necessary for such functions or services. For
            example, we may use another company to perform billing services on
            our behalf. All of our business associates are obligated by law and
            under contract with us, to protect the privacy of your information
            and are not allowed to use or disclose any information other than as
            specified in our contract.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Participation in Health Information Exchanges (HIE)
          </h3>
          <p>
            We may share information about you with one or more HIEs that we may
            participate in. HIEs are secure electronic systems that allow health
            care providers to exchange patient information in order to better
            coordinate your care and to help us make more informed decisions
            regarding the best way to treat you. For example, if you were to
            visit another provider or hospital that also participates in the
            same HIE, we would receive treatment information from that provider.
            If you do not wish to participate in the HIE, we will provide you a
            HIE Opt-Out Form to complete. You can receive services from us even
            if you decide to opt out of participation in the HIE.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Incidental Uses and Disclosures
          </h3>
          <p>
            Incidental uses and disclosures of information may occur. An
            incidental use or disclosure is a secondary use or disclosure that
            cannot reasonably be prevented, is limited in nature, and that
            occurs as a by-product of an otherwise permitted use or disclosure.
            However, such incidental uses or disclosure are permitted only to
            the extent that we have applied reasonable safeguards and do not
            disclose any more of your PHI than is necessary to accomplish the
            permitted use or disclosure. For example, disclosures about a
            patient within a physician’s office that might be overheard by
            persons not involved in your care would be permitted.
          </p>
        </article>

        {/* OTHER PERMITTED / REQUIRED USES */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h3 className="text-[15px] font-semibold text-[#1C1814]">
            How else can we use or share your health information?
          </h3>
          <p>
            We are allowed or required to share your information in other ways –
            usually in ways that contribute to the public good, such as public
            health and research. We have to meet many conditions under
            applicable law before we can share your information for these
            purposes. For more information see:{" "}
            <a
              href="http://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/index.html"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/index.html
            </a>
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Help with public health and safety issues
          </h3>
          <p>We can share health information about you for certain situations such as:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Preventing disease</li>
            <li>Helping with product recalls</li>
            <li>Reporting adverse reactions to medications</li>
            <li>Reporting suspected abuse, neglect, or domestic violence</li>
            <li>Preventing or reducing a serious threat to anyone’s health or safety</li>
          </ul>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Do research
          </h3>
          <p>We can use or share your information for health research.</p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Comply with the law
          </h3>
          <p>
            We will share information about you if state or federal laws require
            it, including with the Department of Health and Human Services if it
            wants to see that we’re complying with federal privacy law.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Respond to organ and tissue donation requests
          </h3>
          <p>
            We can share health information about you with organ procurement
            organizations.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Work with a medical examiner or funeral director
          </h3>
          <p>
            We can share health information with a coroner, medical examiner, or
            funeral director when an individual dies.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Address workers’ compensation, law enforcement, and other government
            requests
          </h3>
          <p>We can use or share health information about you:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>For workers’ compensation claims</li>
            <li>For law enforcement purposes or with a law enforcement official</li>
            <li>With health oversight agencies for activities authorized by law</li>
            <li>
              For special government functions such as military, national
              security, and presidential protective services
            </li>
          </ul>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Respond to lawsuits and legal actions
          </h3>
          <p>
            We can share health information about you in response to a court or
            administrative order, or in response to a subpoena.
          </p>
        </article>

        {/* USES REQUIRING AUTHORIZATION */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            USES AND DISCLOSURES THAT REQUIRE YOUR WRITTEN AUTHORIZATION
          </h2>
          <p>
            We will seek your specific written authorization for at least the
            following information unless the use or disclosure would be
            otherwise permitted or required by law as described above:
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            HIV/AIDS information
          </h3>
          <p>
            In most cases, we will NOT release any of your HIV/AIDS related
            information unless your authorization expressly states that we may
            do so. There are certain purposes, however, for which we may be
            permitted to release your HIV/AIDS information without obtaining
            your express authorization. For example, we may release information
            regarding your HIV/AIDS status to your insurance company or HMO for
            purposes of receiving payment for services we provide to you. We may
            also release information regarding HIV/AIDS status of yourself and
            other patients where the information has been “de-identified”
            (meaning, the information cannot be used in any way to identify
            you). Other instances where we may use or disclose HIV/AIDS
            information without your express authorization include:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>For your diagnosis and treatment;</li>
            <li>For scientific research;</li>
            <li>For management audits, financial audits, or program evaluation;</li>
            <li>For medical education;</li>
            <li>
              For disease prevention and control, when permitted by the State
              Department of Health
            </li>
            <li>To comply with certain court orders; and</li>
            <li>
              When otherwise required by law, to the Department of Health or
              another entity.
            </li>
          </ul>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Sexually transmitted disease information
          </h3>
          <p>
            We must obtain your specific written authorization prior to
            disclosing any information that would identify you as having or
            being suspected of having a sexually transmitted disease. We may use
            and disclose information related to sexually transmitted diseases
            without obtaining your authorization only when permitted by law,
            including to the Department of Health, to your physician or a health
            authority, or to a prosecuting officer or court if you are being
            prosecuted under state law. Where necessary, your provider or a
            health authority may further disclose such information to protect
            your health and welfare, or the health and welfare of your family or
            the public.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Mental health information
          </h3>
          <p>
            We must obtain your specific written authorization prior to
            disclosing certain mental health information where required by state
            law. There may be cases where you see a mental health provider in a
            primary care setting and collaborative care is provided by the
            mental health provider and your primary care physician. In these
            situations, the mental health provider is not operating as a
            psychotherapist, and your mental health information may be stored
            within your primary care notes.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Substance Use Disorder Treatment Records (42 CFR Part 2)
          </h3>
          <p>
            For purposes of this notice, “SUD Program” means a substance abuse
            disorder treatment program or provider subject to 42 CFR Part 2.
          </p>
          <p>
            The Practice does not operate, participate in, or hold itself out as
            a SUD Program or SUD provider for purposes of Part 2. However, the
            Practice may receive substance use disorder treatment information
            about you from a SUD Program (“Part 2 Records”).
          </p>
          <p>
            The Practice will not use or disclose Part 2 Records without your
            written consent except as expressly permitted by law (i.e.,
            emergency). The Practice may rely on a valid consent that authorizes
            the use and disclosure of Part 2 records for treatment, payment, and
            healthcare operations, and may redisclose this information as
            permitted by HIPAA, provided that Part 2 Records may not be
            redisclosed for use in any civil, criminal, administrative, or
            legislative proceeding involving you.
          </p>
          <p>
            The Practice may not disclose Part 2 Records for use in any civil,
            criminal, administrative, or legislative proceeding involving you
            unless (i) you provide written consent that specifically authorizes
            such disclosure or (ii) a valid court order or subpoena compelling
            disclosure is issued in compliance with Part 2, after both you and
            the Practice have been provided notice and an opportunity to be
            heard.
          </p>
          <p>
            Any disclosure of Part 2 Records permitted will include a statement
            that further use or redisclosure is prohibited unless expressly
            permitted by applicable law. You may revoke your consent at any
            time, except to the extent the Practice has already relied on such
            consent.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Genetic information
          </h3>
          <p>
            We must obtain your specific written authorization prior to
            obtaining or retaining your genetic information, or using or
            disclosing your genetic information for treatment, payment, or
            health care operations purposes. For example, before conducting any
            genetic testing, we will ask for your written authorization to
            conduct such testing. We may use or disclose your genetic
            information, or the genetic information of your child, without your
            written authorization only where it would be permitted by law, such
            as for paternity tests for court proceedings, anonymous research,
            newborn screening requirements, identifying a body, for the purposes
            of criminal investigations or otherwise authorized by a court order.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Information related to treatment of a minor in special circumstances
          </h3>
          <p>
            If you are a minor who sought certain types of treatment from us (to
            which treatment you were able to consent on your own behalf), such
            as treatment related to your pregnancy or treatment related to your
            child, or a sexually transmitted disease, we must obtain your
            specific written authorization prior to disclosing any of your PHI
            related to such treatment to another person, including your
            parent(s) or guardian(s), unless we would otherwise be permitted by
            law to do so.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            Marketing Activities
          </h3>
          <p>
            We must obtain your specific written authorization to use any of
            your PHI to mail or email you marketing materials. However, we may
            provide you with marketing materials face-to-face without obtaining
            authorization, in addition to communicating with you about services
            or products that relate to your treatment, case management, or care
            coordination, alternative treatments, therapies, providers or care
            settings. If you do provide us with your written authorization to
            send you marketing materials, you have a right to opt-out of
            receiving these communications in the future and may do so at any
            time. If you wish to opt-out of receiving these communications in
            the future, please contact the Privacy Officer at the email or
            address below.
          </p>
        </article>

        {/* OUR RESPONSIBILITIES */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            OUR RESPONSIBILITIES
          </h2>
          <p>
            We are required by law to maintain the privacy and security of your
            protected health information.
          </p>
          <p>
            We will let you know promptly if a breach occurs that may have
            compromised the privacy or security of your information.
          </p>
          <p>
            We must follow the duties and privacy practices described in this
            notice and give you a copy of it.
          </p>
          <p>
            We will not use or share your information other than as described
            here unless you tell us we can in writing. If you tell us we can,
            you may change your mind at any time. Let us know in writing if you
            change your mind.
          </p>
          <p>
            For more information see:{" "}
            <a
              href="http://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html
            </a>
          </p>
        </article>

        {/* HOW TO EXERCISE YOUR RIGHTS */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            HOW TO EXERCISE YOUR RIGHTS
          </h2>
          <p>
            To exercise your rights described in this notice (other than to
            obtain a copy of this notice), you may submit a request by
            contacting the Practice’s Privacy Officer at{" "}
            <a href="mailto:privacy@toplinemd.com" className="underline">
              privacy@toplinemd.com
            </a>{" "}
            or by submitting a written request using the contact information
            available on the Practice’s website, directed to the attention of
            the Privacy Officer.
          </p>

          <h3 className="mt-3 text-[15px] font-semibold text-[#1C1814]">
            File a complaint if you believe your privacy rights have been
            violated
          </h3>
          <p>
            You can complain if you feel we have violated your rights by
            contacting us using the information on the back page.
          </p>
          <p>
            You can file a complaint with the U.S. Department of Health and
            Human Services Office for Civil Rights by sending a letter to 200
            Independence Avenue, S.W., Washington, D.C. 20201, calling
            1-877-696-6775, or visiting{" "}
            <a
              href="https://ocrportal.hhs.gov/ocr/smartscreen/main.jsf"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              https://ocrportal.hhs.gov/ocr/smartscreen/main.jsf
            </a>
          </p>
          <p>We will not retaliate against you for filing a complaint.</p>
        </article>

        {/* COMPLAINTS OR QUESTIONS */}
        <article className="pn-block mb-12 space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            COMPLAINTS OR QUESTIONS
          </h2>
          <p>
            If you believe your privacy rights have been violated, you may file
            a complaint by contacting the Privacy Officer at{" "}
            <a href="mailto:privacy@toplinemd.com" className="underline">
              privacy@toplinemd.com
            </a>{" "}
            or by submitting a written complaint to the Privacy Officer using
            the contact information available on the Practice’s website,
            directed to the attention of the Privacy Officer.
          </p>
        </article>

        {/* CHANGES TO TERMS */}
        <article className="pn-block space-y-4 text-[14.5px] leading-[1.85] text-[#5F574F]">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1C1814]">
            CHANGES TO THE TERMS OF THIS NOTICE
          </h2>
          <p>
            The Practice can change the terms of this notice, and the changes
            will apply to all information we have about you. The new notice will
            be available upon request, in the Practice’s office, and on the
            Practice’s web site.
          </p>
        </article>
      </div>
    </section>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export default function NoticeOfPrivacyPracticesPage() {
  return (
    <main
      style={{
        fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
        backgroundColor: "#FAF5F1",
      }}
    >
      <PrivacyHero />
      <PrivacyContent />
    </main>
  );
}