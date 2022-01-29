// export interface Role {
//   role: "admin" | "user"
// }
export interface User {
  id: number;
  username: string;
  password?: string; // optional, otherwise we are not allowed to delete it before saving to localStorage
  role: string // "admin" | "user"
}
