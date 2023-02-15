import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { LocalaccessService } from 'src/app/services/localaccess.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css'],
})
export class InitPageComponent {
  title = 'user-api-fake';
  users!: User[];
  user!: User[];
  isUserExist: boolean = false;
  messageNotFound: string = '';

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private localAccess: LocalaccessService
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const userSrc = this.userService.User;
    const userLocal = this.localAccess.getUserData();

    if (userSrc?.length > 0 || userLocal?.length > 0) {
      this.users = userSrc ? userSrc : userLocal;
    } else {
      this.userService.getUsers().subscribe((user) => {
        this.users = user;
        this.userService.User = user;
      });
    }
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
        element.address?.street == elementToSearch ||
        element.company?.name == elementToSearch
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
    this.userService.User = value;
  }

  userCreation() {
    this.router.navigate(['add']);
  }

  reset(): void {
    this.isUserExist = false;
    this.user = this.users;
    this.messageNotFound = '';
  }
}
