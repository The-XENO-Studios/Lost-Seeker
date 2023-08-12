import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../../../App.tsx";
import { useState } from "react";
interface props {
  page: "login" | "register";
}
function Form({ page }: props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (page === "register") {
      registerUser();
    } else {
      loginUser();
    }
  };
  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser!);
      navigate("/login");
    } catch (err: any) {
      setError(formatError(err.code));
    }
  };
  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth?.currentUser?.emailVerified) {
        signOut(auth);
        throw { code: "Verify your email" };
      }
      navigate("/list");
    } catch (err: any) {
      setError(formatError(err.code));
    }
  };
  const handleGoogleAuthentication = async () => {
    try {
      await signInWithPopup(auth, provider).then(() => {
        navigate("/list");
      });
    } catch (err: any) {
      setError(formatError(err.code));
    }
  };
  const formatError = (errorMessage: string): string => {
    return errorMessage.replace("auth/", "").replaceAll("-", " ");
  };
  return (
    <>
      <form
        className="gap-y-10 flex flex-col w-full md:h-full md:justify-between text-center"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="space-y-5">
            <h1 className="hidden md:block font-bold text-3xl mb-14 text-left text-black capitalize">
              {page}
            </h1>
            {page === "register" ? (
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue peer placeholder:text-transparent focus:placeholder:text-lightGray focus:border-2"
                  placeholder="Set your Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label
                  htmlFor="username"
                  className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-whiteGray md:bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Username
                </label>
              </div>
            ) : null}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue peer placeholder:text-transparent focus:placeholder:text-lightGray focus:border-2"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-whiteGray md:bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue peer placeholder:text-transparent focus:placeholder:text-lightGray focus:border-2"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-whiteGray md:bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
            </div>
            <p className="text-left text-red">{error ? `* ${error}` : ""}</p>
          </div>
          <button
            type="submit"
            className="bg-darkBlue text-white px-14 py-1 rounded-lg text-lg w-fit mx-auto hover:scale-105 focus:scale-95 mt-5 md:mt-14 capitalize"
          >
            {page}
          </button>
          <div className="text-center">
            <pre className="font-['RobotoSlab'] text-lg text-lightGray mt-10 md:mt-14 flex items-center before:border before:h-px before:flex-grow after:border after:h-px after:flex-grow">
              {"  Or  "}
            </pre>
            <button
              type="button"
              className="mt-5 text-blue border-2 border-blue hover:scale-105 focus:scale-95 font-bold rounded-lg text-md px-4 py-2 text-center inline-flex items-center mr-2 mb-2"
              onClick={handleGoogleAuthentication}
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              {page} with Google
            </button>
          </div>
        </div>
        <p className="mt-10 md:mb-5 capitalize">
          {page === "login" ? "Don't have an account? " : "Have an account? "}
          <Link
            className="text-blue underline"
            to={`/${page === "login" ? "register" : "login"}`}
          >
            {page === "login" ? "register" : "login"}
          </Link>
        </p>
      </form>
    </>
  );
}
export default Form;
