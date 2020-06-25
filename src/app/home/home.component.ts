import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = localStorage.email;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
