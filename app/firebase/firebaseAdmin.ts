'use server';
import { FirebaseAdminConfig } from '@/lib/schema';
import admin from 'firebase-admin';

export const createFirebaseAdminApp = (
  config: FirebaseAdminConfig
): admin.app.App => {
  // Check if the Firebase Admin SDK is already initialized
  if (admin.apps.length) {
    return admin.app();
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.projectId,
      clientEmail: config.clientEmail,
      privateKey: config.privateKey.replace(/\\n/g, '\n'),
    }),
    projectId: config.projectId,
    storageBucket: config.storageBucket,
  });
};

export const initAdminApp = async () => {
  const config: FirebaseAdminConfig = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  };
  return createFirebaseAdminApp(config);
};
