import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AuthService
} from '../../auth';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  complaints: any[] = [];
  searchText = '';
  selectedStatus = '';
  totalComplaints = 0;
  pendingCount = 0;
  progressCount = 0;
  resolvedCount = 0;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

  const user = JSON.parse(

    localStorage.getItem(
      'user'
    ) || '{}'

  );

  if (

    user.role !== 'admin'

  ) {

    alert(
      'Access Denied'
    );

    this.router.navigateByUrl(
  '/home',
  {
    replaceUrl: true
  }
);

    return;

    
  }

  this.loadComplaints();

}

filteredComplaints() {

  return this.complaints.filter(

    complaint => {

      const matchesSearch =

        complaint.issueType
        .toLowerCase()

        .includes(

          this.searchText
          .toLowerCase()

        );

      const matchesStatus =

        this.selectedStatus === ''

        ||

        complaint.status ===

        this.selectedStatus;

      return (

        matchesSearch &&

        matchesStatus

      );

    }

  );

}
  loadComplaints(): void {

    this.auth
      .getIssues()
      .subscribe({

        next: (data: any) => {

          this.complaints = [...data];

          this.calculateStats();

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  calculateStats(): void {

    this.totalComplaints =
      this.complaints.length;

    this.pendingCount =
      this.complaints.filter(
        c => c.status === 'Pending'
      ).length;

    this.progressCount =
      this.complaints.filter(
        c => c.status === 'In Progress'
      ).length;

    this.resolvedCount =
      this.complaints.filter(
        c => c.status === 'Resolved'
      ).length;

  }

  changeStatus(
  complaint: any,
  event: any

): void {

  const status =
    event.target.value;

  this.auth
    .updateStatus(
      complaint._id,
      status
    )
    .subscribe({

      next: () => {

        complaint.status =
          status;

        this.calculateStats();

        alert(
          'Status Updated Successfully'
        );

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

deleteComplaint(
  id: string
): void {

  const confirmDelete =
  confirm(

    'Delete this complaint?'

  );

  if(
    !confirmDelete
  ){

    return;

  }

  this.auth
    .deleteIssue(id)
    .subscribe({

      next: () => {

        this.complaints =
          this.complaints.filter(

            complaint =>

            complaint._id !== id

          );

        this.calculateStats();

        alert(
          'Complaint Deleted'
        );

      },

      error: (
        err: any
      ) => {

        console.log(err);

      }

    });

}

}