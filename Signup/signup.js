
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"; // Import Storage functions

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
  const db = getFirestore(app);
  const storage = getStorage(app);

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



  let fileInput = document.getElementById('file');
  fileInput.addEventListener('change', function(event) {

      const selectedFile = event.target.files[0];
if (selectedFile) {
      console.log('file uploaded');
  }

});
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
    .then( async (userCredential) => {

   showAlert('Account created Successfully');     
//  now email will be send to user using  onAuthstatechanged 
        sendEmailVerification(userCredential.user);
        showAlert('Verification email has been sent. Please check your inbox.')



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/// adding user name and image to new document users



//  the user's UID
const userUid = userCredential.user.uid;



let FirstuserName = document.getElementById('Fname').value;
let LastuserName = document.getElementById('Lname').value;

let combineName = FirstuserName + '' + LastuserName;
console.log(combineName);
//  the selected image file
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      // Uploading the image file to Firebase Storage
      const storageRef = ref(storage, `userImages/${userUid}/${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Creating a user document in the Firestore "users" collection
      const userDocRef = doc(db, 'users', userUid);

      const userData = {
        userName: combineName,
        imageUrl: imageUrl, 
       
      };

      await setDoc(userDocRef, userData);
    }


      })
      .catch((error) => {

        var errorCode = error.code;
        
        showAlert(errorCode)
      });


  });


