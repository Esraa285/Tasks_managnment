'use server'
import { LoginFormData } from "@/components/LoginForm";
import { ProjectFormData } from "@/components/ProjectForm/AddProject";
import { SignUpFormData } from "@/components/SignUpForm";
import { cookies } from "next/headers";



 export async function SignUpdata(data:SignUpFormData) {

    const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL;
    console.log(BASE_URL)

    const SECRET_KEY= process.env.NEXT_PUBLIC_SECRET_KEY;
    console.log(SECRET_KEY)

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

    const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL;

    const SECRET_KEY= process.env.NEXT_PUBLIC_SECRET_KEY;

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

    const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL;

    const SECRET_KEY= process.env.NEXT_PUBLIC_SECRET_KEY;

   try {
    const cookieStore = await cookies(); 
    const accessToken = cookieStore.get("user-token")?.value;
    if (!accessToken) {
      return { success: false, error: "SESSION_EXPIRED" };
    }

    const response = await fetch(`${BASE_URL}/rest/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SECRET_KEY || "", 
        "Authorization": `Bearer ${accessToken}`
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

  /* i not understant this code*/

   const text = await response.text().catch(() => ""); 
  const result = text ? JSON.parse(text) : null;
if (result) {
    // Supabase يرجع البيانات في مصفوفة [ { id: 1, name: '...' } ]
    return { success: true, data: result[0] || result };
  } else {
    // إذا تمت الإضافة بنجاح لكن السيرفر لم يرسل داتا في الـ Body
    return { success: true, data: { message: "Project created successfully" } };
  }
}catch (error: any) {
  console.error("Create Project Error:", error.message);
  return { success: false, error: error.message || "Failed to initialize project" };
}
   }


   export async function getProjects() {

    const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL;

    const SECRET_KEY= process.env.NEXT_PUBLIC_SECRET_KEY;

  try {

      const cookieStore = await cookies(); 
      const accessToken = cookieStore.get("user-token")?.value;

      if (!accessToken) {
        return { success: false, error: "SESSION_EXPIRED" };
      }

      const response = await fetch(`${BASE_URL}/rest/v1/rpc/get_projects`, {
        headers: {
          "Content-Type": "application/json",
          "apikey": SECRET_KEY || "", 
          "Authorization": `Bearer ${accessToken}`
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
