import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged  ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  
  
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
  

// Sticky alert   
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


const loginForm = document.getElementById('inputs');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');



  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
  
    const email = emailInput.value
    const password = passwordInput.value
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
 
      if (userCredential.user.emailVerified) {
        // Redirect to second.html if email is verified
        window.location.href = "../Signup/signup.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
        // alert(errorCode);
        showAlert(errorCode)

      });
  });
  


//  provide login user all data 
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
});


  

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////        Login with google 



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
//     window.location.href = 'second.html';
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



  //  for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../Signup/signup.html'; // ./third%20Page/third.html
         },2000)
        
       
      }
    });
    
  })