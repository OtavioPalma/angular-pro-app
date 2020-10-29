import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { User } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/assets/images/logo.svg" alt="Fitness App Logo" />
        <div class="app-header__user-info" *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  user: User;

  @Output()
  logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit();
  }
}
