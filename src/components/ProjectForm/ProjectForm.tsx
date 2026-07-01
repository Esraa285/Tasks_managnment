import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import z from 'zod';


export const projectSchema = z.object({
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

export default function ProjectForm({onSubmit, isLoading,buttonText ,onBack}: {onSubmit: (data: { name: string; description?: string }) => void; buttonText:string, isLoading :boolean, onBack?: () => void;}) {

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




  return (
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
                {descriptionValue?.length} / 500 characters
              </div>
            </div>
          </div>

          <div className="  flex justify-between  sm:flex-row sm:items-center  gap-3 pt-4 border-t border-gray-50">
            <button
            onClick={onBack}
              type="button"
              className=" cursor-pointer w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors text-center"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className=" cursor-pointer w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-50 text-center"
            >
              {isLoading ? "Loading..." : buttonText}
            </button>
          </div>

        </form>
  )
}
