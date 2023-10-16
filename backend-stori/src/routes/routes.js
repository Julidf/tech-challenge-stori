const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const recipientSchema = require("../models/recipient");

/*
*   
*
*/
router.post("/add-recipient", async (request, response) => {
    try {
        const email = request.body.email;
        //Query if the recipient exists in the DB
        const existRecipient = await recipientSchema.find({ email: { $eq: email } })
        //If there is a recipient we just return that item and don't save it into the DB
        if (existRecipient.length > 0) {
            return response.json(existRecipient[0])
        }

        //If the recipient doesn't exist we insert it into the DB
        const recipient = new recipientSchema({ email })
        const data = await recipient.save()
        console.log("Recipient added!")
        response.json(data)
    } catch (error) {
        console.error(error)
        response.status(500).json({ body: "Error trying to insert a recipient: " + error.message})
    }
})

/*
*   
*
*/
router.post("/submit-newsletter", async (request, response) => {
    try {
        const newsletter = request.body.newsletter;
        const filename = request.body.filename;

        //fetching the recipients list and building the list of emails
        const recipients = await getAllRecipients();
        const recipientsEmails = recipients.map((recipient) =>  
            recipient.email
        );

        //Decoding the base64 encoded file
        const decodedString = Buffer.from(newsletter.split(',')[1], 'base64');
        
        //Using Ethereal, a fake SMTP service with a fake account
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            // secure: "true",
            auth: {
                user: 'jayme.denesik@ethereal.email',
                pass: 'MzEyymSkd5x3wUM4Xx'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // //Using my secondary google account that I never use so don't worry haha
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     // secure: "true",
        //     auth: {
        //         user: 'diazfianojulian@gmail.com',
        //         pass: 'bfoa pmwx gdtg qioi'
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        const html = `
            <div style="text-align: center;">
                <div style="display: inline-block;">
                    <h3>Enjoy the Newsletter!</h3>
                    <p>You are receiving a <b>newsletter</b> attached to this email!</p></br>
                    <a href="http://localhost:8080/unsubscribe/?email=juliandiazfiano@gmail.com">Click to unsuscribe<a>
                </div>
            </div>
        `

        //Building the email props
        const mailOptions = {
            from: 'Juli. <diazfianojulian@gmail.com>',
            to: recipientsEmails,
            subject: 'Newsletter of the day!',
            text: 'You are receiving a Newsletter attached to this email!',
            html: html,
            attachments: [
              {
                filename: filename,
                content: decodedString
              },
            ],
        };

        const mailInfo = await transporter.sendMail(mailOptions);
        response.status(200).json({ body: nodemailer.getTestMessageUrl(mailInfo)});
    } catch (error) {
        console.error("ERROR!", error.message)
        response.status(500).json({ body: "Error submiting the newsletter: " + error.message });
    }
})

router.get("/unsubscribe", async (request, response) => {
    try {
        
        const html = `
            <div style="text-align: center;">
                <div style="display: inline-block;">
                    <h1>Do you really want to unsubscribe?</h1>
                    <button><a href="http://localhost:8080/confirm-unsubscribe/?email=juliandiazfiano@gmail.com">Click to unsubscribe</a></button>
                </div>
            </div>
        `;

        response.send(html);
    } catch (error) {
        console.error(error)
        response.status(500).json({ body: "Error trying to unsubscribe: " + error.message})
    }
})

router.get("/confirm-unsubscribe", async (request, response) => {
    const html = `
        <div style="text-align: center;">
            <div style="display: inline-block;">
                <h1>Unsubscribed!</h1>
            </div>
        </div>
    `;
    try {
        const email = request.query.email;
        recipientSchema.deleteOne({ email: email }).then(() => {
            response.send(html);
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({ body: "Error confirming unsubscribing: " + error.message})
    }
})

/*
*   
*
*/
const getAllRecipients = async () => {
    try {
        const recipients = await recipientSchema.find();
        console.log("Fetching the recipients list...")
        return recipients;
    } catch (error) {
        throw new Error("Error trying to retrieve recipients: " + error.message)
    }
}

//Only for internal use. Delete later
router.get("/", async (request, response) => {
    const recipients = await getAllRecipients();
    response.send(recipients);
})

module.exports = router;