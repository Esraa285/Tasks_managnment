"use client";

import { SignUpdata } from "@/actions/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import z from "zod";

const nameRegex = /^[A-Za-zÀ-ÿ\u0600-\u06FF]+( [A-Za-zÀ-ÿ\u0600-\u06FF]+)*$/;

const registerSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(nameRegex, "Name can only contain letters and spaces"),
  email: z.string()
    .min(1, "Email address is required")
    .email("Invalid email format"),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .refine((val) => !/\s/.test(val), "Password must not contain spaces")
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
});

export type SignUpFormData = z.infer<typeof registerSchema>;

export default function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", 
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
    },
  });

  const passwordValue = watch("password", "");

  const passwordRequirements = {
    length: passwordValue.length >= 8,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    hasDigit: /[0-9]/.test(passwordValue),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
  };

  

const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

   const signUp = async function onSubmit(data: SignUpFormData) {
    setIsLoading(true);
   
   
    const result = await SignUpdata(data);
     console.log(result);

    setIsLoading(false); 

    if (result.success) {
      toast.success("Account created successfully!");
      router.push("/projects");
    } else {

      toast.error(result.error || "User already exists");
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 px-4">
      <div className="w-full max-w-md px-6 py-6 bg-white rounded-2xl shadow-2xl border border-gray-50">
        <h2 className="text-slate-900 text-center text-2xl font-bold mb-6">
          Create Your WorkSpace
        </h2>

        <form onSubmit={handleSubmit(signUp)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-1">
              NAME
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")} 
              className={`block w-full rounded-xl bg-blue-50 p-2.5 text-slate-700 outline-none border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-indigo-500'} sm:text-sm`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-1">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              placeholder="yourname@company.com"
              {...register("email")}
              className={`block w-full rounded-xl bg-blue-50 p-2.5 text-slate-700 outline-none border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-indigo-500'} sm:text-sm`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="jobTitle" className="block text-xs font-semibold text-gray-400 mb-1">
              JOB TITLE (OPTIONAL)
            </label>
            <input
              id="jobTitle"
              type="text"
              placeholder="e.g Project Manager"
              {...register("jobTitle")} 
              className="block w-full rounded-xl bg-blue-50 p-2.5 text-slate-700 outline-none border border-transparent focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-400 mb-1">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                {...register("password")} 
                className={`block w-full rounded-xl bg-blue-50 p-2.5 text-slate-700 outline-none border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-indigo-500'} sm:text-sm`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-400 mb-1">
                CONFIRM PASSWORD
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repeat Password"
                {...register("confirmPassword")} 
                className={`block w-full rounded-xl bg-blue-50 p-2.5 text-slate-700 outline-none border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-indigo-500'} sm:text-sm`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-xl space-y-2 border border-blue-50 text-xs">
        
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${passwordRequirements.length ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-gray-300 text-transparent'}`}>✓</span>
              <span className={passwordRequirements.length ? 'text-emerald-700 font-medium' : 'text-gray-500'}>At least 8 characters</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${(passwordRequirements.hasUppercase && passwordRequirements.hasLowercase && passwordRequirements.hasDigit) ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-gray-300 text-transparent'}`}>✓</span>
              <span className={(passwordRequirements.hasUppercase && passwordRequirements.hasLowercase && passwordRequirements.hasDigit) ? 'text-emerald-700 font-medium' : 'text-gray-500'}>One uppercase, lowercase, and digit</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${passwordRequirements.hasSpecial ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-gray-300 text-transparent'}`}>✓</span>
              <span className={passwordRequirements.hasSpecial ? 'text-emerald-700 font-medium' : 'text-gray-500'}>One special character</span>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full mt-2 justify-center rounded-xl bg-blue-800 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-800/10"
          >
             {isLoading && <LoaderIcon className="animate-spin mr-2" />}
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already a member?{" "}
          <Link href="/login" className="font-semibold text-blue-800 hover:text-blue-600 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}