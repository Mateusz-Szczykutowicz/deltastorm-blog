import config from "../config";
import nodemailer from "nodemailer";

class Mail {
    private transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: false,
        tls: { rejectUnauthorized: false },
        auth: { user: config.mail.login, pass: config.mail.password },
    });
    private mailTo: string;
    private subject: string;
    private message: string;
    public constructor(mailTo: string, subject: string, message: string) {
        this.mailTo = mailTo;
        this.subject = subject;
        this.message = message;
    }
    public async sendMail() {
        await this.transporter.sendMail({
            from: `"No-Reply" <no-reply@deltastorm.pl>`,
            to: this.mailTo,
            subject: this.subject,
            html: this.message,
        });
    }
}

export default Mail;
