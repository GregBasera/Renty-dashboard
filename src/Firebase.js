import * as firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyChDvTKuI-Hprlziwm195cVqltQeNLPxT8",
  authDomain: "rentydbprototype.firebaseapp.com",
  databaseURL: "https://rentydbprototype.firebaseio.com",
  projectId: "rentydbprototype",
  storageBucket: "rentydbprototype.appspot.com",
  messagingSenderId: "534881026188",
  appId: "1:534881026188:web:c67973807bcb8d492efba9"
};
// let db = firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
