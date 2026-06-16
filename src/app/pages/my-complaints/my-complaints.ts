import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AuthService
} from '../../auth';

@Component({
  selector: 'app-my-complaints',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './my-complaints.html',
  styleUrls: [
    './my-complaints.css'
  ]
})

export class MyComplaints implements OnInit {

  complaints: any[] = [];

  loading = true;

  constructor(

    private auth:
    AuthService,

    private cdr:
    ChangeDetectorRef

  ) {}

  ngOnInit(): void {

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

          const user =
            JSON.parse(

              localStorage.getItem(
                'user'
              ) || '{}'

            );

          this.complaints =
            (data || []).filter(

              (complaint: any) =>

                complaint.email ===
                user.email

            );

          this.loading =
            false;

          this.cdr
            .detectChanges();

        },

        error: (
          err: any
        ) => {

          console.log(
            err
          );

          this.loading =
            false;

          this.cdr
            .detectChanges();

        }

      });

  }

}