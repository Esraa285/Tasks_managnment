export interface SuccessLogin {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: number
  refresh_token: string
  user: UserInterface
  weak_password: any
}

export interface FaildLogin {
  code: number
  error_code: string
  msg: string
}

export interface UserInterface {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: AppMetadata
  user_metadata: UserMetadata
  identities: Identity[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

export interface AppMetadata {
  provider: string
  providers: string[]
}

export interface UserMetadata {
  department: string
  email: string
  email_verified: boolean
  name: string
  phone_verified: boolean
  sub: string
}

export interface Identity {
  identity_id: string
  id: string
  user_id: string
  identity_data: IdentityData
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  email: string
}

export interface IdentityData {
  department: string
  email: string
  email_verified: boolean
  name: string
  phone_verified: boolean
  sub: string
}

export type Root = ProjectCardInerface[]

export interface ProjectCardInerface {
  id: string
  name: string
  description: string
  created_by: string
  created_at: string
}

export interface UserContextType {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
  logout: () => void;
   loading: boolean;
}

export interface ProjectEpic {
  id: string
  project_id: string
  title: string
  description: string
  created_at: string
  deadline: string
  epic_id: string
  created_by: CreatedBy
  assignee: Assignee
   due_date: string
  status: string
}


export interface CreatedBy {
  sub: string
  name: string
  email: string
  department: string
}

export interface Assignee {
  id:string
  sub: string
  name: string
  email: string
  department: string
}

export interface ProjectMember{
  id: string;
  name: string;
  avatar_url?: string;
}

export interface TaskInterface{
  projectId: string;
  projectMembers: ProjectMember [];
  epics: ProjectEpic [];
  initialEpicId?: string; 
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading:boolean
}

export interface ProjectTask {
  id: string;
  task_id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: "TO_DO" | "IN_PROGRESS" | "BLOCKED" | "DONE"; 
  due_date: string | null;
  created_at: string;
  epic_id: string | null;
  assignee: Assignee | null; 
  created_by: CreatedBy;
  epic: ProjectEpic | null;  
}
