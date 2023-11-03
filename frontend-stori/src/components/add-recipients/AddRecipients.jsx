import { useState } from 'react';
import './AddRecipients.css';
import { addRecipient } from '../../utils/services';
import TextareaAutosize from 'react-textarea-autosize';
import Button from "../button/Button";

const AddRecipients = () => {

    const [email, setEmail] = useState("")

    const handleEmailSubmit  = (event) => {
        const emailList = filterAndProcessEmailList();

        if (emailList.length === 0){
            alert("You need to add a valid email address first")
            return;
        }

        const body = { emailList } //Sending an array of emails (array of strings)
        addRecipient(body).then((response) => {
            setEmail("")
            console.log(response)
            alert("Recipients added successfully!")
        }).catch((err) => {
            console.error(err)
            alert("There was an error adding a recipient, try again...")
        })
    }

    //filtering and processing the list for separating the emails and getting rid of the ones that are not emails.
    const filterAndProcessEmailList = () => {
        const words = email.split(' '); //dividing the array of String 
        const validEmails = words.filter((word) => {
            // Validate if each word is an email address (using a regular expression)
            const regexEmailAdress = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regexEmailAdress.test(word);
        });
        return validEmails;
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    return (
        <div className="add-recipient-container">
            <div className="add-recipient-body">

                <div className='add-recipient-title'>
                    <h2>Add one or more recipients</h2>
                </div>
                <div className="add-recipient-form">
                    <span>To add multiple recipients separate the email addresses with spaces.</span>
                    <TextareaAutosize
                        id="email"
                        type="email"
                        placeholder="Add an email..."
                        value={email}
                        onChange={handleEmailChange}
                        minRows={1}
                        maxRows={30}
                    />
                    <Button text={"Add"} handleSubmit={handleEmailSubmit} disableReason={!email} />                    
                </div>
            </div>
        </div>
    );
}

export default AddRecipients;
