import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root' // singleton
})
export class UserService {
  constructor(private http: HttpClient){
  }

  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUser$(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  postUser$(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  putUser$(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }

  deleteUser$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }

  addToLiked$(user: User, listingId: number): Observable<User> {
    const userLiked = {...user, liked: [...user.liked, listingId]}
    const {password, ...userToLocalStorage} = userLiked; // remove password from localStorage
    localStorage.setItem("loggedUser", JSON.stringify(userToLocalStorage));
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, userLiked)
  }

  removeFromLiked$(user: User, listingId: number): Observable<User> {
    const userLiked = {...user, liked: user.liked.filter((id) => id !== listingId)}
    const {password, ...userToLocalStorage} = userLiked; // remove password from localStorage
    localStorage.setItem("loggedUser", JSON.stringify(userToLocalStorage));
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, userLiked)
  }
}
