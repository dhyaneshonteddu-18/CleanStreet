import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  constructor(
    private router: Router
  ) {}

  logout() {

    localStorage.removeItem(
      'user'
    );

    localStorage.removeItem(
      'token'
    );

    alert(
      'Logged Out Successfully'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}