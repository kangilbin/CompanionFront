import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes } from "firebase/storage";
import { ref, getDownloadURL } from "firebase/storage";
import moment from "moment";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FRIEBASE_APP_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FRIEBASE_APP_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FRIEBASE_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FRIEBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FRIEBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FRIEBASE_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FRIEBASE_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
