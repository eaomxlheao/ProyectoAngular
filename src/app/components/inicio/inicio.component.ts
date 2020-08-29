import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  user: any;
  constructor(public router: Router, public auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.user.subscribe((resp: any) => {
      this.user = resp;
    });
  }

  navegarACajero() {
    this.router.navigateByUrl('/home');
  }

  login() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((resp: any) => {
        this.user = resp;
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }
  logout() {
    this.auth.signOut();
  }
}
