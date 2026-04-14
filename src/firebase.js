import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBJ_IjZSb5aHkzKTzCpqmOasNJtK6srcAo",
    authDomain: "brainvare-website.firebaseapp.com",
    projectId: "brainvare-website",
    storageBucket: "brainvare-website.firebasestorage.app",
    messagingSenderId: "407694907066",
    appId: "1:407694907066:web:47b79c2e49b9b4b0149483",
    measurementId: "G-9LEGVC68QT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;
