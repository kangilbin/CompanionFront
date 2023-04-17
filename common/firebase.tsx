import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FRIEBASE_APP_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FRIEBASE_APP_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FRIEBASE_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FRIEBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FRIEBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FRIEBASE_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FRIEBASE_APP_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDJvYB06cNNzVSDMUTyTIR6NQLbzn79UTU",
//   authDomain: "companion-374309.firebaseapp.com",
//   projectId: "companion-374309",
//   storageBucket: "companion-374309.appspot.com",
//   messagingSenderId: "743905169300",
//   appId: "1:743905169300:web:4bec4e001cb4e9a17a8981",
//   measurementId: "G-0B5BM5G8GN",
// };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
