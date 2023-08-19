import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc, serverTimestamp, query, orderBy,deleteDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  if user logout than what to do  //////////////////////////


// auth.onAuthStateChanged((user) => {
//     if (user) {
//       document.getElementById('mainContent').style.display = 'block';
//       document.getElementById('logo').style.display = 'flex';
//     } else {
//       document.getElementById('mainContent').style.display = 'none';
//       document.getElementById('logo').style.display = 'none';
//     }
//   });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// for text area    //////////////////////////



let textarea = document.getElementById('textarea');

const maxCharacters = 400;  // 415 

textarea.addEventListener('input', () => {
  //  for text lenght
  if (textarea.value.length > maxCharacters) {
    textarea.value = textarea.value.substring(0, maxCharacters); 
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////
//////////////// for blog creation    //////////////////////////

let postButton = document.getElementById('publish');

postButton.addEventListener('click', ()=>{

    let user = auth.currentUser;

    let title = document.getElementById('title').value;
    
    let secondTitle =  document.getElementById('textarea');
    
    let secondTitleValue = secondTitle.value; 
    
    

    if(user) {

        if(textarea.value.trim() === '' ){
          showAlert('Please enter some content to post');
          return 
        }

        // let defaultProfilePic = 'base 64'
         
        let inputData = {
            FirstTitle: title,
             content : secondTitleValue,
             time: serverTimestamp(),
            //  userId: user.uid, //  the user's UID along with the post data
            //  userName: user.displayName || user.providerData[0].displayName || user.email,
            //  userProfilePic: user.photoURL || defaultProfilePic,
          };
    
      addDoc(collection(db, "blogs"),inputData)
      .then(() => {
    
         showAlert(' Blog Posted');
      retrieveAndDisplayData();
        // setTimeout(() => {
        //   showAlert('Posted');
        //   setTimeout(() => {
        //     window.location.href = '../Threads.html';
        // //   }, 1000); // for alert
        // }, 1000);  // for redirection
    
      })
      .catch((error) => {
        console.error('Error posting blog:', error);

        setTimeout( showAlert(`You have'nt log-in/log-out yourself from this app.please login again to add post`)
        , 5000);
    })
}

else{
    showAlert('You need to be login to post');
}
      

})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////    getting whole data from firbase   + creating dynacmmically posts               //////////////////////////



const mainDiv = document.getElementById('blogs');

async function retrieveAndDisplayData() {
     const querySnapshot = await getDocs(collection(db, "blogs"), orderBy('time', 'desc'));
//     const user = auth.currentUser;

//     if (!user) {
//         return; // Exit if user is not logged in
//     }

//     const userUID = user.uid;
//     const userBlogsRef = collection(db, 'blogs');
//     console.log(userUID);
//     const querySnapshot = await getDocs(query(userBlogsRef, where('userId', '==', userUID), orderBy('time', 'desc')));
  
// console.log('userid',userUID);
    querySnapshot.forEach((blogDoc) => {
      const blogData = blogDoc.data();
  
      const card = document.createElement('div');
      card.classList.add('card');
  mainDiv.appendChild(card);

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('titleDiv');
      
  let imageDiv = document.createElement('div');
  imageDiv.classList.add('imageDiv');

   let image  = document.createElement('img');
   image.classList.add('image');
   image.src = '/Assets/3d-render-cartoon-avatar-isolated_570939-71.jpg';
imageDiv.appendChild(image);

  titleDiv.appendChild(imageDiv);



      const FirstTitle = document.createElement('h1');
      FirstTitle.classList.add('firsttitle');
      FirstTitle.textContent = blogData.FirstTitle;
      titleDiv.appendChild(FirstTitle);
  
      const contentDiv = document.createElement('textarea');
      contentDiv.classList.add('contentDiv');
      contentDiv.readOnly = true; // Set the textarea to be non-editable
      contentDiv.textContent = blogData.content;
  

   let buttonsDiv = document.createElement('div');
buttonsDiv.classList.add('buttonsDiv');


      let deleteButton = document.createElement('button');
          deleteButton.classList.add('deleteButton');
          deleteButton.textContent = 'Delete';
          buttonsDiv.appendChild(deleteButton);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////   delete functionality            //////////////////////////

deleteButton.addEventListener('click', () => {
    // Show a confirmation alert using SweetAlert
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this post!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                
                await deleteDoc(doc(db, "blogs", blogDoc.id));
                Swal.fire(
                    'Deleted!',
                    'Your post has been deleted.',
                    'success'
                );
                mainDiv.innerHTML = ''; // Clear the existing posts
                retrieveAndDisplayData(); // Fetch and display updated posts
            } catch (error) {
                console.error('Error deleting blog:', error);
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the post.',
                    'error'
                );
            }
        }
    });
});




      let editButton = document.createElement('button');
      editButton.classList.add('editButton');
      editButton.textContent = 'Edit';
      buttonsDiv.appendChild(editButton);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////   edit functionality            //////////////////////////


// Edit functionality
editButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Edit Post',
        html: `
            <input id="editTitle" type="text" value="${blogData.FirstTitle}" class="swal2-input" placeholder="Title">
            <textarea id="editContent" class="swal2-textarea" placeholder="Content">${blogData.content}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const editedTitle = document.getElementById('editTitle').value;
            const editedContent = document.getElementById('editContent').value;
            try {
                await updateDoc(doc(db, 'blogs', blogDoc.id), {
                    FirstTitle: editedTitle,
                    content: editedContent,
                });
                Swal.fire(
                    'Updated!',
                    'Your post content has been updated.',
                    'success'
                );
                mainDiv.innerHTML = ''; 
                retrieveAndDisplayData(); 
            } catch (error) {
                console.error('Error updating blog content:', error);
                Swal.fire(
                    'Error!',
                    'An error occurred while updating the content.',
                    'error'
                );
            }
        }
    });
});


      card.appendChild(titleDiv);
      card.appendChild(contentDiv);
      card.appendChild(buttonsDiv)
  
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






