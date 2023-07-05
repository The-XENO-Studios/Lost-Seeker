import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landing/LandingPage.tsx";
import LoginPage from "./components/pages/auth/AuthPage.tsx";
import ErrorPage from "./components/pages/error/ErrorPage.tsx";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ListOfItems from "./components/pages/list/ListOfItems.tsx";
import FoundItem from "./components/pages/foundItem/FoundItem.tsx";
import { useState } from "react";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2DxDn0VT7kCGQZKmeXmKmG5zWcM8qHSA",
  authDomain: "lost-seeker.firebaseapp.com",
  projectId: "lost-seeker",
  storageBucket: "lost-seeker.appspot.com",
  messagingSenderId: "727937133568",
  appId: "1:727937133568:web:12028899a4907ffa10fce5",
  measurementId: "G-Z3J14HNCXK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [user, setUser] = useState<any>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="/register" element={<LoginPage user={user} />} />
        <Route path="/list" element={<ListOfItems />} />
        <Route path="/foundreport" element={<FoundItem user={user} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
