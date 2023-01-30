import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyAFeqybEsnCvX9pU6PMF3_tq4vcxFiE_ew",
    authDomain: "jojopinterest-343e6.firebaseapp.com",
    projectId: "jojopinterest-343e6",
    storageBucket: "jojopinterest-343e6.appspot.com",
    messagingSenderId: "465959415756",
    appId: "1:465959415756:web:b0da9a1360da0fcd353769"
};

// export function getFirebaseConfig() {
//   if (!firebaseConfig || !firebaseConfig.apiKey) {
//     throw new Error('No Firebase configuration object provided.' + '\n' +
//     'Add your web app\'s configuration object to firebase-config.js');
//   } else {
//     console.log(firebaseConfig.apiKey)
//     return firebaseConfig;
    
//   }
// }

export const app = initializeApp(firebaseConfig)
initializeApp(firebaseConfig)