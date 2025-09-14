import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/apiResponce";
import { verificationTemplate } from "../../email/verificationEmail"; // 👈 import template

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    const emailUser = process.env.NODEMAILER_EMAIL_USER;
    const emailPass = process.env.NODEMAILER_EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return { success: false, message: "Email configuration is missing" };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const htmlContent = verificationTemplate(username, verifyCode);

    await transporter.sendMail({
      from: `"True Feedback" <${emailUser}>`,
      to: email,
      subject: "Mystery Message || Verification Code",
      html: htmlContent,
    });

    return { success: true, message: "Email Verification sent successfully" };
  } catch (error) {
    console.error("Error in Sending Verification Message", error);
    return { success: false, message: "Error in Sending Verification Message" };
  }
}
