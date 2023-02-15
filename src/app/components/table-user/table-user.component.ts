import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css'],
})
export class TableUserComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() userUpdate = new EventEmitter<User[]>();

  constructor(private userService: UserServiceService) {}
  ngOnInit(): void {
    console.warn(this.users);
  }

  viewUser(id: any): void {
    const { name, email, phone } = this.users[id];
    Swal.fire({
      title: `<strong>${name}<u></u></strong>`,
      icon: 'info',
      html:
        `<strong>Email</strong>: ${email} <br/>` +
        `<strong>Phone:</strong> ${phone} `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> okay',
    });
  }

  deleteUserById(id: any): void {
    this.users.splice(id, 1);
    this.userUpdate.emit(this.users);
  }
}
