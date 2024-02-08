Tech challenge. Newsletter sending application.


***
I followed the next requirements: 

1. Admin user can upload a pdf or png image
2. Email is personalized and using html format
3. Admin user can submit an email list of recipients of the newsletter
4. Admin user can add a single email to the recipient list
5. Admin user can click a button to trigger the newsletter submission
6. PDF of png document should be attached to the email
7. Recipient users can click a "unsubscribe" link contained in the email, the user should not receive
any more emails

## Table of Contents
- [Technologies](#technologies)
- [Installation and Running](#installation)
- [UI Usage](#usage)
- [API](#api)

## Technologies
** For the frontend I used React
** For the Backend I used Node.js, Express.js and MondoDB with mongoose
** For sending the email I used NodeMailer and Ethereal (a fake SMTP that provides you with a preview of the fake email you are sending)
It also works perfectly fine with Gmail service:

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     auth: {
    //         user: '@gmailaddress',
    //         pass: 'application password previously generated'
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

## Installation And Running

First you will need to enter to the directory for both the /backend-stori and the /frontend-stori and install de dependencies with "npm install" command.

The application is running with docker so you will need to have open Docker Desktop.
Make sure you are in the root directory "./tech-challenge-stori".

Command for running the app:
```
docker compose up
```

Command for stopping the app:
```
docker compose down
```

## UI Usage
Basically there are two main sections:
--Adding a list of recipients or a single recipient--
    You have to enter a list/single email address and click "Add".
    If you enter more than email address you will need to separate with a space after one email address.
    
--Sending the newsletter--
    First you will need to upload the newsletter and then clicking in "Submit"
    
This actions will add recipients into the Database and after uploading and submiting the newsletter, It will trigger an action that will send to every recipient an email with a static html and the newsletter attached.
The user that receives the email can click on "unsubscribe" button to start the unsubscription flow and delete itself from the database.

## API
/add-recipient - **Endpoint to add recipients to the database.**
    Receives:
    -Body: emailList (an array of email addresses to add as recipients).
    Returns:
    -Status 200 if the operation is successful.
    -JSON response with an array of recipients that were successfully added to the database.
    -Status 500 in case of an error, along with an error message.
 
/submit-newsletter - **Endpoint to send a newsletter to recipients.**
    Receives:
    -Body: newsletter (base64 encoded newsletter content) and filename (the name of the file).
    Returns:
    -Status 200 if the operation is successful.
    -JSON response with a preview of the first email sent, including a link to the preview.
    -Status 500 in case of an error, along with an error message.

/unsubscribe - **Endpoint to display an unsubscribe confirmation page.**
    Receives:
    -Query parameter: id (The recipient's unique identifier for confirmation).
    Returns:
    -HTML response with a confirmation message and a link to confirm the unsubscribe.
    -Status 500 in case of an error, along with an error message.

/confirm-unsubscribe - **Endpoint to confirm and process the unsubscribe request.**
    Receives: 
    -Query parameter: id (The recipient's unique identifier for confirmation).
    Returns: 
    -HTML response with a confirmation message after processing the unsubscribe.
    -Status 500 in case of an error, along with an error message.



***
