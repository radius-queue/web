import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

/*
Utility class for all of the firebase references and
configuration objects.
*/

const FIREBASECONFIG = {
  apiKey: 'AIzaSyDLKa3MCGky3T98RZrP8DZZWffCnz6tnV8',
  authDomain: 'ahead-9d906.firebaseapp.com',
  databaseURL: 'https://ahead-9d906.firebaseio.com',
  projectId: 'ahead-9d906',
  storageBucket: 'ahead-9d906.appspot.com',
  messagingSenderId: '580604661554',
  appId: '1:580604661554:web:7b0223746bc9f873da912b',
  measurementId: 'G-C73S6LEMS5',
};

firebase.initializeApp(FIREBASECONFIG);

export const auth : firebase.auth.Auth = firebase.auth();

export const firestore : firebase.firestore.Firestore = firebase.firestore();

export const storage = firebase.storage();

export const functions = firebase.functions();

export const GOOGLE_SIGN_IN : firebase.auth.GoogleAuthProvider =
  new firebase.auth.GoogleAuthProvider();

export const firebaseUIConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/hub',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

