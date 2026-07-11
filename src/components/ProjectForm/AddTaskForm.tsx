
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ProjectMember, TaskInterface } from "@/Interfaces/AuthInterfaces";
import { AddTask } from "@/actions/actions";


export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is strictly required"),
  status: z.enum(["TO_DO", "IN_PROGRESS", "BLOCKED", "IN_REVIEW", "READY_FOR_QA", "REOPENED", "READY_FOR_PRODUCTION", "DONE"]),
  epic_id: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  assignee_id: z.string().nullable().optional(),
});


export default function AddTaskForm({ projectId, projectMembers, epics, initialEpicId ,onSubmit,onCancel,isLoading}: TaskInterface) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    status: "TO_DO",
    assignee_id: "",
    epic_id: initialEpicId || "",
    due_date: "",
    description: "",
  });

  useEffect(() => {
    if (initialEpicId) {
      setFormData((prev) => ({ ...prev, epic_id: initialEpicId }));
    }
  }, [initialEpicId]);

  const formatEpicLabel = (epic: any) => {
    const label = `${epic.epic_id} ${epic.title}`;
    return label.length > 100 ? label.substring(0, 97) + "..." : label;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const payload = {
      title: formData.title.trim(),
      status: formData.status,
      epic_id: formData.epic_id || null,
      due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      description: formData.description.trim() || null,
      assignee_id: formData.assignee_id || null,
    };

    const validationResult = createTaskSchema.safeParse(payload);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        const fieldName = err.path[0];
        if (typeof fieldName === "string") errors[fieldName] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    onSubmit({...validationResult.data,
  assignee: formData.assignee_id ? { id: formData.assignee_id } : null,
});
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
     
      <div>
        <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-2">Title *</label>
        <input
          type="text"
          placeholder="e.g., Finalize structural schematics"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 bg-[#D7E2FF] rounded-xl text-slate-800 focus:outline-none focus:ring-2 ${
            fieldErrors.title ? "focus:ring-red-500 border border-red-500" : "focus:ring-[#0A52C5]"
          }`}
        />
        {fieldErrors.title && <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>}
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-2">Status *</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 bg-[#D7E2FF]  rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A52C5] cursor-pointer"
          >
            {["TO_DO", "IN_PROGRESS", "BLOCKED", "IN_REVIEW", "READY_FOR_QA", "REOPENED", "READY_FOR_PRODUCTION", "DONE"].map((opt) => (
              <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-2">Assignee</label>
          <select
            value={formData.assignee_id}
            onChange={(e) => setFormData({ ...formData, assignee_id: e.target.value })}
            className="w-full px-4 py-3 bg-[#D7E2FF] rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A52C5] cursor-pointer"
          >
            <option value="">Select Team Member</option>
            {projectMembers.map((member , index) => (
              <option key={member.id || index} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Epic */}
      <div>
        <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-2">Epic</label>
        <select
          value={formData.epic_id}
          onChange={(e) => setFormData({ ...formData, epic_id: e.target.value })}
          className="w-full px-4 py-3 bg-[#D7E2FF]  rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A52C5] cursor-pointer"
        >
          <option value="">Select Epic Link</option>
          {epics.map((epic, index) => (
            <option key={epic.id || index} value={epic.id}>{formatEpicLabel(epic)}</option>
          ))}
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-2">Due Date</label>
        <input
          type="datetime-local"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          className="w-full px-4 py-3 bg-[#D7E2FF]  rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0A52C5]"
        />
      </div>

    
      <div>
        <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-2">Description</label>
        <textarea
        placeholder="Provide detailed context for this task..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-[#D7E2FF]  rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A52C5] resize-none"
        />
      </div>

    
      <div className="flex items-center justify-end gap-6 pt-4">
        <button type="button" onClick={onCancel} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-[#0A52C5] hover:bg-[#0843A3] text-white text-sm font-semibold rounded-xl disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
}
