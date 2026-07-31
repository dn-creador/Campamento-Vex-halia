/*==================================================
    CAMPAMENTO VEX'HALIA
    FIREBASE CONFIG V2.0
==================================================*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyCob_HIWSjB6-g-TQ2RDmjxCKUt45uUJ04",

    authDomain: "campamento-vex-halia.firebaseapp.com",

    projectId: "campamento-vex-halia",

    storageBucket: "campamento-vex-halia.firebasestorage.app",

    messagingSenderId: "960259683829",

    appId: "1:960259683829:web:8227ee4ab1dc16c2f11cbc",

    measurementId: "G-WDTF2H1VJR"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {

    app,

    auth,

    db

};
