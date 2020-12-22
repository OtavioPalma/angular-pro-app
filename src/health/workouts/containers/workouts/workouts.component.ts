import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workout.service';
import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  template: `
    <div class="container">
      <div class="workouts">
        <div class="workouts__title">
          <h1>
            <img src="./../../../assets/images/workout.svg" />
            Your Workouts
          </h1>

          <a class="btn__add" [routerLink]="['../workouts/new']">
            <img src="../../../../assets/images/add-white.svg" />
            New Workout
          </a>
        </div>

        <div *ngIf="workouts$ | async as workouts; else loading">
          <div class="message" *ngIf="!workouts.length">
            <img src="../../../../assets/images/face.svg" />
            No Workouts! Add a new workout to start
          </div>

          <app-list-item
            *ngFor="let workout of workouts"
            [item]="workout"
            (remove)="removeWorkout($event)"
          ></app-list-item>
        </div>

        <ng-template #loading>
          <div class="message">
            <img src="../../../../assets/images/loading.svg" />
            Fetching workouts...
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(private store: Store, private workoutsService: WorkoutsService) {}

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.$key);
  }
}
