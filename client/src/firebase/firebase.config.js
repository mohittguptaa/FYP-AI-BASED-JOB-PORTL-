// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDds7_g-U-wiuVq9oIJCynB3h24vdDKvsc",
  authDomain: "job-portal-15e47.firebaseapp.com",
  projectId: "job-portal-15e47",
  storageBucket: "job-portal-15e47.appspot.com",
  messagingSenderId: "440761558396",
  appId: "1:440761558396:web:c6b5dafcbfc5b1f0edb0f9",
  measurementId: "G-0T0MF6FG00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;