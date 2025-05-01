export interface SignupInput {
    name: string;
    email: string;
    password: string;
  }
  
  export interface SigninInput {
    email: string;
    password: string;
  }
  
  export interface AuthUser {
    id: number;
    name: string;
    email: string;
  }
  
  export interface AuthData {
    user: AuthUser;
    token: string;
  }
  