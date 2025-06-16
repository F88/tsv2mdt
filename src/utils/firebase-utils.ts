import { initializeApp, type FirebaseOptions } from 'firebase/app';

function requireEnv(key: string): string {
  const value = import.meta.env[key] as string | undefined;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const firebaseConfig: FirebaseOptions = {
  apiKey: requireEnv('VITE_FIREBASE_API_KEY'),
  projectId: requireEnv('VITE_FIREBASE_PROJECT_ID'),
  appId: requireEnv('VITE_FIREBASE_APP_ID'),
  measurementId: requireEnv('VITE_FIREBASE_MEASUREMENT_ID'),
};

if (import.meta.env.DEV) {
  console.debug('Firebase Config:', firebaseConfig);
  console.debug('Firebase Config : ', firebaseConfig);
  console.debug('Firebase Config - Project ID:', firebaseConfig.projectId);
}

const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
