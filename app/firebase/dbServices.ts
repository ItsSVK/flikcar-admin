'use server';
import { initAdminApp } from '@/app/firebase/firebaseAdmin';
import { models } from '@/app/firebase/models';
import { Auction, User } from '@/lib/schema';
import { getFirestore } from 'firebase-admin/firestore';

initAdminApp();
export const getUsers = async () => {
  const db = getFirestore();
  return (await db.collection(models.users).get()).docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    } as User;
  });
};

export const getUser = async (id: string) => {
  const db = getFirestore();
  return (await db.collection(models.users).doc(id).get()).data() as User;
};

export const getAuctions = async () => {
  const db = getFirestore();
  return (await db.collection(models.auction).get()).docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Auction;
  });
};

export const getAuction = async (id: string) => {
  const db = getFirestore();
  return (await db.collection(models.auction).doc(id).get()).data() as Auction;
};
