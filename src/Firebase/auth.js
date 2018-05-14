import { auth } from './firebase';

//Sign up
export const createUserWithEmailAndPassword = (email, password) =>  
    auth.createUserWithEmailAndPassword(email, password);

//Sign in
export const signInWithEmailAndPassword = (email, password) => 
    auth.signInWithEmailAndPassword(email, password);

//Sign out
export const signOut = () => 
    auth.signOut();

