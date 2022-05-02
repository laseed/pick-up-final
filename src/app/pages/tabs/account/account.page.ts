import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  goTo() {
    console.error('this works');
  }
  logOut() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/auth-screen', { replaceUrl: true });
    });
    console.log('log out');
  }
}
