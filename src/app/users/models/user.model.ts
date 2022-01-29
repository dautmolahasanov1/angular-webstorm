export interface User {
  id: number;
  name?: string;
  username: string;
  password?: string; // optional so we can delete it so it is not stored in LocalStorage
  role: string;
  liked: number[],
}
