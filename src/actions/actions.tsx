"use server";

import { NewEpic } from "@/components/EpicForm/EpicForm";
import { LoginFormData } from "@/components/LoginForm";
import { ProjectFormData } from "@/components/ProjectForm/AddProject";
import { SignUpFormData } from "@/components/SignUpForm";
import { ProjectEpic } from "@/Interfaces/AuthInterfaces";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function SignUpdata(data: SignUpFormData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SECRET_KEY || "",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong during sign up");
    }

    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || "user alradey exist" };
  }
}

export async function SignIndata(data: LoginFormData) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;

  try {
    const response = await fetch(
      `${BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      },
    );

    const result = await response.json();
    console.log("Supabase Raw Result:", result);

    if (!response.ok) {
      throw new Error(
        result.error_description || result.msg || "Invalid email or password",
      );
    }

    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || "Authentication failed" };
  }
}

export async function AddProject(data: ProjectFormData) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  try {
    const cookieStore = await cookies();
    const TOKEN = cookieStore.get("user-token")?.value;
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}/rest/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SECRET_KEY || "",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description || null,
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(
        result.message ||
          result.error_description ||
          "Failed to create project",
      );
    }

    const text = await response.text().catch(() => "");
    const result = text ? JSON.parse(text) : null;
    if (result) {
      return { success: true, data: result[0] || result };
    } else {
      return {
        success: true,
        data: { message: "Project created successfully" },
      };
    }
  } catch (error: any) {
    console.error("Create Project Error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to initialize project",
    };
  }
}

export async function getProjects() {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;

  try {
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}/rest/v1/rpc/get_projects`, {
      headers: {
        "Content-Type": "application/json",
        apikey: SECRET_KEY || "",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (response.status === 401) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const result = await response.json();
    console.log("Projects from Server:", result);

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Get Projects Error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to load projects",
    };
  }
}

export async function fetchProjects(page: number, limit: number) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
          Prefer: "count=exact",
        },
      },
    );

    console.log(response, "response");

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    const data = await response.json();

    console.log(data, "data");

    const contentRange = response.headers.get("content-range");
    let totalCount = 0;
    if (contentRange) {
      const parts = contentRange.split("/");
      totalCount = parseInt(parts[1], 10) || 0;
    }

    return { data, totalCount };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function fetchEpicsProject(
  projectId: string,
  page: number,
  limit: number,
  searchTerm: string
) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;;
  const activePage = page <= 1 ? 1 : page;
  const offset = (activePage - 1) * limit;

  let url = `${BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`;
  
  if (searchTerm && searchTerm.trim() !== "") {
    url += `&title=ilike.%25${encodeURIComponent(searchTerm.trim())}%25`; 
  }

  try {
    const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
          Prefer: "count=exact",
        },
      },
    );

    if (response.status === 416) {
      const contentRange = response.headers.get("content-range");
      let totalCount = 0;
      if (contentRange && contentRange.includes("/")) {
        totalCount = parseInt(contentRange.split("/")[1], 10);
      }
      return { data: [], totalCount };
    }

    if (!response.ok) {
      throw new Error("Failed to load project epics");
    }

    const data = await response.json();
    const contentRange = response.headers.get("content-range");
    let totalCount = 0;

    if (contentRange && contentRange.includes("/")) {
      totalCount = parseInt(contentRange.split("/")[1], 10);
    }

    return { data, totalCount };

  } catch (error) {
    console.error("Error fetching epics:", error);
    throw error;
  }
}

export async function UpdateProject(data: ProjectFormData, projectId: string) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  try {
    const cookieStore = await cookies();
    const TOKEN = cookieStore.get("user-token")?.value;
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(
      `${BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description || null,
        }),
      },
    );

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(
        result.message ||
          result.error_description ||
          "Failed to create project",
      );
    }

    const text = await response.text().catch(() => "");
    const result = text ? JSON.parse(text) : null;
    if (result) {
      return { success: true, data: result[0] || result };
    } else {
      return {
        success: true,
        data: { message: "Project created successfully" },
      };
    }
  } catch (error: any) {
    console.error("Create Project Error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to initialize project",
    };
  }
}

export async function getProjectMembers(projectId: string) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;

  try {
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(
      `${BASE_URL}/rest/v1/get_project_members?project_id=eq.${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (response.status === 401) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    if (!response.ok) {
      throw new Error("Failed to fetch projects Members");
    }

    const result = await response.json();
    console.log("Projects from Server:", result);

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Get Projects Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function AddEpic(data: NewEpic, projectId: string) {
  try {
    const cookieStore = await cookies();
    const TOKEN = cookieStore.get("user-token")?.value;
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}/rest/v1/epics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SECRET_KEY || "",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description || null,
        assignee_id: data.assignee_id || null,
        project_id: projectId,
        deadline: data.deadline || null,
      } as NewEpic),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      console.log(result);
      throw new Error(result.message || result.error_description);
    }

    const text = await response.text().catch(() => "");
    const result = text ? JSON.parse(text) : null;
    console.log(result);

    if (result) {
      console.log(result);
      return { success: true, data: result[0] || result };
    } else {
      console.log(result);
      return { success: true, data: { message: "Epics created successfully" } };
    }
  } catch (error: any) {
    console.error(error.message);
    console.log(error);
    return { success: false, error: error.message };
  }
}

export async function getEpicDetails(epicId: string, projectId: string) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;

  try {
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(
      `${BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (response.status === 401) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    if (!response.ok) {
      throw new Error();
    }

    const result = await response.json();
    console.log(result);

    return result && result.length > 0 ? result[0] : null;
  } catch (error: any) {
    console.error("🚨 Database Fetch Error:", error);

    return {
      success: false,
      error: error?.message || "Unknown server error",
    };
  }
}

export async function updateEpicDetails(
  epicId: string,
  updates: Partial<ProjectEpic>,
) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;

  try {
    const requestBody: Record<string, any> = {};

    if (updates.title !== undefined) requestBody.title = updates.title;
    if (updates.description !== undefined)
      requestBody.description = updates.description;

    if (updates.deadline !== undefined) {
      requestBody.deadline = updates.deadline ? updates.deadline : null;
    }

    if (updates.assignee !== undefined) {
      requestBody.assignee_id = updates.assignee ? updates.assignee.sub : null;
    }

    const res = await fetch(`${BASE_URL}/rest/v1/epics?id=eq.${epicId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SECRET_KEY || "",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update epic: ${errorText}`);
    }

    const data = await res.json();

    return data[0];
  } catch (error) {
    console.error("🔴 Server Action Error [updateEpicDetails]:", error);
    throw error;
  }
}

export async function AddTask(data: ProjectEpic, projectId: string) {
  try {
    const cookieStore = await cookies();
    const TOKEN = cookieStore.get("user-token")?.value;
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}/rest/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SECRET_KEY || "",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        title: data.title,
        project_id: projectId,
        epic_id: data.epic_id || null,
        due_date: data.due_date || null,
        status: data.status || "TO_DO",
        description: data.description || null,
        assignee_id: data.assignee?.id || data.assignee?.id || null,
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      console.log(result);
      throw new Error(result.message || result.error_description);
    }

    const text = await response.text().catch(() => "");
    const result = text ? JSON.parse(text) : null;
    console.log(result);

    if (result) {
      console.log(result);
      return { success: true, data: result[0] || result };
    } else {
      console.log(result);
      return { success: true };
    }
  } catch (error: any) {
    console.error(error.message);
    console.log(error);
    return { success: false, error: error.message };
  }
}

export async function fetchProjectTask(projectId: string) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
          Prefer: "count=exact",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to load project tasks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function displayTasksInsideEpic(epicId: string) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/project_tasks?epic_id=eq.${epicId}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to load project tasks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function fetchProjectTaskByStatus(
  projectId: string,
  status: string,
) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to load project tasks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}


export async function displayTaskDetails(projectId: string, task_id: string) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${task_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Task not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load task details", error);
    throw error;
  }
}

export async function fetchProjectTaskListViewpagination(
  projectId: string,
  page: number,
  limit: number,
) {
  const cookieStore = await cookies();
  const TOKEN = cookieStore.get("user-token")?.value;
  const activePage = page < 1 ? 1 : page;
  const offset = (activePage - 1) * limit;

  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SECRET_KEY || "",
          Authorization: `Bearer ${TOKEN}`,
          Prefer: "count=exact",
        },
      },
    );

    console.log(response, "response");

    if (!response.ok) {
      throw new Error("Failed to load project tasks");
    }

    const data = await response.json();
    const contentRange = response.headers.get("content-range");
    let totalCount = 0;

    if (contentRange) {
      const parts = contentRange.split("/");
      if (parts.length > 1) {
        totalCount = parseInt(parts[1], 10);
      }
    }
    return { data, totalCount };
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    throw error;
  }
}
