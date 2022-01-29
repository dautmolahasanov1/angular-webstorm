import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "src/app/users/models/user.model";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  userRole$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {

  }

  login$(data: Login): Observable<User | null> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map((response: User[]) => {
        const user = response.find(u => u.username === data.username && u.password === data.password);

        if(!user) {
          return null
        }

        return user;
      })
    )
  }

  private getLoggedUser(): User | null  {
    const user = localStorage.getItem("loggedUser");

    if(!user) {
      return null;
    }

    return JSON.parse(user) as User;
  }

  getUserRole$(): Observable<string | null>  {
    return this.userRole$.asObservable();
  }

  setUserRole(role: string | null): void {
    this.userRole$.next(role);
  }

  logout(): void {
    localStorage.removeItem("loggedUser");
    this.setUserRole(null);
  }

  hasPermissions (role: string) {
    return this.getLoggedUser()?.role === role;
  }

  setLoggedUserInLocalStorage(user: User): void {
    delete user.password;
    localStorage.setItem("loggedUser", JSON.stringify(user));
    this.setUserRole(user.role);
  }

  getLoggedUserFromLocalStorage(): User | null {
    const loggedUser = this.getLoggedUser();
    this.setUserRole(loggedUser?.role || null);
    return loggedUser;
  }
}

