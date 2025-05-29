const nodemailer = require('nodemailer');

export class EmailService {
    static async sendEmail(
        to: string,
        subject: string,
        text: string,
        isHtml: boolean = false,
    ) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: isHtml ? undefined : text,
            html: isHtml ? text : undefined,
        };

        await transporter.sendMail(mailOptions);
    }

    static async sendOtpEmail(to: string, otp: string) {
        const subject = 'Your OTP for account recovery';
        const text = `
        <style>
            body {
                background-color: #f0f0f0;
            }
            h1 {
                color: #333;
                text-align: center;
            }
            p {
                color: #333;
                text-align: center;
            }
        </style>
        <h1>Your OTP for account recovery</h1>
        <p>Your OTP is ${otp}</p>
        <p>Please enter this OTP to recover your account</p>
        <p>This OTP will expire in 10 minutes</p>
        <p>If you did not request this OTP, please ignore this email</p>
        <p>Best regards</p>
        <p>DTP cosmetic store</p>
        `;
        await this.sendEmail(to, subject, text, true);
    }

    static async sendResetPasswordEmail(to: string, token: string) {
        const subject = 'Reset your password';
        const html = `
        <style>
            body {
                background-color: #f0f0f0;
            }
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
            p {
                color: #333;
                text-align: center;
            }
        </style>
        <h1>Reset your password</h1>
        <p>Please enter this link to reset your password: <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset password</a></p>
        <p>This link will expire in 10 minutes</p>
        <p>If the link is not working, please copy and paste the link into your browser</p>
        <p>Link: ${process.env.FRONTEND_URL}/reset-password?token=${token}</p>
        <p>If you did not request this link, please ignore this email</p>
        <p>Best regards</p>
        <p>DTP cosmetic store</p>
        `;
        await this.sendEmail(to, subject, html, true);
    }

    static async sendEmailWithTemplate(
        to: string,
        subject: string,
        text: string,
    ) {
        const finalText = `
        <style>
            body {
                background-color: #f0f0f0;
            }
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
            p {
                color: #333;
                text-align: center;
            }
        </style>
        <h1>${subject}</h1>
        ${text}
        <p>Best regards</p>
        <p>DTP cosmetic store</p>
        `;
        await this.sendEmail(to, subject, finalText, true);
    }
}
