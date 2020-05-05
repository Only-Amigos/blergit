import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDMRrgS0gxfJ42yy_Ipp6dNBQVzk7vQIAI',
  authDomain: 'blergit-5ee94.firebaseapp.com',
  databaseURL: 'https://blergit-5ee94.firebaseio.com',
  projectId: 'blergit-5ee94',
  storageBucket: 'blergit-5ee94.appspot.com',
  messagingSenderId: '883387518475',
  appId: '1:883387518475:web:135bf07b7d1ecdb97b410e',
  measurementId: 'G-W5YL82GQCS'
});

const db = firebaseApp.firestore();

export { db };