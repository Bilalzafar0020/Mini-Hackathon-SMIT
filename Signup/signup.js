
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBXcclnEkpLh_DnKT77N7KZLbAVomgSdTs",
    authDomain: "saylani-mini-hackathon.firebaseapp.com",
    projectId: "saylani-mini-hackathon",
    storageBucket: "saylani-mini-hackathon.appspot.com",
    messagingSenderId: "1084263211602",
    appId: "1:1084263211602:web:092b1c010d658ac754f58b",
    measurementId: "G-127WQTELPY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  // alert message 
  function showAlert(message) {
    const alertContainer = document.getElementById('alertContainer');
  
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;
  
    alertContainer.appendChild(alert);
  
    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 2000);
  }

  
// responsiveness of  alert 
window.addEventListener('scroll', function () {
  const alertContainer = document.getElementById('alertContainer');
  const alert = alertContainer.querySelector('.alert');
  if (alert) {
    const alertHeight = alert.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowBottom = scrollTop + windowHeight;

    if (windowBottom > alertContainer.offsetTop + alertHeight) {
      alert.classList.add('sticky');
    } else {
      alert.classList.remove('sticky');
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////  validations


// name 

let FnameValidation = document.getElementById('Fname');

FnameValidation.addEventListener("input", function() {
  let maxLength = 20;
  
  if (FnameValidation.value.length > maxLength) {
    FnameValidation.value = FnameValidation.value.substring(0, maxLength);
    showAlert("Maximum 20 characters can be written");
  }
});


// last name 

let LnameValidation = document.getElementById('Lname');

LnameValidation.addEventListener("input", function() {
  let maxLength = 20;
  
  if (LnameValidation.value.length > maxLength) {
    LnameValidation.value = LnameValidation.value.substring(0, maxLength);
    showAlert("Maximum 20 characters can be written");
  }
});






// // password validation function


let passwordValidion = document.getElementById('password');

    passwordValidion.addEventListener('input', ()=>{    
  const passwordInput = document.getElementById('password');
  const password = passwordInput.value;

  // Regular expressions to check for uppercase and lowercase letters
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;

  // Checking if the password contains at least one uppercase and one lowercase letter
  if (uppercaseRegex.test(password) && lowercaseRegex.test(password)) {
    passwordInput.setCustomValidity(''); // Resetting custom validation message
  } else {
    passwordInput.setCustomValidity('Password must include both uppercase and lowercase letters.');
  }

})




// // confirm  password validation function

let confirmPasswordInput = document.getElementById('Rpassword');


confirmPasswordInput.addEventListener('input',()=>{

// getting values
let passwordValidionValue = passwordValidion.value;
let confirmPasswordInputValue = confirmPasswordInput.value;


if(confirmPasswordInputValue === passwordValidionValue){
  confirmPasswordInput.setCustomValidity(''); // all set 
}
else{
  confirmPasswordInput.setCustomValidity('Password does not match'); 
}

})



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////  creating account through firebase

  const signupForm = document.querySelector('#inputs');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value;

  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

   showAlert('Account created Successfully');     
//  now email will be send to user using  onAuthstatechanged 
        sendEmailVerification(userCredential.user);
        showAlert('Verification email has been sent. Please check your inbox.')
      })
      .catch((error) => {

        var errorCode = error.code;
        
        showAlert(errorCode)
      });


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////   seting local storage for name 

         let FirstuserName = document.getElementById('Fname').value;
         let LastuserName = document.getElementById('Lname').value;

     let combineName = FirstuserName + '' + LastuserName;

     let userName = combineName;

console.log('console',userName);
 localStorage.setItem('userName',userName);

  });




////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////   google login 



// const provider = new GoogleAuthProvider();

//  let google = document.getElementById('google');

//  google.addEventListener('click', ()=>{
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//     window.location.href = '../Loader.html';
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

// })






