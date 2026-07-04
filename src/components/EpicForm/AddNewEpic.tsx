"use client";

import { AddEpic } from "@/actions/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import EpicForm, { NewEpic } from "./EpicForm";

export default function AddNewEpic({ projectId }: { projectId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: NewEpic) => {
    setIsLoading(true);
    try {
      const result = await AddEpic(data, projectId);
      console.log(result);

      if (result.success) {
        toast.success("Epic Added successfully!");
        router.push(`/project/${projectId}/epics`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto  sm:my-10  sm:p-0">
       
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
    
        <div className=" sm:p-8 border-b border-gray-50"></div>

        <EpicForm
          onSubmit={onSubmit}
          buttonText="Create Epic"
          isLoading={isLoading}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
