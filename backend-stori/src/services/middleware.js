
// Validate if each word is an email address (using a regular expression)
const validateEmails = (emailList) => {
    const validEmails = emailList.filter((word) => {
        const regexEmailAdress = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmailAdress.test(word);
    });
    return validEmails;
}

module.exports = {
    validateEmails,
};