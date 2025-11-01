// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDCKOH8w4BvJTxQj5jL3iZsLSZgerdrxPU",
    authDomain: "agroconnect-farm2city.firebaseapp.com",
    projectId: "agroconnect-farm2city",
    storageBucket: "agroconnect-farm2city.firebasestorage.app",
    messagingSenderId: "1047441383361",
    appId: "1:1047441383361:web:161417ead91535cebe9940",
    measurementId: "G-3PYYGY467R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
