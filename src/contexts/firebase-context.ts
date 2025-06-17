import { type FirebaseApp } from 'firebase/app';
import { createContext, use } from 'react';
import * as Firebase from '../utils/firebase-utils.js';

export interface FirebaseContextType {
  app: FirebaseApp;
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>({
  app: Firebase.firebaseApp,
});

export const useFirebaseContext = () => {
  const context = use(FirebaseContext);
  if (context == null) {
    throw new Error(
      'useFirebaseContext must be used within a FirebaseProvider',
    );
  }
  return context;
};
