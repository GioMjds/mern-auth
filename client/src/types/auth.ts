export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {}

export interface User {
  id: string;
  email: string;
}
