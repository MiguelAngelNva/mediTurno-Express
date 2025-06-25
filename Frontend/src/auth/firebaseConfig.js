import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLBcifORFoSiN2sv1dR9xe_20T8UnN5rE",
  authDomain: "backend-82a30.firebaseapp.com",
  projectId: "backend-82a30",
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

