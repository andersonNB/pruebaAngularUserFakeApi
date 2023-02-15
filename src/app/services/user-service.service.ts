import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { LocalaccessService } from './localaccess.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private http: HttpClient,
    private localAccess: LocalaccessService
  ) {}

  public api_users = 'https://jsonplaceholder.typicode.com/users';
  private user: User[] = this.localAccess.getUserData() ?? [];

  get User(): User[] {
    return this.user;
  }

  set User(user: User[]) {
    this.localAccess.saveUserData(user);
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
