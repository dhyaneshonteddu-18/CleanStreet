import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink
} from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  RouterLink
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  showPassword = false;

  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.loginForm =
this.fb.group({

  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],

  password: [
    '',
    Validators.required
  ]

});
  }

  togglePassword() {

    this.showPassword =
    !this.showPassword;

  }

  login() {

    if (
      this.loginForm.invalid
    ) return;

    const data =
    this.loginForm.value;

    this.auth.login(
      data.email,
      data.password
    )
    .subscribe({

      next: (res: any) => {

        localStorage.setItem(
          'token',
          res.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            res.user
          )
        );

        alert(
          'Login Success'
        );

        this.router.navigate([
  '/home'
]);

      },

      error: (err) => {

        alert(
          err.error.message
        );

      }

    });

  }

}