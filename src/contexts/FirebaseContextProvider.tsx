import { type ReactNode } from 'react';
import { FirebaseContext, useFirebaseContext } from './firebase-context';

interface Props {
  children: ReactNode;
}

export const FirebaseContextProvider = ({ children }: Props) => {
  const context = useFirebaseContext();
  return <FirebaseContext value={context}>{children}</FirebaseContext>;
};
