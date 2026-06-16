import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  AuthService
} from '../../auth';

@Component({
  selector: 'app-report',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './report.html',

  styleUrls: [
    './report.css'
  ]
})

export class Report {

  selectedImage: any =
    null;

  imagePreview:
    string | null =
    null;

  reportForm: any;

  constructor(

    private fb:
      FormBuilder,

    private auth:
      AuthService

  ) {

    this.reportForm =
      this.fb.group({

        issueType: [
          '',
          Validators.required
        ],

        description: [
          '',
          Validators.required
        ],

        location: [
          '',
          Validators.required
        ]

      });

  }

  onFileSelect(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedImage =
        file;

      this.imagePreview =
        URL.createObjectURL(
          file
        );

    }

  }

  submitIssue() {

    if (
      this.reportForm.invalid
    ) {

      alert(
        'Please fill all fields'
      );

      return;

    }

    const formData =
      new FormData();

    const user =
      JSON.parse(

        localStorage.getItem(
          'user'
        ) || '{}'

      );

    formData.append(
      'email',
      user.email
    );

    formData.append(
      'issueType',
      this.reportForm.value
        .issueType
    );

    formData.append(
      'description',
      this.reportForm.value
        .description
    );

    formData.append(
      'location',
      this.reportForm.value
        .location
    );

    if (
      this.selectedImage
    ) {

      formData.append(
        'image',
        this.selectedImage
      );

    }

    this.auth
      .createIssue(
        formData
      )
      .subscribe({

        next: () => {

          alert(
            'Issue Reported Successfully ✅'
          );

          this.reportForm
            .reset();

          this.selectedImage =
            null;

          this.imagePreview =
            null;

        },

        error: (
          err: any
        ) => {

          console.log(
            err
          );

          alert(
            'Failed to submit issue ❌'
          );

        }

      });

  }

}