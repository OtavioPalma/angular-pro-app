import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="schedule" routerLinkActive="active">Schedule</a>
        <a routerLink="meals" routerLinkActive="active">Meals</a>
        <a routerLink="workouts" routerLinkActive="active">Workouts</a>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
