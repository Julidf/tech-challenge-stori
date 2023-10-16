import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import "./CreateNewsletter.css"
import { postNewsletter } from '../../utils/services';

const CreateNewsletter = () => {

    const [newsletterData, setNewsletterData] = useState({})
    const [sendingNewsletter, setSendingNewsletter] = useState(false)

    const onDrop = useCallback (acceptedFiles => {
        try {
            const file = acceptedFiles[0] //Only capturing the first file if the user selects more than one
            const reader = new FileReader() //Creating an instance of FileReader
            //Defining the onload event
            reader.onload = () => { 
                const b64EncodedString = reader.result
                setNewsletterData({
                    filename: file.path,
                    newsletter: b64EncodedString
                })
            }
            reader.readAsDataURL(file) //Reading the file as a base64 encoded String and executing the onload
        } catch (error) {
            alert("Invalid File")
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            //Only accepting PDF and PNG files
            "image/png": [".png"],
            "application/pdf": [".pdf"]
        }
    });

    const submitNewsletter = () => {
        if (newsletterData) {
            setSendingNewsletter(true)
            //Sending the file name with its path and a base 64 enconded String to the backend as the newletter (It will need to be decoded)
            const body = newsletterData;
            console.log(body)

            postNewsletter(body).then((response) => {
                setNewsletterData()
                console.log(response)
                alert(`Newsletter successfully sent!, you can see the email on this link: ${response.body}`);
                // window.open(response.body, '_blank');
            })
            .catch((error) => {
                console.error(error)
                alert("There was an error trying to upload the Newsletter, try again...")
            })
            .finally( () => {
                setSendingNewsletter(false)
            })
        } else {
            alert("You need to upload the Newsletter first")
        }
    }
    
    return (
        <div className='create-newsletter-container'>
            <div>
                <h2>Upload your Newsletter</h2>
            </div>
            <div {...getRootProps()} className='upload-section'>
                <input {...getInputProps()} />
                <img 
                    src='./upload.png' 
                    alt="upload" 
                    width={32}   
                />
                <h5>Click to upload</h5>
            </div>
            {sendingNewsletter && (<div className='loading-container'>
                <div className="loader"></div>
                <div className='loading-text'>sending...</div>
            </div>)}
            <div className='submit-newsletter'>
                <button type='button' onClick={submitNewsletter} className='btn submit-newsletter-btn'>Submit</button>
            </div>
        </div>
    )
}

export default CreateNewsletter