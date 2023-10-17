const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const recipientSchema = require("../models/recipient");
const { validateEmails } = require("../services/middleware");
const { sendEmail } = require("../services/emailService");
const { Appurl } = require("../services/constants");

/* Endpoint to add recipients to the database.
 * 
 * Receives:
 * - Body: emailList (an array of email addresses to add as recipients).
 * 
 * Returns:
 * - JSON response with an array of recipients that were successfully added to the database.
 * - Status 500 in case of an error, along with an error message.
 */
router.post("/add-recipient", async (request, response) => {
    try {
        const emailList = request.body.emailList;

        //Validate that there are no duplicate email addresses using a Set
        const uniqueEmails = new Set(emailList);
        //Convert the set back into an array
        const uniqueEmailsNotValidated = Array.from(uniqueEmails);
        //Validating only unique emails
        const validEmails = validateEmails(uniqueEmailsNotValidated);

        console.log(validEmails)

        let recipientsAdded = []
        await Promise.all(validEmails.map(async (email) => {     
            //Query if the recipient exists in the DB
            const existRecipient = await recipientSchema.find({ email: { $eq: email } })

            //If the recipient doesn't exist we save it into the DB
            if (existRecipient.length === 0) {
                const recipient = new recipientSchema({ email })
                recipientsAdded.push(await recipient.save())
                console.log("Recipient added!")
            }
        }));
        console.log("Lista de recipients: ", recipientsAdded)
        response.json(recipientsAdded)
    } catch (error) {
        console.error(error)
        response.status(500).json({ body: "Error trying to insert a recipient: " + error.message})
    }
})

/* Endpoint to send a newsletter to recipients.
 * 
 * Receives:
 * - Body: newsletter (base64 encoded newsletter content) and filename (the name of the file).
 * 
 * Returns:
 * - Status 200 if the operation is successful.
 * - JSON response with a preview of the first email sent, including a link to the preview.
 * - Status 500 in case of an error, along with an error message.
 */
router.post("/submit-newsletter", async (request, response) => {
    try {
        const newsletter = request.body.newsletter;
        const filename = request.body.filename;

        if(!newsletter) {
            throw new Error("There isn't a newsletter to send")
        }

        const newsletterDecoded = Buffer.from(newsletter.split(',')[1], 'base64'); //Decoding the base64 encoded file

        //fetching the recipients list
        const recipientList = await getAllRecipients();
        
        if (recipientList.length <= 0) {
            throw new Error("There aren't recipients to send the email")
        }

        //sending the email for each recipient on the recipient list
        const mailInfoArray = await Promise.all(recipientList.map(async (recipient, index) => {
            return await sendEmail(filename, newsletterDecoded, recipient);
        }));
          
        response.status(200).json({ body: nodemailer.getTestMessageUrl(mailInfoArray[0])}); //returning a preview of the first email sended.
    } catch (error) {
        console.error("ERROR!", error.message)
        response.status(500).json({ body: "Error submiting the newsletter: " + error.message });
    }
})

/* Endpoint to display an unsubscribe confirmation page.
 * 
 * Receives:
 * - Query parameter: id (The recipient's unique identifier for confirmation).
 * 
 * Returns:
 * - HTML response with a confirmation message and a link to confirm the unsubscribe.
 * - Status 500 in case of an error, along with an error message.
 */
router.get("/unsubscribe", async (request, response) => {
    try {
        const id = request.query.id;
        const html = `
            <div style="text-align: center;">
                <div style="display: inline-block;">
                    <h1>Do you really want to unsubscribe?</h1>
                    <button><a href="${Appurl}/confirm-unsubscribe/?id=${id}">Click to unsubscribe</a></button>
                </div>
            </div>
        `;

        response.send(html);
    } catch (error) {
        console.error(error)
        response.status(500).json({ body: "Error trying to unsubscribe: " + error.message})
    }
})

/* Endpoint to confirm and process the unsubscribe request.
 * 
 * Receives:
 * - Query parameter: id (The recipient's unique identifier for confirmation).
 * 
 * Returns:
 * - HTML response with a confirmation message after processing the unsubscribe.
 * - Status 500 in case of an error, along with an error message.
 */
router.get("/confirm-unsubscribe", async (request, response) => {
    const html = `
        <div style="text-align: center;">
            <div style="display: inline-block;">
                <h1>Unsubscribed!</h1>
            </div>
        </div>
    `;
    try {
        const id = request.query.id;
        console.log(id)
        recipientSchema.deleteOne({ _id: id }).then(() => {
            response.send(html);
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({ body: "Error confirming unsubscribing: " + error.message})
    }
})

// Fetching all the recipients from the Database
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