// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = firebase.initializeApp({
  // apiKey: 'AIzaSyABpnUKnTcEeedtfpzPFwkJqOvIx3Vi5AU',
  // authDomain: 'task-manager-project-firebase.firebaseapp.com',
  // projectId: 'task-manager-project-firebase',
  // storageBucket: 'task-manager-project-firebase.appspot.com',
  // messagingSenderId: '658679706385',
  // appId: '1:658679706385:web:50c1710c200972c18c52b0',
  // measurementId: 'G-D5KP1BYMKB'
  apiKey: 'AIzaSyBrtJ2MXxxadxuz8itYNNmxVVOMkTuaRoc',
  authDomain: 'task-manager-main-project.firebaseapp.com',
  projectId: 'task-manager-main-project',
  storageBucket: 'task-manager-main-project.appspot.com',
  messagingSenderId: '544541989285',
  appId: '1:544541989285:web:378bc55602ef087fac704c'
});

// Initialize Firebase
export { firebaseConfig as firebase };
