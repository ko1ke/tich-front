import { auth, provider } from '../firebase';

export const signInEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const signInGoogle = async () => {
  return await auth.signInWithPopup(provider);
};

export const signUpEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return await auth.signOut();
};

export const getIdToken = async () => {
  return await auth.currentUser.getIdToken(false);
};
