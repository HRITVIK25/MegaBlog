import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import authService from "../appwrite/auth.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, handleSubmit] = useForm(); // handleSubmit is a method that takes your method as a param
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data); // appwrite se login karaya
      if (session) {
        const userData = await authService.getCurrentUSer();
        if (userData) {
          // agar user data aa gaya to call authlogin
          dispatch(authLogin(userData));
          navigate("/"); //agar user ki info aa gayi to wo login  ho gaya to usko home par bhej do
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form className="mt-8" onSubmit={handleSubmit(login)}>
          {/* handleSubmit is an event state manage nhi karta state apne app pick karta hai  */}
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter Your Email" // ye placeholder field humne input mai nhi banayei hai alag se ye ...props mai jayegi
              type="email"
              {...register("email", {
                //it is necesary to spread regiuster so it doesnt get overwritten when we use it somewhere else
                // name such as email should be unique for all input fields as data is passe on basis of name
                // is object mai options milte hain docmnttion pafho
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || //regex patter ke baad .test(value) jo bhi value pass higi will automatically be tested
                    "Email address must be a valid address",
                },
              })} //har baar spread karo warna kahin aur register karenge to ye wali value overwrite ho jayegfi
              // register ka name jaise upar "email" hai wo important and unique hai
            ></Input>
            <Input
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    ) ||
                    "Password must have 8 characters,one uppercase and one lowercase letter, one digit and one special character",
                },
              })}
            ></Input>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
