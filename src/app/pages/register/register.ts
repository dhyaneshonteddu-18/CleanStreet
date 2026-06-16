import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../auth';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.html',

  styleUrls: [
    './register.css'
  ]
})

export class Register {

  showPassword = false;
  showConfirmPassword = false;

  errorMsg = '';

  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.registerForm =
    this.fb.group({

      name: [
        '',
        Validators.required
      ],

      username: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [''],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]

    });

  }

  togglePassword() {
    this.showPassword =
    !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword =
    !this.showConfirmPassword;
  }

  register() {

    if (
      this.registerForm.invalid
    ) {

      this.errorMsg =
      'Password must contain minimum 6 letters';

      return;
    }

    const data =
    this.registerForm.value;

    if (
      data.password !==
      data.confirmPassword
    ) {

      this.errorMsg =
      "Passwords aren't matching";

      return;
    }

    this.errorMsg = '';

    this.auth.register({

      name:
      data.name,

      username:
      data.username,

      email:
      data.email,

      phone:
      data.phone,

      password:
      data.password

    })
    .subscribe({

      next: () => {

        alert(
          'Registration Success'
        );

        this.router.navigate(
          ['/login']
        );

      },

      error: (err: any) => {

        this.errorMsg =
        err.error?.message
        || 'Registration failed';

      }

    });

  }

}