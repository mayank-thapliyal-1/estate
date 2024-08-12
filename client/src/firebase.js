
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FireBase_Api,
  authDomain: "gharsansar-c4029.firebaseapp.com	",
  projectId: "gharsansar-c4029",
  storageBucket: "gharsansar-c4029.appspot.com",
  messagingSenderId: "816973830303",
  appId: "1:816973830303:web:99cecd640370d994556aaa",
};
export const app = initializeApp(firebaseConfig);
