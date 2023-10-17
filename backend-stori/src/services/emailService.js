const nodemailer = require("nodemailer");
const { Appurl } = require("./constants");

//Using Ethereal, a fake SMTP service with a fake account that, altough don't send the email, you can see a view of it
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jayme.denesik@ethereal.email',
        pass: 'MzEyymSkd5x3wUM4Xx'
    },
    tls: {
        rejectUnauthorized: false
    }
});

/* Function to send an email to a recipient with a newsletter attachment.
 * 
 * Parameters:
 * - filename (String): The name of the attached newsletter file.
 * - newsletterDecoded (Buffer): The decoded content of the newsletter.
 * - recipient (Object): The recipient's information, including email and ID.
 * 
 * Returns:
 * - A Promise that resolves to an object containing information about the sent email.
 * - An error message in case of an error.
 */
const sendEmail = async (filename, newsletterDecoded, recipient) => {
    try {
        const html = `
            <div style="text-align: center;">
                <div style="display: inline-block;">
                    <h3>Enjoy the Newsletter!</h3>
                    <p>You are receiving a <b>newsletter</b> attached to this email!</p></br>
                    <p>(Check right upper corner)</p></br>
                    <a href="${Appurl}/unsubscribe/?id=${recipient.id}">Click to unsuscribe<a>
                </div>
            </div>
        `

        //Building the email data
        const mailOptions = {
            from: 'Juli. <jayme.denesik@ethereal.email>',
            to: recipient.email,
            subject: 'Newsletter of the day!',
            text: 'You are receiving a Newsletter attached to this email!', //plaintext in case of the html is broken
            html: html,
            attachments: [
                {
                    filename: filename,
                    content: newsletterDecoded
                },
            ],
        };
        const mailInfo = await transporter.sendMail(mailOptions);
        return mailInfo;
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    sendEmail,
};