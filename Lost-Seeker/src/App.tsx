import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ListOfItems from "./components/pages/landing/ListOfItems";

const firebaseConfig = {
  apiKey: "AIzaSyB2DxDn0VT7kCGQZKmeXmKmG5zWcM8qHSA",
  authDomain: "lost-seeker.firebaseapp.com",
  projectId: "lost-seeker",
  storageBucket: "lost-seeker.appspot.com",
  messagingSenderId: "727937133568",
  appId: "1:727937133568:web:12028899a4907ffa10fce5",
  measurementId: "G-Z3J14HNCXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return <div className="font-medium">test font</div>;
}

export default App;
