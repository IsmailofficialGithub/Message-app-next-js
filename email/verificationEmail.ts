export function verificationTemplate(username: string, verifyCode: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Verification Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Hello ${username},</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for registering. Please use the following verification code to complete your registration:
        </p>
        <div style="margin: 20px 0; text-align: center;">
          <span style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: #fff; font-size: 20px; border-radius: 6px;">
            ${verifyCode}
          </span>
        </div>
        <p style="font-size: 14px; color: #777;">
          If you did not request this code, please ignore this email.
        </p>
      </div>
    </body>
    </html>
  `;
}
