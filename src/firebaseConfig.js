import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4tSDaFBWKwJJ3gSl26Zn9MWdWZYyUaoA",
  authDomain: "lms-dashboard-007.firebaseapp.com",
  projectId: "lms-dashboard-007",
  storageBucket: "lms-dashboard-007.firebasestorage.app",
  messagingSenderId: "618651792832",
  appId: "1:618651792832:web:2a91f42bfedf855b404425"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


export { firestore }

export default auth;