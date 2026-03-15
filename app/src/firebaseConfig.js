import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgOWqhNuBVGHOCcOaz5Ly3aXINZKWRF0o",
  authDomain: "middagsplanen.firebaseapp.com",
  projectId: "middagsplanen",
  storageBucket: "middagsplanen.firebasestorage.app",
  messagingSenderId: "695548145148",
  appId: "1:695548145148:web:046d431062871fdfc05679",
  measurementId: "G-647ZXJ3K8Q",
  databaseURL: "https://middagsplanen-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
