import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.BASE_APIKEY,
  authDomain: "catch-of-the-day-sy-165fb.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-sy-165fb.firebaseio.com",
  projectId: "catch-of-the-day-sy-165fb",
  storageBucket: "catch-of-the-day-sy-165fb.appspot.com",
  messagingSenderId: "975430639258"
});

const aBase = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default aBase;
