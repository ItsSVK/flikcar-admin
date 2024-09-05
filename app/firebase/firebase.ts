import { getApps, initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const app = !getApps().length
  ? initializeApp(clientConfig)
  : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
