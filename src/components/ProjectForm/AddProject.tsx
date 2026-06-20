"use client";

import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AddProject } from "@/actions/actions";


const projectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Project title is required." })
    .min(3, { message: "Project name must be at least 3 characters." })
    .max(100, { message: "Project name cannot exceed 100 characters." }),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional()
    .or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export default function AddProjecrForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors},
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange", 
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const descriptionValue = watch("description") || "";
  const [isLoading, setIsLoading] =useState(false)
    const router = useRouter()
  

  const onSubmit = async (data: ProjectFormData) => {
   setIsLoading(true);
   
   
    const result = await AddProject(data);
     console.log(result);

    setIsLoading(false); 

    if (result.success) {
      toast.success("Project created successfully!");
      router.push("/projects");
    } else {

      toast.error(result.error || "Something is wrong");
    }
  };


  return (
   
    <div className="w-full max-w-2xl mx-auto my-4 sm:my-10 p-4 sm:p-0">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        
        <div className="p-6 sm:p-8 border-b border-gray-50">
            <div className="flex gap-3">
                <svg width="22" height="20" className="mt-1" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.0833 0 12.1083 0.158333 13.075 0.475C14.0417 0.791667 14.9333 1.23333 15.75 1.8L14.3 3.275C13.6667 2.875 12.9917 2.5625 12.275 2.3375C11.5583 2.1125 10.8 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18C10.5333 18 11.05 17.95 11.55 17.85C12.05 17.75 12.5333 17.6083 13 17.425L14.5 18.95C13.8167 19.2833 13.1 19.5417 12.35 19.725C11.6 19.9083 10.8167 20 10 20ZM17 18V15H14V13H17V10H19V13H22V15H19V18H17ZM8.6 14.6L4.35 10.35L5.75 8.95L8.6 11.8L18.6 1.775L20 3.175L8.6 14.6Z" fill="#0052CC"/>
             </svg>

          <h2 className="text-xl font-bold text-gray-900">Initialize New Project</h2>
            </div>
          <p className="text-sm text-gray-500 mt-1">
            Define the scope and foundational details of your project.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter project name..."
              className={`placeholder:text-[#4F5F7B80] w-full p-3.5 rounded-lg bg-[#D7E2FF] border transition-all focus:outline-none focus:ring-2 ${
                errors.name 
                  ? "border-red-300 focus:ring-red-100" 
                  : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500 mt-1 flex items-center">
                <span className="mr-1">⚠️</span> {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase">
                Description
              </label>
              <span className="text-xs text-gray-400 italic">Optional</span>
            </div>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
              className={` placeholder:text-[#4F5F7B80] w-full p-3.5 rounded-lg bg-[#D7E2FF] border transition-all focus:outline-none focus:ring-2 resize-none ${
                errors.description 
                  ? "border-red-300 focus:ring-red-100" 
                  : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            
            <div className="flex justify-between items-start pt-1">
              <div>
                {errors.description && (
                  <p className="text-xs font-medium text-red-500 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.description.message}
                  </p>
                )}
              </div>
              <div className="text-xs text-gray-400 font-mono ml-auto">
                {descriptionValue.length} / 500 characters
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-50 text-center"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}