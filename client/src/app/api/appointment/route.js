import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const STAFF_TO_EMAIL = "godigigoit@gmail.com";
const STAFF_BCC_EMAILS = ["jjothishankar@femwell.com","trilok@godigigo.com", "ajothivijayarani@femwell.com", "tkoch@femwell.com", "jarreaga@femwell.com", "v-nsanchez@femwell.com", "cgaray@femwell.com"];

const FROM_EMAIL =
  "Women's Care of Bradenton <info@womenscareofbradenton.com>";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalize(value = "") {
  return escapeHtml(String(value).trim());
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const form = {
      newPatient: normalize(body.newPatient || "Yes"),
      firstName: normalize(body.firstName),
      lastName: normalize(body.lastName),
      phone: normalize(body.phone),
      email: normalize(body.email).toLowerCase(),
      preferredTime: normalize(body.preferredTime),
      preferredDate: normalize(body.preferredDate),
      insurance: normalize(body.insurance),
      gender: normalize(body.gender),
      dob: normalize(body.dob),
    };

    if (!form.firstName) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!form.lastName) {
      return NextResponse.json(
        { success: false, error: "Last name is required." },
        { status: 400 }
      );
    }

    if (!form.phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!form.email || !isValidEmail(form.email)) {
      return NextResponse.json(
        { success: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    if (!form.preferredTime) {
      return NextResponse.json(
        { success: false, error: "Preferred time is required." },
        { status: 400 }
      );
    }

    if (!form.preferredDate) {
      return NextResponse.json(
        { success: false, error: "Preferred date is required." },
        { status: 400 }
      );
    }

    if (!form.insurance) {
      return NextResponse.json(
        { success: false, error: "Insurance is required." },
        { status: 400 }
      );
    }

    if (!form.gender) {
      return NextResponse.json(
        { success: false, error: "Gender is required." },
        { status: 400 }
      );
    }

    if (!form.dob) {
      return NextResponse.json(
        { success: false, error: "Date of birth is required." },
        { status: 400 }
      );
    }

    console.log("Sending appointment form:", form);

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
              <td style="padding:10px 12px;">${form.phone}</td>
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
            </tr>
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