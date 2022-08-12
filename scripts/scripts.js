const myForm = document.getElementById('form')
const sendForm = document.getElementById('submit-button')

const sendFormHandler = (e) =>{
    e.preventDefault()
    console.log('construyendo')
    
}

sendForm.addEventListener('click', sendFormHandler)

