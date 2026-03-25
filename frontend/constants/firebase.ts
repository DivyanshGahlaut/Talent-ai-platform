import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your application's Firebase configuration
const firebaseConfig = {
  apiKey: "PLACEHOLDER",
  authDomain: "talent-ai-platform.firebaseapp.com",
  projectId: "talent-ai-platform",
  storageBucket: "talent-ai-platform.firebasestorage.app",
  messagingSenderId: "PLACEHOLDER",
  appId: "PLACEHOLDER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
