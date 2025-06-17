import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'myownmemories143@gmail.com', 
        pass: 'jfot mmul ijpl gaid' 
    }
});
export async function sendEmail(to, subject, text) {
    try {
        const mailOptions = {
            from: 'myownmemories143@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}