import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { User } from './models/user.interface';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'user-api-fake';
  users!: User[];
  user!: User[];
  isUserExist: boolean = false;
  messageNotFound: string = '';

  constructor(private userService: UserServiceService) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((user) => {
      this.users = user;
    });
  }

  searchUser(elementToSearch: any) {
    console.log(elementToSearch, '-- ', typeof elementToSearch);
    this.isUserExist = false;
    this.user = [];
    this.messageNotFound = '';

    if (!elementToSearch) {
      this.messageNotFound = 'Coloca un usuario a buscar';
    }

    if (this.users.length <= 0) {
      return;
    }

    this.users.forEach((element: User) => {
      if (
        element.id == elementToSearch ||
        element.name == elementToSearch ||
        element.username == elementToSearch ||
        element.email == elementToSearch ||
        element.address.street == elementToSearch ||
        element.company.name == elementToSearch
      ) {
        this.user = [element];
        this.isUserExist = true;
        this.messageNotFound = '';
      }
    });

    if (!this.isUserExist && elementToSearch) {
      this.messageNotFound = 'User not found';
    }
  }

  userUpdate(value: any) {
    this.users = value;
  }

  reset(): void {
    this.isUserExist = false;
    this.user = this.users;
    this.messageNotFound = '';
  }
}
