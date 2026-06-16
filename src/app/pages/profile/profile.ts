import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './profile.html',

  styleUrls: [
    './profile.css'
  ]
})

export class Profile {

  user: any;

  ngOnInit() {

    const data =
    localStorage.getItem(
      'user'
    );

    if(data){

      this.user =
      JSON.parse(data);

    }

  }

}