// import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSucess } from "../redux/user/userslice.js";

const Oauth = () => {
  const dispatch = useDispatch();
  const googlehandler = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSucess(data));
    } catch (error) {
      if (error.message.includes("Cross-Origin-Opener-Policy")) {
        console.log("Popup blocked by COOP policy, fallback to redirect.");
        // Optionally fallback to signInWithRedirect
        const auth = getAuth(app);
        await signInWithRedirect(auth, provider);
      } else {
        console.log("cannot signin with google", error);
      }
    }
  };
  return (
    <button
      onClick={googlehandler}
      type="button"
      className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default Oauth;
