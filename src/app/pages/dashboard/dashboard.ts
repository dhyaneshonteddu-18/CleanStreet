import {
  Component
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../auth';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './dashboard.html',

  styleUrls: [
    './dashboard.css'
  ]
})

export class Dashboard {
  isAdmin = false;
  user: any = {};
  totalIssues = 0;
  pending = 0;
  resolved = 0;
  complaints: any[] = [];

constructor(
  private router: Router,
  private auth: AuthService,
  private cdr: ChangeDetectorRef
) {}
  ngOnInit() {

    if (
      typeof window !==
      'undefined'
    ) {

      const storedUser =
      localStorage.getItem(
        'user'
      );

      if (storedUser) {

        this.user =
        JSON.parse(
          storedUser
        );
        this.isAdmin =
        this.user.role ==='admin';
      }

    }

    this.loadDashboardData();

  }
  goToAdmin() {

  this.router.navigate([
    '/admin-dashboard'
  ]);

}

  loadDashboardData() {

    this.auth
    .getIssues()
    .subscribe({

      next: (data: any) => {

  this.complaints = data || [];

  this.totalIssues = this.complaints.length;

  this.pending = this.complaints.filter(
    c => c.status === 'Pending'
  ).length;

  this.resolved = this.complaints.filter(
    c => c.status === 'Resolved'
  ).length;

  this.cdr.detectChanges();

},

     error: (err: any) => {

  console.log(err);

  this.cdr.detectChanges();

}

    });

  }

  goToReport() {

    this.router.navigate(
      ['/report']
    );

  }

  goToComplaints() {

    this.router.navigate(
      ['/complaints']
    );

  }

  goToProfile() {

    this.router.navigate(
      ['/profile']
    );

  }

  logout() {

    if (
      typeof window !==
      'undefined'
    ) {

      localStorage.removeItem(
        'token'
      );

      localStorage.removeItem(
        'user'
      );

    }

    this.router.navigate(
      ['/login']
    );

  }

}