// import React from "react";
import {Link} from 'react-router-dom'
const Signup = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-5xl text-center m-7 text-slate-700">Sign Up</h1>
      <form className=" flex flex-col gap-3">
        <input
          className="p-3 rounded-lg border"
          type="text"
          placeholder="Username"
          id="username"
        />
        <input
          className="p-3 rounded-lg border"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          className="p-3 rounded-lg border"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className=" bg-slate-800 p-2 rounded-lg text-white text-lg uppercase hover:opacity-95 disabled:opacity-85">sign up</button>
      </form>
      <div className=' flex gap-2 p-2'>
        <p>Have an account ?</p>
        <Link to={"/sign-in"}>
        <span className=' text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
