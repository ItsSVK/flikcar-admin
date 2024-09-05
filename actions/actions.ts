'use server';

import { db } from '@/app/firebase/firebase';
import { models } from '@/app/firebase/models';
import { User } from '@/lib/schema';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getUserProfileData = async (id: string) => {
  const user = (await getDoc(doc(db, models.users, id))).data();
  return user as User;
};

export const updateUserProfileData = async ({
  data,
  id,
}: {
  data: User;
  id: string;
}) => {
  try {
    data.updatedAt = new Date().getTime();
    await setDoc(doc(db, models.users, id), data, { merge: true });

    return data; // Return data if needed for any further operations
  } catch (error) {
    console.error('Failed to update profile data:', error);
    throw new Error('Failed to update profile data'); // Rethrow error for onError callback
  }
};
