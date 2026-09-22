import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Staff notification targets
const STAFF_TO_EMAIL = "godigigoit@gmail.com";
const STAFF_BCC_EMAILS = [
  "jjothishankar@femwell.com",
  "trilok@godigigo.com",
  "ajothivijayarani@femwell.com",
  "tkoch@femwell.com",
  "jarreaga@femwell.com",
  "v-nsanchez@femwell.com",
  "cgaray@femwell.com",
];

const FROM_EMAIL =
  "Women's Care of Bradenton <info@womenscareofbradenton.com>";

// Allowed hosts for Origin/Referer checks (production)
const ALLOWED_HOSTS = ["womenscareofbradenton.com"];

// Basic HTML escaping to avoid injection in email HTML
function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Normalize + length limit per field
function normalize(value = "", maxLen = 256) {
  return escapeHtml(String(value).trim().slice(0, maxLen));
}

function isValidEmail(email = "") {
  // Simple allowlist-style email syntax check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  if (!name) return false;
  const len = name.length;
  if (len < 2 || len > 64) return false;
  // Letters, spaces, hyphen, apostrophe only
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return false;
  // Require at least one vowel to avoid obvious random strings
  if (!/[aeiouAEIOU]/.test(name)) return false;
  // Avoid names with unusually high uppercase ratio (random tokens)
  const upperMatches = name.match(/[A-Z]/g) || [];
  const upperRatio = upperMatches.length / len;
  if (upperMatches.length > 3 && upperRatio > 0.35) return false;
  return true;
}

function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  // US-like phone numbers typically between 7 and 15 digits
  if (digits.length < 7 || digits.length > 15) return "";
  return digits;
}

function isValidPreferredTime(time) {
  const allowed = ["Morning", "Afternoon", "Evening", "First available"];
  return allowed.includes(time);
}

function isValidGender(gender) {
  const allowed = ["Female", "Male", "Non-binary", "Prefer not to say"];
  return allowed.includes(gender);
}

function isValidDate(value) {
  if (!value) return false;
  // Expect ISO date string: YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  // Reject obviously absurd dates (far future or very old)
  const year = date.getUTCFullYear();
  if (year < 1900 || year > 2100) return false;
  return true;
}

// Simple heuristic to flag obviously random-ish insurance names
function isSuspiciousInsurance(insurance) {
  const len = insurance.length;
  if (!insurance) return false;
  // Too long, single "word" with no space is suspicious
  if (len > 24 && !/\s/.test(insurance)) return true;
  // Many mixed-case segments with no spaces
  const upper = insurance.match(/[A-Z]/g) || [];
  const lower = insurance.match(/[a-z]/g) || [];
  if (upper.length > 5 && lower.length > 5 && !/\s/.test(insurance)) {
    return true;
  }
  return false;
}

// Simple form-level spam heuristic; we keep it conservative
function isSuspiciousForm(form) {
  let score = 0;

  // Names failing our stricter name rules
  if (!isValidName(form.firstName)) score += 2;
  if (!isValidName(form.lastName)) score += 2;

  // Suspicious insurance tokens
  if (isSuspiciousInsurance(form.insurance)) score += 2;

  // Phone missing or invalid
  if (!normalizePhone(form.phone)) score += 1;

  // Excessively short or noisy comments
  if (form.comments && form.comments.length < 5 && !/\s/.test(form.comments)) {
    score += 1;
  }

  // If multiple signals add up, treat as spam
  return score >= 3;
}

// Optional honeypot field check: if filled, treat as bot
function isHoneypotTripped(honeypotValue) {
  if (!honeypotValue) return false;
  return honeypotValue.trim().length > 0;
}

export async function POST(req) {
  try {
    if (!resend || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const isDev = process.env.NODE_ENV !== "production";

    // Basic Origin / Referer allowlist check to reduce cross-site abuse
    const headers = req.headers;
    const origin = headers.get("origin") || "";
    const referer = headers.get("referer") || "";
    const userAgent = headers.get("user-agent") || "";

    if (!isDev) {
      const hasAllowedOrigin = ALLOWED_HOSTS.some((host) =>
        origin.includes(host)
      );
      const hasAllowedReferer = ALLOWED_HOSTS.some((host) =>
        referer.includes(host)
      );

      if (!hasAllowedOrigin && !hasAllowedReferer) {
        console.warn("Blocked appointment request: invalid origin/referrer", {
          origin,
          referer,
        });
        return NextResponse.json(
          { success: false, error: "Invalid request origin." },
          { status: 400 }
        );
      }
    }

    // Enforce JSON payload and reject huge bodies
    const contentType = headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid content type." },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Honeypot field: add a hidden input like <input name="website" style="display:none" />
    if (isHoneypotTripped(body.website || body.url || body.homepage)) {
      console.warn("Blocked appointment request via honeypot field", {
        origin,
        referer,
        userAgent,
      });
      return NextResponse.json(
        { success: false, error: "Unable to process this request." },
        { status: 400 }
      );
    }

    // Normalize with field-specific length limits
    const form = {
      newPatient: normalize(body.newPatient || "Yes", 8),
      firstName: normalize(body.firstName, 64),
      lastName: normalize(body.lastName, 64),
      phone: normalize(body.phone, 32),
      email: normalize(String(body.email || "").toLowerCase(), 128),
      preferredTime: normalize(body.preferredTime, 32),
      preferredDate: normalize(body.preferredDate, 32),
      insurance: normalize(body.insurance, 64),
      gender: normalize(body.gender, 32),
      dob: normalize(body.dob, 32),
      comments: normalize(body.comments || "", 1024),
    };

    // Strict allowlist-style validation for all structured fields
    if (!form.firstName || !isValidName(form.firstName)) {
      return NextResponse.json(
        { success: false, error: "First name is required and must be valid." },
        { status: 400 }
      );
    }

    if (!form.lastName || !isValidName(form.lastName)) {
      return NextResponse.json(
        { success: false, error: "Last name is required and must be valid." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(form.phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Phone number is required and must contain a valid amount of digits.",
        },
        { status: 400 }
      );
    }

    if (!form.email || !isValidEmail(form.email)) {
      return NextResponse.json(
        { success: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    if (!form.preferredTime || !isValidPreferredTime(form.preferredTime)) {
      return NextResponse.json(
        {
          success: false,
          error: "Preferred time is required and must be one of the options.",
        },
        { status: 400 }
      );
    }

    if (!form.preferredDate || !isValidDate(form.preferredDate)) {
      return NextResponse.json(
        {
          success: false,
          error: "Preferred date is required and must be a valid date.",
        },
        { status: 400 }
      );
    }

    if (!form.insurance) {
      return NextResponse.json(
        { success: false, error: "Insurance is required." },
        { status: 400 }
      );
    }

    if (!form.gender || !isValidGender(form.gender)) {
      return NextResponse.json(
        {
          success: false,
          error: "Gender is required and must be one of the options.",
        },
        { status: 400 }
      );
    }

    if (!form.dob || !isValidDate(form.dob)) {
      return NextResponse.json(
        {
          success: false,
          error: "Date of birth is required and must be a valid date.",
        },
        { status: 400 }
      );
    }

    // Simple spam heuristic: block obviously fake/random submissions
    if (isSuspiciousForm(form)) {
      console.warn("Blocked suspicious appointment form", {
        form,
        origin,
        referer,
        userAgent,
      });
      // Return a generic error to bots; do not send any email
      return NextResponse.json(
        {
          success: false,
          error: "Unable to process this request.",
        },
        { status: 400 }
      );
    }

    console.log("Sending appointment form:", {
      form,
      origin,
      referer,
      userAgent,
    });

    const commentsRowHtml = form.comments
      ? `
            <tr>
              <td style="padding:10px 12px;color:#666;vertical-align:top;">Additional Comments</td>
              <td style="padding:10px 12px;white-space:pre-wrap;">${form.comments}</td>
            </tr>`
      : "";

    const staffEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: STAFF_TO_EMAIL,
      cc: STAFF_BCC_EMAILS,
      replyTo: form.email,
      subject: `New Appointment Request — ${form.firstName} ${form.lastName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;color:#18120F;">
          <h2 style="color:#18120F;margin:0 0 16px 0;">New Appointment Request</h2>

          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;color:#666;width:40%;">New Patient</td>
              <td style="padding:10px 12px;font-weight:600;">${form.newPatient}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;color:#666;">Full Name</td>
              <td style="padding:10px 12px;font-weight:600;">${form.firstName} ${form.lastName}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;color:#666;">Phone</td>
              <td style="padding:10px 12px;">${normalizedPhone}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;color:#666;">Email</td>
              <td style="padding:10px 12px;">${form.email}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;color:#666;">Preferred Date</td>
              <td style="padding:10px 12px;">${form.preferredDate}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;color:#666;">Preferred Time</td>
              <td style="padding:10px 12px;">${form.preferredTime}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;color:#666;">Insurance</td>
              <td style="padding:10px 12px;">${form.insurance}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;color:#666;">Gender</td>
              <td style="padding:10px 12px;">${form.gender}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:10px 12px;color:#666;">Date of Birth</td>
              <td style="padding:10px 12px;">${form.dob}</td>
            </tr>${commentsRowHtml}
          </table>

          <p style="color:#999;font-size:12px;margin-top:24px;">
            Sent from womenscareofbradenton.com appointment form
          </p>
        </div>
      `,
    });

    console.log("staffEmail:", staffEmail);

    if (staffEmail?.error) {
      return NextResponse.json(
        {
          success: false,
          error: staffEmail.error.message || "Failed to send staff email.",
        },
        { status: 500 }
      );
    }

    const patientCommentsHtml = form.comments
      ? `
          <div style="background:#f9f5f1;border-radius:12px;padding:16px 20px;margin:0 0 24px 0;">
            <p style="margin:0;font-size:14px;color:#555;">
              <strong>Your Notes:</strong><br />
              ${form.comments.replace(/\n/g, "<br />")}
            </p>
          </div>`
      : "";

    const patientEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: form.email,
      subject: "We received your appointment request",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;color:#18120F;">
          <h2 style="color:#18120F;margin:0 0 12px 0;">Hi ${form.firstName}, we got your request!</h2>

          <p style="color:#7A7068;line-height:1.8;margin-top:12px;">
            Thank you for reaching out to Women's Care of Bradenton.
            Our team will review your request and contact you shortly to confirm your appointment.
          </p>

          <div style="background:#f9f5f1;border-radius:12px;padding:16px 20px;margin:24px 0;">
            <p style="margin:0;font-size:14px;color:#555;">
              <strong>Preferred Date:</strong> ${form.preferredDate}<br />
              <strong>Preferred Time:</strong> ${form.preferredTime}
            </p>
          </div>
          ${patientCommentsHtml}

          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

          <p style="font-size:13px;color:#999;line-height:1.8;">
            Questions? Call us at <strong>(941) 500-3100</strong><br />
            Mon–Thu 8:00 AM – 5:00 PM · Fri 8:00 AM – 1:00 PM<br />
            4216 Cortez Rd W, Bradenton, FL 34210
          </p>
        </div>
      `,
    });

    console.log("patientEmail:", patientEmail);

    if (patientEmail?.error) {
      return NextResponse.json(
        {
          success: false,
          error:
            patientEmail.error.message ||
            "Failed to send patient confirmation email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      staffEmailId: staffEmail?.data?.id || staffEmail?.id || null,
      patientEmailId: patientEmail?.data?.id || patientEmail?.id || null,
    });
  } catch (error) {
    console.error("Appointment email error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Something went wrong while sending email.",
      },
      { status: 500 }
    );
  }
}