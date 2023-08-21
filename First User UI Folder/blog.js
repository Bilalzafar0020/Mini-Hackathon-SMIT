import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, serverTimestamp, query, orderBy, deleteDoc, getDoc, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"; // Import 'where' here

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////    getting whole data from firbase   + creating dynacmmically posts               //////////////////////////




const mainDiv = document.getElementById('blogs');

async function retrieveAndDisplayData() {


     const querySnapshot = await getDocs(collection(db, "blogs"), orderBy('time', 'desc'));


//     const userUID = user.uid;
//     const userBlogsRef = collection(db, 'blogs');
// const querySnapshot = await getDocs(query(userBlogsRef, where('userId', '==', userUID), orderBy('time', 'desc')));

    // mainDiv.innerHTML = ''; // Clearing the existing posts

    querySnapshot.forEach((blogDoc) => {
      const blogData = blogDoc.data();
  
      const card = document.createElement('div');
      card.classList.add('card');
  mainDiv.appendChild(card);

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('titleDiv');
      
  let imageDiv = document.createElement('div');
  imageDiv.classList.add('imageDiv');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////    getting the image from localstorge                //////////////////////////

  let storedImageData = localStorage.getItem('imageData');
    

   let image  = document.createElement('img');
   image.classList.add('image');
   image.src =   storedImageData  || '/Assets/3d-render-cartoon-avatar-isolated_570939-71.jpg';
imageDiv.appendChild(image);

  titleDiv.appendChild(imageDiv);


  const maintitleDiv = document.createElement('div');
  maintitleDiv.classList.add('maintitleDiv');

      const FirstTitle = document.createElement('h1');
      FirstTitle.classList.add('firsttitle');
      FirstTitle.textContent = blogData.FirstTitle;
      maintitleDiv.appendChild(FirstTitle);
  
      
     let nameandDateofpostDiv = document.createElement('div');
      nameandDateofpostDiv.classList.add('nameandDateofpostDiv');

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////  geting name from local storage  

       let userName = localStorage.getItem('userName');
       
let posterName = document.createElement('h3');
posterName.classList.add('posterName');
posterName.textContent = userName || user.email;
nameandDateofpostDiv.appendChild(posterName);


let postedDate = document.createElement('h3');
postedDate.classList.add('postedDate');

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////   time when the blog was made 

let postedTime = new Date(blogData.time.seconds * 1000); // Converting Firestore serverTimestamp to JavaScript Date object
let options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
postedDate.textContent = postedTime.toLocaleDateString('en-IN', options);

nameandDateofpostDiv.appendChild(postedDate);


      maintitleDiv.appendChild(nameandDateofpostDiv);
  
titleDiv.appendChild(maintitleDiv)



      const contentDiv = document.createElement('textarea');
      contentDiv.classList.add('contentDiv');
      contentDiv.readOnly = true; // Set the textarea to be non-editable
      contentDiv.textContent = blogData.content;
  




      

      card.appendChild(titleDiv);
      card.appendChild(contentDiv); // 
      
  
    }); 
    
     
  } 


       retrieveAndDisplayData();

   


// // Add real-time listener to update posts automatically
// function setupRealtimeListener() {
//     onSnapshot(collection(db, "blogs"), (snapshot) => {
//         mainDiv.innerHTML = ''; // Clear the existing posts
//         snapshot.forEach((blogDoc) => {
//             const blogData = blogDoc.data();
//             // ... (rest of your code to create and append cards)
//         });
//     });
// }

// // Call the setupRealtimeListener function to start listening for changes
// setupRealtimeListener();






