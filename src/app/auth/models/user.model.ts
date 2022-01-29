export interface User {
  id: number;
  username: string;
  password?: string; // optional, otherwise we are not allowed to delete it before saving to localStorage
  role: "admin" | "user";
}
