import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  public api_users = 'https://jsonplaceholder.typicode.com/users';
  private user!: User[];

  get User(): User[] {
    return this.user;
  }

  set User(user: User[]) {
    this.user = user;
  }

  getUsers(id?: number): Observable<User[]> {
    let params = id ? `${this.api_users}/${id}` : this.api_users;

    return this.http.get<User[]>(params);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api_users}/${id}`);
  }
}
