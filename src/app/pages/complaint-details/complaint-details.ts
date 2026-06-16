import {
  Component
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  CommonModule,
  Location
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../auth';

@Component({
  selector: 'app-complaint-details',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './complaint-details.html',

  styleUrls: [
    './complaint-details.css'
  ]
})

export class ComplaintDetails {

  complaint: any;

  commentText = '';

constructor(
  private router: Router,
  private location: Location,
  private auth: AuthService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {

    const data =
      localStorage.getItem(
        'selectedComplaint'
      );

    if (data) {

      this.complaint =
        JSON.parse(data);

    }

  }

  goBack() {

    this.location.back();

  }

  voteComplaint() {

  this.auth
    .voteComplaint(
      this.complaint._id
    )
    .subscribe({

      next: (data: any) => {

        this.complaint = data;

        this.cdr.detectChanges();

      }

    });

}

  unvoteComplaint() {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  this.auth
    .unvoteComplaint(
      this.complaint._id,
      user.email
    )
    .subscribe({

      next: (data: any) => {

        this.complaint = data;

        this.cdr.detectChanges();

      }

    });

}
  addComment() {

  if (!this.commentText.trim()) {
    return;
  }

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  this.auth
    .addComment(
      this.complaint._id,
      {
        user: user.name,
        text: this.commentText
      }
    )
    .subscribe({

      next: (data: any) => {

        this.complaint = data;

        this.commentText = '';

        this.cdr.detectChanges();

      }

    });

}

deleteComment(
  index: number
) {

  this.auth
    .deleteComment(
      this.complaint._id,
      index
    )
    .subscribe({

      next: (data: any) => {

        this.complaint = data;

        this.cdr.detectChanges();

      }

    });

}

}