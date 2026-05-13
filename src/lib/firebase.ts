import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, type Firestore } from "firebase/firestore";

// Replace with your own Firebase web app config.
// You can also wire these to env vars (VITE_FIREBASE_*) if you prefer.
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

// Name of the Firestore collection that stores profiles.
export const PROFILES_COLLECTION = "profiles";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function isFirebaseConfigured() {
  return !firebaseConfig.apiKey.includes("REPLACE_ME");
}

export function getDb(): Firestore | null {
  if (!isFirebaseConfigured()) return null;
  if (!app) app = getApps()[0] ?? initializeApp(firebaseConfig);
  if (!db) db = getFirestore(app);
  return db;
}

export type Profile = {
  name: string;
  bio: string;
  avatarUrl?: string;
  coverUrl?: string;
  likes: number;
  posts: number;
  views: number;
  socials?: {
    instagram?: string;
    x?: string;
    threads?: string;
  };
};

export async function fetchProfile(id: string): Promise<Profile | null> {
  const database = getDb();
  if (!database) return null;
  const snap = await getDoc(doc(database, PROFILES_COLLECTION, id));
  if (!snap.exists()) return null;
  return snap.data() as Profile;
}
