import { Resend } from "resend";
import { env, isResendConfigured } from "@/lib/env";
import { formatCents } from "@/lib/money";

/** Email abstraction so the provider (Resend → Postmark, SES, …) can be swapped. */
export interface EmailSender {
  sendDownloadEmail(input: DownloadEmailInput): Promise<void>;
}

export interface DownloadEmailItem {
  name: string;
  priceCents: number;
  downloadUrl: string;
}

export interface DownloadEmailInput {
  to: string;
  orderId: string;
  items: DownloadEmailItem[];
  expiresInHours: number;
}

function renderHtml(input: DownloadEmailInput): string {
  const rows = input.items
    .map(
      (i) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;">
          <strong style="color:#1a1230;">${escapeHtml(i.name)}</strong><br/>
          <a href="${i.downloadUrl}" style="color:#7c4dff;font-weight:600;">Download your files →</a>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;color:#555;">
          ${formatCents(i.priceCents)}
        </td>
      </tr>`,
    )
    .join("");

  return `
  <div style="font-family:Poppins,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    <h1 style="font-size:22px;color:#1a1230;">🐾 Thank you for your order!</h1>
    <p style="color:#444;">Your cozy stream overlays are ready. Your download links are below
    and are valid for <strong>${input.expiresInHours} hours</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">${rows}</table>
    <p style="color:#888;font-size:13px;">Order ref: ${escapeHtml(input.orderId)}</p>
    <p style="color:#888;font-size:13px;">Lost your links? Just reply to this email and we'll re-send them.</p>
    <p style="color:#b088ff;font-weight:700;margin-top:24px;">CozyOverlays · CozyJsStudio</p>
  </div>`;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );
}

class ResendEmailSender implements EmailSender {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(env.resendApiKey!);
  }
  async sendDownloadEmail(input: DownloadEmailInput): Promise<void> {
    await this.resend.emails.send({
      from: env.emailFrom,
      to: input.to,
      subject: "Your CozyOverlays download links 🐾",
      html: renderHtml(input),
    });
  }
}

/** Fallback when Resend isn't configured: log so local flows still complete. */
class ConsoleEmailSender implements EmailSender {
  async sendDownloadEmail(input: DownloadEmailInput): Promise<void> {
    console.info(
      `[email:stub] Would send ${input.items.length} download link(s) to ${input.to}:`,
      input.items.map((i) => `${i.name} -> ${i.downloadUrl}`),
    );
  }
}

let sender: EmailSender | null = null;

export function getEmailSender(): EmailSender {
  if (!sender) {
    sender = isResendConfigured
      ? new ResendEmailSender()
      : new ConsoleEmailSender();
  }
  return sender;
}
