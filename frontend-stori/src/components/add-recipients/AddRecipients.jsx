import { useState } from 'react';
import './AddRecipients.css';
import { addRecipient } from '../../utils/services';

const AddRecipients = () => {

    const [email, setEmail] = useState("")

    const handleEmailSubmit  = (event) => {
        event.preventDefault();
        const body = { email }
        
        addRecipient(body).then((response) => {
            setEmail("")
            console.log(response)
        }).catch((err) => {
            console.error(err)
            alert("There was an error adding a recipient, try again...")
        })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    return (
        <div className="add-recipient-container">
            <div className="add-recipient">
                <h2>Insert the recipient email</h2>
                <form onSubmit={handleEmailSubmit} className="add-recipient-form">
                    <label htmlFor="email"/>
                    <textarea
                        id="email"
                        type="email"
                        placeholder="Add an email..."
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="submit" className="btn add-recipient-button">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddRecipients;
