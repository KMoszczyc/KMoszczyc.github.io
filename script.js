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
    setTheme('blue')
} else {
    setTheme(theme)
}

for (let i=0; i< themeDots.length; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.dataset.mode;
        setTheme(mode)
    })
}

/**
 * Sets the color theme for the page
 * @param {string} mode 
 */
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

/**
 * Gathers info from form and clears it after sending.
 * @param {Event} e 
 * @returns false - to prevent the form from reloading the page
 */
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

/**
 * Extracts value from an input field.
 * @param {string} id 
 * @returns 
 */
function getInputVal(id){
    return document.getElementById(id).value
}

/**
 * Sends form to firebase realtime database for future processing. 
 * The form gets send to my email by firebase serverless function that listenes to changes in db.
 * @param {string} subject 
 * @param {string} email 
 * @param {string} message 
 */
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
