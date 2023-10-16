import React, { useEffect, useState } from 'react'
import "./ListRecipients.css"
import { getRecipientList } from '../../utils/services'

const ListRecipients = () => {

    const [recipientList, setRecipientList] = useState();

    useEffect(() => {
        loadRecipientList();
    }, [])

    const loadRecipientList = () => {
        getRecipientList().then((response) => {
            const recipientsEmails = response.map((recipient) => {
                return recipient.email;
            });
            setRecipientList(recipientsEmails)
       }).catch(error => {
            console.error(error)
       })
    }

    return (
        <div className='list-recipients-container'>
            <h2>Recipients List</h2>
            <div>
                {recipientList && recipientList.map((recipient, index) => (
                    <div key={index} className='item-list'>
                        <span>{recipient}</span>     
                    </div>   
                ))}
            </div>
        </div>
    )
}

export default ListRecipients