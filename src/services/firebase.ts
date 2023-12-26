import { initializeApp } from 'firebase/app'
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/database';
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyChiLomqBdTGp0W3FvSjZtLLKd9QsXyBAg",
  authDomain: "movie-list-c2441.firebaseapp.com",
  projectId: "movie-list-c2441",
  storageBucket: "movie-list-c2441.appspot.com",
  messagingSenderId: "176628716686",
  appId: "1:176628716686:web:0416951c7e3a7e3868e5df"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

export { firebase, auth, firestore }