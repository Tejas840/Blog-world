import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqAzu9P0772qLafPLr5zoPrVp8XiNEzH8",
  authDomain: "fir-blog-2ca27.firebaseapp.com",
  projectId: "fir-blog-2ca27",
  storageBucket: "fir-blog-2ca27.appspot.com",
  messagingSenderId: "1023737857433",
  appId: "1:1023737857433:web:035ff652dd5ce81a1ebf08",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
