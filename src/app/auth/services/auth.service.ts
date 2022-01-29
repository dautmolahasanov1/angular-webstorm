import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
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

  setLoggedUserInLocalStorage(user: User): void {
    delete user.password;
    localStorage.setItem("loggedUser", JSON.stringify(user));
  }

  getLoggedUserFromLocalStorage(): User | null {
    const user = localStorage.getItem("loggedUser");
    if(!user) {
      return null;
    }
    return JSON.parse(user) as User;
  }
}

