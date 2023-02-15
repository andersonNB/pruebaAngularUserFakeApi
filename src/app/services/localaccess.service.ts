import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalaccessService {
  constructor() {}

  saveUserData(user: User[]): void {
    if (!user) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserData(): User[] {
    if (!localStorage.getItem('user')) {
      return [];
    }

    const user = JSON.parse(localStorage.getItem('user')!);

    return user;
  }

  deleteUserData(): void {
    localStorage.removeItem('user');
  }
}
