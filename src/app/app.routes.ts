import { Routes } from '@angular/router';

import { authGuard } from './auth.guard';

import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { Report } from './pages/report/report';
import { Complaints } from './pages/complaints/complaints';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { ComplaintDetails } from './pages/complaint-details/complaint-details';

import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { MyComplaints } from './pages/my-complaints/my-complaints';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },

  {
    path: 'report',
    component: Report,
    canActivate: [authGuard]
  },

  {
    path: 'complaints',
    component: Complaints,
    canActivate: [authGuard]
  },

  {
    path: 'my-complaints',
    component: MyComplaints,
    canActivate: [authGuard]
  },

  {
    path: 'complaint-details',
    component: ComplaintDetails,
    canActivate: [authGuard]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [authGuard]
  }

];