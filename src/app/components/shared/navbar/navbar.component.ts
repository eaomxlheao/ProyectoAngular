import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AngularFireAuth, public router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/inicio');
    });
  }
}
