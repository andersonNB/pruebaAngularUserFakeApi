import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  user: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) {}

  formulario = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(5)]],
  });

  saveUser() {
    console.log(this.formulario.controls.name.value);
    const { name, email, phone } = this.formulario.controls;

    let user: User = {
      id: Math.round(Math.random() * 100),
      name: name.value as string,
      email: email.value as string,
      phone: phone.value as string,
    };
    this.userService.User.push(user);
  }
}
