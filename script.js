

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-vpfFhrI4SCVHlr9ejRolu2kDWqidPEE",
  authDomain: "portfolio-contact-form-2253d.firebaseapp.com",
  projectId: "portfolio-contact-form-2253d",
  storageBucket: "portfolio-contact-form-2253d.appspot.com",
  messagingSenderId: "798138463376",
  appId: "1:798138463376:web:a84c25acfd00bc8b6f9415",
  measurementId: "G-6S74TM93E6",
  databaseURL: "https://portfolio-contact-form-2253d-default-rtdb.europe-west1.firebasedatabase.app/"
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
let messagesRef = firebase.database().ref('messages')

let theme = localStorage.getItem('theme')
let themeDots = document.getElementsByClassName('theme-dot')
let contactForm = document.getElementById('contact-form')

contactForm.addEventListener('submit', submitForm)


if(theme==null) {
    setTheme('light')
} else {
    setTheme(theme)
}

for (let i=0; i< themeDots.length; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.dataset.mode;
        setTheme(mode)
    })
}


function setTheme(mode) {
    switch (mode){
        case 'blue':
            document.getElementById('theme-style').href = 'default.css'
            break;
        case 'red':
            document.getElementById('theme-style').href = 'red.css'
            break;
        case 'green':
            document.getElementById('theme-style').href = 'green.css'
            break
        case 'purple':
            document.getElementById('theme-style').href = 'purple.css'
            break;
    }

    localStorage.setItem('theme', mode)
}

function submitForm(e){
    e.preventDefault();

    let subject = getInputVal('subject')
    let email = getInputVal('email')
    let message = getInputVal('message')

    saveMessage(subject, email, message)

    //Show alert
    document.querySelector('.alert').style.display = 'block'

    //Hide alert after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none'
    }, 3000)

    return false
}

function getInputVal(id){
    return document.getElementById(id).value
}

//Save message to firebase
function saveMessage(subject, email, message) {
    console.log('there it goes')
    let newMessageRef = messagesRef.push()
    newMessageRef.set({
        subject: subject,
        email: email,
        message: message
    })

    contactForm.reset()
}
