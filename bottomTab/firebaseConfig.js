// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCXzHG9jU6k5TafQcISzIJDXyry70S2AE",
  authDomain: "mob-app-49e18.firebaseapp.com",
  projectId: "mob-app-49e18",
  storageBucket: "mob-app-49e18.appspot.com",
  messagingSenderId: "287662610452",
  appId: "1:287662610452:web:f789bc9d7730fb2c47ef01",
  measurementId: "G-ZPKBE71104"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth with React Native AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);