import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import "./CreateNewsletter.css"
import { postNewsletter } from '../../utils/services';
import Loader from '../loader/Loader';
import TextareaAutosize from 'react-textarea-autosize';
import Button from "../button/Button";

const CreateNewsletter = () => {

    const [newsletterData, setNewsletterData] = useState({})
    const [htmlNewsletter, setHtmlNewsletter] = useState("")
    const [subject, setSubject] = useState("")
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
                    attachment: b64EncodedString
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
        //Validating that there is a newsletter in html format
        if (htmlNewsletter || subject) {

            setSendingNewsletter(true)
            //Sending the file name with its path and a base 64 enconded String to the backend as the newletter (It will need to be decoded)
            const body = {
                attachment: newsletterData,
                html: htmlNewsletter,
                subject: subject,
            };

            console.log(body)

            postNewsletter(body).then((response) => {
                setNewsletterData({})
                console.log(response)
                alert(`Newsletter successfully sent!, you can see the email on this link: ${response.body}`);
                window.open(response.body, '_blank');
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally( () => {
                setSendingNewsletter(false)
            })
        } else {
            alert("You need to write the HTML Newsletter and the Subject first")
        }
    }
    
    return (
        <div className='create-newsletter-container'>
            <div className='create-newsletter-body'>
                <div className='create-newsletter-title'>
                    <h2>Create your Newsletter</h2>
                </div>
                <div className='create-newssletter-form'>
                    <span>Insert the Subject of the email</span>
                    <input 
                        placeholder='Insert the Subject'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <span>Insert the HTML. You can use a tool like <a href='https://editorhtmlonline.com/' target='_blank' rel="noopener">EditorHTMLOnline.com</a></span>
                    <TextareaAutosize
                        id="email"
                        type="email"
                        placeholder="Insert the HTML of the newsletter"
                        value={htmlNewsletter}
                        onChange={(e) => setHtmlNewsletter(e.target.value)}
                        minRows={9}
                        maxRows={30}
                    />
                </div>
                <div className='create-newsletter-attachment'>
                    <h2>Upload an attachment</h2>
                    <span>Only accept PDF or PNG files</span>
                    {newsletterData?.filename && (
                    <div className='file-info'>
                        <span>{newsletterData.filename}</span>
                    </div>)}
                    <div {...getRootProps()} className='upload-section'>
                        <input {...getInputProps()} />
                        <img 
                            src='./upload.png' 
                            alt="upload" 
                            width={32}   
                        />
                        <h5>Click to upload</h5>
                    </div>
                </div>

                {sendingNewsletter && (<Loader text={"sending..."}/>)}
                <div className='submit-newsletter--btn'>
                    <Button text={"Submit"} handleSubmit={submitNewsletter} />                    
                </div>
            </div>
        </div>
    )
}

export default CreateNewsletter