"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const nameRegex = /^[A-Za-zÀ-ÿ\u0600-\u06FF]+( [A-Za-zÀ-ÿ\u0600-\u06FF]+)*$/;

const registerSchema = z.object({
   name: z.string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(nameRegex, "Name can only contain letters and single spaces between names, no special characters or numbers"),
    email: z.string()
    .min(1, "Email address is required")
    .email("Invalid email format"),

    password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .refine((val) => !/\s/.test(val), "Password must not contain any spaces")
    .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
    .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
    .refine((val) => /[0-9]/.test(val), "Password must contain at least one digit")
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
    jobTitle: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  export type SignUpFormData = z.infer<typeof registerSchema>;


export default function SignUpForm() {

   const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(registerSchema), 
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
    },
  });

  const signUp = (data: SignUpFormData) => {
    console.log("Data is valid and verified:", data);
  };

  return (
    <>
      <div className="flex justify-center align-center mt-6">
        <div
          className="min-w-md px-3 py-6 bg-white
         rounded-2xl shadow-2xl"
        >
          <h2 className=" text-black text-center text-2xl">
            Create Your WorkSpace
          </h2>

          <form className=" p-3 " >
            <label
              htmlFor="name"
              className="block text-xs font-sans text-gray-400"
            >
              NAME
            </label>
            <div className="">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                //   value={formData.email}
                //   onChange={handleChange} required
                className="block w-full rounded-md bg-blue-100 mt-1 p-2 placeholder:text-gray-400 text-base
               text-gray-500  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>

            <label
              htmlFor="email"
              className="block text-xs font-sans text-gray-400 mt-5"
            >
              EMAIL
            </label>
            <div className="">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="yourname@company.com"
                //   value={formData.email}
                //   onChange={handleChange} required
                className="block w-full rounded-md bg-blue-100 mt-1 p-2 placeholder:text-gray-400 text-base
               text-gray-500 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>

            <label
              htmlFor="jobtitle"
              className="block text-xs font-sans text-gray-400 mt-5"
            >
              JOB TITLE (OPTIONAL)
            </label>
            <div className="">
              <input
                id="jobtitle"
                type="text"
                name="jobtitle"
                placeholder="e.g Project Manager"
                //   value={formData.email}
                //   onChange={handleChange} required
                className="block w-full rounded-md bg-blue-100 mt-1 p-2 placeholder:text-gray-400 text-base
               text-gray-500  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-sans text-gray-400 mt-5"
                >
                  PASSWORD
                </label>
                <div className="">
                  <div className="flex justify-between items-center w-full rounded-md bg-blue-100 mt-1 p-2 placeholder:text-gray-400 text-base
               text-gray-500  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="password"
                      //   value={formData.email}
                      //   onChange={handleChange} required
                      className="outline-0"
                    />
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z"
                        fill="#737685"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-sans text-gray-400 mt-5"
                >
                  CONFIRMED PASSWORD
                </label>
                <div className="">
                  <input
                    id="confirmPassword"
                    type="password"
                    name="password"
                    placeholder="Repeat Your Password"
                    //   value={formData.email}
                    //   onChange={handleChange} required
                    className="block w-full rounded-md bg-blue-100 mt-1 p-2 placeholder:text-gray-400 text-base
               text-gray-500  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full  mt-5 justify-center rounded-md bg-blue-800 px-3 
                 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-700
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
                    <Link href="/" className="font-semibold text-white hover:text-blue-600">SignUp</Link>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <Link href="/login" className="font-semibold text-blue-800 hover:text-blue-600">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
