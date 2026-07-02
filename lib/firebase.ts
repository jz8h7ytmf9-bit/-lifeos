import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDam03zBays6MWbcRlu7HgRnHhNNWowl5w",
  authDomain: "lifeos-9330d.firebaseapp.com",
  projectId: "lifeos-9330d",
  storageBucket: "lifeos-9330d.firebasestorage.app",
  messagingSenderId: "722323858315",
  appId: "1:722323858315:web:82b893830ae2c1262a858e",
  measurementId: "G-FG8B9WR2HK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);