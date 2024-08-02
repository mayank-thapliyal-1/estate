// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const SignIn = () => {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    console.log(formdata);
  };
  console.log(formdata);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-5xl text-center m-7 text-slate-700">Sign In</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
        <input
          className="p-3 rounded-lg border"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg border"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" bg-slate-800 p-2 rounded-lg text-white text-lg uppercase hover:opacity-95 disabled:opacity-85"
        >
          {loading ? "loading..." : "sign In"}
        </button>
      </form>
      <div className=" flex gap-2 p-2">
        <p>Dont Have an account ?</p>
        <Link to={"/sign-up"}>
          <span className=" text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className=" text-red-600"> {error}</p>}
    </div>
  );
};

export default SignIn;
