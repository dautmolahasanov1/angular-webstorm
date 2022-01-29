import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  hasUser$ = new BehaviorSubject<boolean>(false);

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

  getHasUser$(): Observable<boolean>  {
    return this.hasUser$.asObservable();
  }

  setHasUser(value: boolean): void {
    this.hasUser$.next(value);
  }

  logout(): void {
    localStorage.removeItem("loggedUser");
    this.setHasUser(false);
  }

  hasPermissions (role: string) {
    return this.getLoggedUser()?.role === role;
  }

  setLoggedUserInLocalStorage(user: User): void {
    delete user.password;
    localStorage.setItem("loggedUser", JSON.stringify(user));
    this.setHasUser(true);
  }

  getLoggedUserFromLocalStorage(): User | null {
    const loggedUser = this.getLoggedUser();
    this.setHasUser(!!loggedUser);
    return loggedUser;
  }
}

