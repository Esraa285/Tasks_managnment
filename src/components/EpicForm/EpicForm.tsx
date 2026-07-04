import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';


export const epicSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required") 
    .min(3, "Title must be at least 3 characters"),
description: z.string().optional().or(z.literal("")), 
  assignee_id: z.string().optional().or(z.literal("")), 
  
  deadline: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; 
      
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return selectedDate >= today; 
    }, {
      message: "Deadline must be today or in the future",
    }),
});


export type NewEpic = z.infer<typeof epicSchema>;

export default function EpicForm({onSubmit,
  isLoading,
  buttonText,
  onCancel,
  members = []
}:{onSubmit: (data: NewEpic) => void;
  buttonText: string;
  isLoading: boolean;
  onCancel?: () => void;
  members?: { id: string; name: string }[]; }) 
  {

const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewEpic>({
    resolver: zodResolver(epicSchema),
    mode: "onChange", 
    defaultValues: {
      title: "",
      description: "",
      assignee_id: "",
      deadline: "",
    },
  });

  const descriptionValue = watch("description") || "";
  return (
    <div className='px-5'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase  md:col-span-1">
          Title <span className="text-red-500">*</span>
        </label>
        <div className="md:col-span-3 ">
          <input
            {...register("title")}
            type="text"
            placeholder="e.g. Structural Foundation Phase"
            className={`placeholder:text-[#4F5F7B80] w-full p-3.5 rounded-lg bg-[#D7E2FF]/60 border transition-all focus:outline-none focus:ring-2 ${
              errors.title 
                ? "border-red-300 focus:ring-red-100" 
                : "border-transparent focus:ring-blue-100 focus:border-blue-500"
            }`}
          />
          {errors.title && (
            <p className="text-[11px] font-bold text-red-600 mt-2 tracking-wide uppercase flex items-center">
              <span className="mr-1">⚠️</span> {errors.title.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div className="md:col-span-1 pt-2">
          <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase">
            Description
          </label>
          <span className="text-xs text-gray-400 italic">Optional</span>
        </div>
        <div className="md:col-span-3 space-y-1">
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Describe the scope and objectives of this epic..."
            className={`placeholder:text-[#4F5F7B80] w-full p-3.5 rounded-lg bg-[#D7E2FF]/60 border transition-all focus:outline-none focus:ring-2 resize-none ${
              errors.description 
                ? "border-red-300 focus:ring-red-100" 
                : "border-transparent focus:ring-blue-100 focus:border-blue-500"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase">
            Assignee
          </label>
          <select
            {...register("assignee_id")}
            className="w-full p-3.5 rounded-lg bg-[#D7E2FF]/60 border border-transparent transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-gray-700 cursor-pointer"
          >
            <option value="">Select a member...</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase">
            Deadline
          </label>
          <input
            {...register("deadline")}
            type="date"
            min={new Date().toISOString().split("T")[0]} 
            className={`w-full p-3.5 rounded-lg bg-[#D7E2FF]/60 border transition-all focus:outline-none focus:ring-2 text-gray-700 cursor-pointer ${
              errors.deadline 
                ? "border-red-300 focus:ring-red-100" 
                : "border-transparent focus:ring-blue-100 focus:border-blue-500"
            }`}
          />
          {errors.deadline && (
            <p className="text-xs font-medium text-red-500 mt-1 flex items-center">
              <span className="mr-1">⚠️</span> {errors.deadline.message}
            </p>
          )}
        </div>

      </div>

      <div className="flex justify-end items-center gap-4 py-6 border-t border-gray-50">
        <button
          onClick={onCancel}
          type="button"
          className=" cursor-pointer px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors text-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className=" cursor-pointer px-8 py-2.5 text-sm font-bold text-white bg-[#0b53ca] hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-50 text-center"
        >
          {isLoading ? "Loading..." : buttonText}
        </button>
      </div>

    </form>
    </div>
  );
}
