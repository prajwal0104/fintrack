import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import axios from "axios";
import Button from "./Button";
import { loadtheme } from "./utils/Loadtheme";
import { BaseURL, Login, User } from "./utils/DBLinks";
import Goto from "./utils/GOTO";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

type FormData = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
type JWTPAYLOAD = {
  username: string;
  id: string;
};

const AuthForm: React.FC = () => {
  useEffect(() => {
    loadtheme();
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    isLogin
      ? await axios
          .post(BaseURL + Login.Post, {
            email: data.email,
            password: data.password,
          })
          .then((da) => {
            localStorage.setItem(
              "JwtToken",
              JSON.stringify({
                jwttoken: da.data.jwtToken,
                userid: jwtDecode<JWTPAYLOAD>(da.data.jwtToken).id,
                username: jwtDecode<JWTPAYLOAD>(da.data.jwtToken).username,
              })
            );
            return da;
          })
          .then((msg) => toast(msg.data.message))
          .then(() => Goto({ Link: "/dashboard" }))
          .catch((err) => {
            toast("Login Error:", err);
          })
      : await axios
          .post(BaseURL + User.Post, {
            name: data.username,
            email: data.email,
            passwordHash: data.password,
          })
          .then((_) => {
            setIsLogin(!isLogin),
              toast.success(
                "You have registered Successfully 😊, now Login to Get Started"
              );
          })
          .catch((err) => {
            toast.error(
              `Something Went Boom : ${
                err.status === 400 ? err.response.data.message : err
              }`
            ),
              console.log(err);
          });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary p-8 rounded-lg shadow-lg w-full sm:w-96"
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block">Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-primary active:ring-primary"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block ">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary active:ring-primary"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block ">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {!isLogin && (
            <div className="mb-4 relative">
              <label className="block ">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <Button
            title={isLogin ? "Login" : "Register"}
            className="w-full border-primary"
            bgcolor={false}
            disabled={isSubmitting}
          />
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-primary font-semibold ml-1 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
