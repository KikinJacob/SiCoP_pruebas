import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

export const app = firebase.initializeApp({
  "projectId": "sicop-docs",
  "appId": "1:507705764870:web:fd1e9135a062afa3cce787",
  "storageBucket": "sicop-docs.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyCqXPJp28NYc5WT2eF5kB_0ZH5qelqtDV4",
  "authDomain": "sicop-docs.firebaseapp.com",
  "messagingSenderId": "507705764870"
});