import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  ChangeDetectorRef
} from '@angular/core';

import {
  AuthService
} from '../../auth';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl:
  './complaints.html',
  styleUrls: [
    './complaints.css'
  ]
})

export class Complaints {

  complaints: any[] = [];

  loading = true;

  constructor(

    private auth:
    AuthService,

    private router:
    Router,

    private cdr:
    ChangeDetectorRef

  ) {}

  ngOnInit() {

    this.loadComplaints();

  }

  loadComplaints() {

    this.loading =
    true;

    this.auth
    .getIssues()
    .subscribe({

      next: (
        data: any
      ) => {

        console.log(
          'API Response:',
          data
        );

        this.complaints =
        data || [];

        this.loading =
        false;

        this.cdr
        .detectChanges();

      },

      error: (
        err: any
      ) => {

        console.log(
          'API Error:',
          err
        );

        this.loading =
        false;

        this.cdr
        .detectChanges();

      }

    });

  }

  openDetails(
    complaint: any
  ) {

    localStorage.setItem(

      'selectedComplaint',

      JSON.stringify(
        complaint
      )

    );

    this.router.navigate([
      '/complaint-details'
    ]);

  }

}