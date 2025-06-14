'use client';

import { FirebaseDataProvider } from '@/config/FirebaseContext';

export default function Provider({ children }: { children: React.ReactNode }) {
  return <FirebaseDataProvider>{children}</FirebaseDataProvider>;
}