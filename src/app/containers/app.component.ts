import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';

import { Store } from 'store';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <app-header [user]="user$ | async" (logout)="onLogout()"></app-header>
      <app-navbar *ngIf="(user$ | async)?.authenticated"></app-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user');
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
