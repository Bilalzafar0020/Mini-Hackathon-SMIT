import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, serverTimestamp, query, orderBy, deleteDoc, getDoc, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"; // Import 'where' here
// import {
//   getDownloadURL,
//   uploadBytes,
//   ref,
// } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

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

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  logout   //////////////////////////


let logout = document.getElementById('logout');

logout.addEventListener('click', ()=>{
  signOut(auth)
  .then(() => {
showAlert('Log outing you please wait....')


const alertContainer = document.getElementById('alertContainer');

setTimeout( ()=>{ alertContainer.style.display  = 'none' },9000);

   setTimeout( ()=>{  window.location.href = '../../index.html' } ,2000 );

  })
  .catch((error) => {
    showAlert(error);
  });
  


})









// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const q = query(collection(db, "users"), where("user", "==", user.uid));

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       getDownloadURL(ref(storage, doc.data().email)).then((url) => {
//         console.log(url);
//         document.querySelector(".profile-container").innerHTML = `
//         <div class="image">
//         <img src='${url}'  style="position:relative;"/>
        
//         <input type="file" style="display: none" id="updateFile" onChange="updateFile('${
//           doc.id
//         }')" />
//         <label for="updateFile"><i class="fa-solid fa-pen" style="color : #7749f8; position:absolute;font-size:20px;cursor:pointer; bottom:290px;left:270px;"></i></label>
//         </div>
//         <h1 style="display:flex;" id="${doc.id}-name">${
//           doc.data().first_name
//         } ${
//           doc.data().last_name
//         }   <i class="fa-solid fa-pen" onclick="updateNamInput('${
//           doc.data().first_name
//         }','${doc.data().last_name}','${
//           doc.id
//         }')" style="color : #7749f8; font-size:20px;margin-left:10px;margin-top:10px;cursor:pointer"></i></h1>
      
//             <h1>Password</h1>
//             <input type="text" id="old-password" placeholder="Old password" />
//             <input type="text" id="p"  placeholder="New password" />
//             <input type="text" id="uP" placeholder="Repeat password" />
//             <button id="updatePasswor">Update Password</button>
//         `;
//         document.getElementById("updatePasswor").addEventListener("click", () => {
//           // window.updatePassword = () => {
//           const user = auth.currentUser;
//           const newPassword = document.getElementById("uP").value;
//           const password = document.getElementById("p").value;
//           if (password == newPassword) {
//             updatePassword(user, newPassword)
//               .then(() => {
//                 console.log("done");
//               })
//               .catch((error) => {
//                 console.log(error);
//               });
//           }
//           // };
//         });
//         document.getElementById("old-password").value = doc.data().password;
//       });
//       document.querySelector("#profile").innerHTML = `${
//         doc.data().first_name
//       }  ${doc.data().last_name}`;
     
//     });
//     window.updateFile = () => {
//       const storageRef = ref(storage, user.email);
//       uploadBytes(
//         storageRef,
//         document.getElementById("updateFile").files[0]
//       ).then((snapshot) => {
//         console.log("Uploaded a blob or file!");
//         window.location.reload();
//       });
//     };
//     window.updateNamInput = (first, last, id) => {
//       console.log("asdas");
//       document.getElementById(
//         `${id}-name`
//       ).innerHTML = `<div style="display:flex"><input id="${id}-value" value="${first} ${last}" />  <i class="fa-solid fa-pen" onclick="updateName('${id}')" style="color : #7749f8; font-size:20px;cursor:pointer; margin-left:10px;margin-top:10px; "></i></div>`;
//     };
//     window.updateName = async (id) => {
//       const washingtonRef = doc(db, "users", id);

//       await updateDoc(washingtonRef, {
//         first_name: document.getElementById(`${id}-value`).value,
//       });
//       window.location.reload();
//     };
//   } else {
//     console.log("sad");
//   }
// });