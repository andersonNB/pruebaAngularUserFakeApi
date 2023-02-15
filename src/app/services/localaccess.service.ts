import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalaccessService {
  constructor() {}

  saveUserData(user: User[]): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserData(): User[] | any {
    if (!localStorage.getItem('user')) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user')!);

    return user;
  }

  deleteUserData(): void {
    localStorage.removeItem('user');
  }
}
