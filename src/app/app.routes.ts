import { Routes } from '@angular/router';

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
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: Home
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'profile',
    component: Profile
  },

  {
    path: 'report',
    component: Report
  },

  {
    path: 'complaints',
    component: Complaints
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard
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
  path: 'complaint-details',
  component: ComplaintDetails
},
{
  path:'my-complaints',
  component: MyComplaints
}

];