import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBKAcgA85mRQUICPSd0APbGo9Hc-1sWGk",
    authDomain: "crwn-clothing-db-8144b.firebaseapp.com",
    projectId: "crwn-clothing-db-8144b",
    storageBucket: "crwn-clothing-db-8144b.appspot.com",
    messagingSenderId: "887323547295",
    appId: "1:887323547295:web:fa10fc3948d6488f9db4aa",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        // additionalInfo = additionalInfo ? additionalInfo : {};
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.log("error creating a user ", error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
