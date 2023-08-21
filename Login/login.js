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
        window.location.href = "../Blogs/All blogs/blog.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
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


  


  //  for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../Blogs/All blogs/blog.html'; 
         },2000)
        
       
      }
    });
    
  })

/*
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
        window.location.href = "../Blogs/All blogs/blog.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
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


  


  //  for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../Blogs/All blogs/blog.html'; 
         },2000)
        
       
      }
    });
    
  })  
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
        window.location.href = "../Blogs/All blogs/blog.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
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


  


  //  for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../Blogs/All blogs/blog.html'; 
         },2000)
        
       
      }
    });
    
  })import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
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
        window.location.href = "../Blogs/All blogs/blog.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
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


  


  //  for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../Blogs/All blogs/blog.html'; 
         },2000)
        
       
      }
    });
    
  })import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
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
        window.location.href = "../Blogs/All blogs/blog.html";
      } else {
        showAlert('Please verify your email before logging in.')
      }

      })
      .catch((error) => {
        const errorCode = error.code;
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


  


  //  for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../Blogs/All blogs/blog.html'; 
         },2000)
        
       
      }
    });
    
  })
*/



