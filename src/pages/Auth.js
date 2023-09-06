import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Auth = ({ setActive }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState("signIn");
  const initialData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [data, setData] = useState(initialData);

  const { email, password, firstName, lastName } = data;

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    try {
      if (page == "signIn") {
        if (email && password) {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          setActive("home");
          navigate("/");
        } else {
          return toast.error("All fields are required");
        }
      } else {
        if (email && password && firstName && lastName) {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
          });

          toast.success("Sign up successful");

          return setTimeout(() => {
            setPage("signIn");
          }, 1000);
        } else {
          return toast.error("All fields are required");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="auth">
      <div className="authContainer flex">
        {page == "signIn" ? (
          <>
            <h3>Sign In</h3>
            <form onSubmit={(e) => handlesubmit(e)} className="flex">
              <input
                name="email"
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                value={email}
                type="email"
              />
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                placeholder="Password"
                value={password}
                type="password"
              />
              <button className="btn">Sign in</button>
            </form>
            <p>
              Don't have an account?{" "}
              <span className="link" onClick={() => setPage("signup")}>
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <h3>Sign Up</h3>
            <form onSubmit={(e) => handlesubmit(e)} className="flex">
              <div>
                <input
                  name="firstName"
                  onChange={(e) => handleChange(e)}
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                />
                <input
                  name="lastName"
                  onChange={(e) => handleChange(e)}
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                />
              </div>
              <input
                name="email"
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                type="email"
                value={email}
              />
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                placeholder="Set Password"
                type="password"
                value={password}
              />
              <button className="btn">Sign up</button>
            </form>
            <p>
              Already have an account?{" "}
              <span className="link" onClick={() => setPage("signIn")}>
                {" "}
                Sign In
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
