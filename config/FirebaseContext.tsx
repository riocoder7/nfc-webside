'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase_config';

interface FirebaseDataContextType {
  data: any;
  setData: (newData: any) => void;
  clearData: () => void;
}

const FirebaseDataContext = createContext<FirebaseDataContextType | undefined>(undefined);

export const useFirebaseData = () => {
  const context = useContext(FirebaseDataContext);
  if (!context) {
    throw new Error('useFirebaseData must be used within FirebaseDataProvider');
  }
  return context;
};

export const FirebaseDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<any>(null);

  const setData = (newData: any) => setDataState(newData);
  const clearData = () => setDataState(null);

  // ✅ Sync with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setData(userData);
        } else {
          console.log('No user document found');
          clearData();
        }
      } else {
        clearData(); // logged out
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseDataContext.Provider value={{ data, setData, clearData }}>
      {children}
    </FirebaseDataContext.Provider>
  );
};