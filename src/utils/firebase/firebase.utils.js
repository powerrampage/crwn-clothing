import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, Firestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD2KjL3pOhbszRMzTebKA2jHDEISQoOXYg",
    authDomain: "crwn-clothing-db-7bfab.firebaseapp.com",
    projectId: "crwn-clothing-db-7bfab",
    storageBucket: "crwn-clothing-db-7bfab.appspot.com",
    messagingSenderId: "613093815683",
    appId: "1:613093815683:web:6cc7bb9f4db098481472b6"
};

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.warn("error creating the user", error.message);
        }
    }

    return userDocRef;
}