import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase';

export const signInEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const signUpEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return await auth.signOut();
};

export const getIdToken = async () => {
  return await auth.currentUser.getIdToken(false);
};
