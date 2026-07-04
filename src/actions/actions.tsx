'use server'
import { NewEpic } from "@/components/EpicForm/EpicForm";
import { LoginFormData } from "@/components/LoginForm";
import { ProjectFormData } from "@/components/ProjectForm/AddProject";
import { SignUpFormData } from "@/components/SignUpForm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

    const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL;
    const SECRET_KEY= process.env.NEXT_PUBLIC_SECRET_KEY;
  
    

 export async function SignUpdata(data:SignUpFormData) {

   try {
    const response = await fetch(`${BASE_URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
      },
      body: JSON.stringify(data) 
    });

    const result = await response.json();
    console.log(result)

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong during sign up");
    }
     
    return { success: true, data: result };

  } 
  catch (error: any) {
    return { success: false, error: error.message || "user alradey exist" };
  } 
  }

  export async function SignIndata(data:LoginFormData) {

     const cookieStore = await cookies(); 
    const TOKEN = cookieStore.get("user-token")?.value;

   try {
    const response = await fetch(`${BASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
      },
     body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    });

    const result = await response.json();
    console.log("Supabase Raw Result:", result);

    if (!response.ok) {
  
      throw new Error(result.error_description || result.msg || "Invalid email or password");
    }

    return { success: true, data: result };

  } catch (error: any) {
    return { success: false, error: error.message || "Authentication failed" };
  }
  }

   export async function AddProject(data:ProjectFormData) {

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
        "apikey": SECRET_KEY || "", 
        "Authorization": `Bearer ${TOKEN}`
      },
     body: JSON.stringify({
      name: data.name,
      description: data.description || null 
    })
    });
    
    if (!response.ok) {
    const result = await response.json().catch(() => ({})); 
    throw new Error(result.message || result.error_description || "Failed to create project");
  }

   const text = await response.text().catch(() => ""); 
  const result = text ? JSON.parse(text) : null;
if (result) {
    return { success: true, data: result[0] || result };
  } else {

    return { success: true, data: { message: "Project created successfully" } };
  }
}catch (error: any) {
  console.error("Create Project Error:", error.message);
  return { success: false, error: error.message || "Failed to initialize project" };
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
          "apikey": SECRET_KEY || "", 
          "Authorization": `Bearer ${TOKEN}`
        }
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

    }
    catch (error: any) {
      console.error("Get Projects Error:", error.message);
      return { success: false, error: error.message || "Failed to load projects" };
    };
}


export async function fetchProjects(page: number , limit: number) {


  const cookieStore = await cookies(); 
    const TOKEN = cookieStore.get("user-token")?.value;
    const offset = (page - 1) * limit;

   try {
    const response = await fetch(`${BASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
         'Authorization': `Bearer ${TOKEN}`,
           'Prefer': 'count=exact'
      }
    });

    console.log(response, "response");
    

   if (!response.ok) {
    throw new Error('Failed to load projects');
  }

  const data = await response.json();

  console.log(data, "data");

  const contentRange = response.headers.get('content-range');
  let totalCount = 0;
  if (contentRange) {
    const parts = contentRange.split('/');
    totalCount = parseInt(parts[1], 10) || 0;
  }

  return { data, totalCount };
}
catch (error) {
    
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function fetchEpicsProject(projectId: string ,page: number , limit: number) {

   const cookieStore = await cookies(); 
    const TOKEN = cookieStore.get("user-token")?.value;
      const offset = (page - 1) * limit;
 
  try {
   
    const response = await fetch(`${BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`, {
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
        "Authorization": `Bearer ${TOKEN}`,
        "Prefer": "count=exact"
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load project epics');
    }

    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Error fetching epics:", error);
    throw error;
  }
}

export async function UpdateProject(data:ProjectFormData, projectId:string) {

     const cookieStore = await cookies(); 
      const TOKEN = cookieStore.get("user-token")?.value;
   try {
    const cookieStore = await cookies(); 
    const TOKEN = cookieStore.get("user-token")?.value;
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}/rest/v1/projects?id=eq.${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
        "Authorization": `Bearer ${TOKEN}`
      },
     body: JSON.stringify({
      name: data.name,
      description: data.description || null 
    })
    });
    
    if (!response.ok) {
    const result = await response.json().catch(() => ({})); 
    throw new Error(result.message || result.error_description || "Failed to create project");
  }

   const text = await response.text().catch(() => ""); 
  const result = text ? JSON.parse(text) : null;
if (result) {
    return { success: true, data: result[0] || result };
  } else {

    return { success: true, data: { message: "Project created successfully" } };
  }
}catch (error: any) {
  console.error("Create Project Error:", error.message);
  return { success: false, error: error.message || "Failed to initialize project" };
}
   }

   
   export async function getProjectMembers(projectId:string) {

     const cookieStore = await cookies(); 
    const TOKEN = cookieStore.get("user-token")?.value;

  try {

      if (!TOKEN) {
        return { success: false, error: "SESSION_EXPIRED" };
      }

      const response = await fetch(`${BASE_URL}/rest/v1/get_project_members?project_id=eq.${projectId}`, {
        headers: {
          "Content-Type": "application/json",
          "apikey": SECRET_KEY || "", 
          "Authorization": `Bearer ${TOKEN}`
        }
      });

      if (response.status === 401) {
        return { success: false, error: "SESSION_EXPIRED" };
      }

      if (!response.ok) {
        throw new Error("Failed to fetch projects Members");
        
      }

  
      const result = await response.json();
      console.log("Projects from Server:", result);
      
      return { success: true, data: result };

    }
    catch (error: any) {
      console.error("Get Projects Error:", error.message);
      return { success: false, error: error.message };
    };
}

  export async function AddEpic(data:NewEpic, projectId:string) {

   try {
    const cookieStore = await cookies(); 
    const TOKEN = cookieStore.get("user-token")?.value;
    if (!TOKEN) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}rest/v1/epics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
        "Authorization": `Bearer ${TOKEN}`
      },
     body: JSON.stringify({
    title:data.title,
    description:data.description || null,
    assignee_id:data.assignee_id || null,
    project_id : projectId ,
    deadline: data.deadline || null
  }as NewEpic)
    });
    
    if (!response.ok) {
    const result = await response.json().catch(() => ({})); 
    console.log(result)
    throw new Error(result.message || result.error_description );
    
  }

   const text = await response.text().catch(() => ""); 
  const result = text ? JSON.parse(text) : null;


if (result) {
  console.log(result)
    return { success: true, data: result[0] || result };
   
  } else {
console.log(result)
    return { success: true, data: { message: "Epics created successfully" } };
  }
}catch (error: any) {
  console.error(error.message);
  console.log(error)
  return { success: false, error: error.message };
}
   }
