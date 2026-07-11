"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  z } from 'zod';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { SignIndata } from '@/actions/actions';


const loginSchema = z.object({
  email: z.string()
    .min(1)
    .email("Invalid email format"),
  password: z.string()
   .min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});
    
export type LoginFormData = z.infer<typeof loginSchema>;


export default function LoginForm() {

const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })
const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const loginData = async function onSubmit(data: LoginFormData){
     setIsLoading(true); 
  
    const result = await SignIndata(data);

  setIsLoading(false);

  if (result.success) {

    const token = result.data?.access_token;
    
    if (token) {
      const days = 7;
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `user-token=${token}; expires=${expires}; path=/; SameSite=Strict; Secure`;
    }

    
    toast.success("Welcome back!");
    router.push('/projects'); 
  } else {

    toast.error(result.error || "Login failed");
  }
};


  return (
    <>
      <div className="flex justify-center items-center mt-6 p-10">
        <div className="min-w-md px-3 py-10 bg-white rounded-2xl shadow-2xl">
          
          <h2 className="text-black text-center text-2xl font-semibold">
            Create Your WorkSpace
          </h2>


          <form onSubmit={handleSubmit(loginData)} className="p-3">
            
            <div>
              <label htmlFor="email" className="block text-xs font-sans text-gray-400 mt-5">
                EMAIL
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  id="email"
                  type="text"
                  placeholder="yourname@company.com"
                  className="block w-full rounded-md bg-blue-100 p-2 placeholder:text-gray-400 text-base text-gray-500 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-xs font-sans text-gray-400">
                    PASSWORD
                  </label>
                  <button type="button" className="text-xs text-indigo-600 hover:underline focus:outline-none">
                    Forgot password?
                  </button>
                </div>
                
                <div className="flex justify-between items-center w-full rounded-md bg-blue-100 mt-1 p-2 placeholder:text-gray-400 text-base text-gray-500 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                  <input
                    {...register("password")} 
                    id="password"
                    type="password"
                    placeholder="password"
                    className="outline-0 bg-transparent w-full"
                  />
                  <svg
                    width="22"
                    height="15"
                    viewBox="0 0 22 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                  >
                    <path
                      d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z"
                      fill="#737685"
                    />
                  </svg>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
              </div>
              <div className="flex items-center mt-1">
                <input
                  {...register("rememberMe")}
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-xs text-gray-700 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 transition-colors">
                  Login
                </button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-2">
                Don’t have an account?{' '}
                <Link href="/signup"   className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                  Sign up
                </Link>
              </p>

            </div>
          </form> 
        </div>
      </div>
    </>
  );
}