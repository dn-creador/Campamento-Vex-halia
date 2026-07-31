// =========================================
// CAMPAMENTO VEX'HALIA V3
// FIREBASE CONFIG
// =========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// CONFIGURACIÓN DE TU PROYECTO

const firebaseConfig = {

    apiKey: "AIzaSyCob_HIWSjB6-g-TQ2RDmjxCKUt45uUJ04",

    authDomain: "campamento-vex-halia.firebaseapp.com",

    projectId: "campamento-vex-halia",

    storageBucket: "campamento-vex-halia.firebasestorage.app",

    messagingSenderId: "960259683829",

    appId: "1:960259683829:web:8227ee4ab1dc16c2f11cbc",

    measurementId: "G-WDTF2H1VJR"

};

// Inicializar Firebase

const app = initializeApp(firebaseConfig);

// Servicios

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
