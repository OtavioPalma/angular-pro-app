import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workout.service';

@Component({
  selector: 'app-workout',
  template: `
    <div class="container">
      <div class="workout">
        <div class="workout__title">
          <h1>
            <img src="../../../../assets/images/workout.svg" />
            <span *ngIf="workout$ | async as workout; else title">
              {{ workout.name ? 'Edit' : 'Create' }} Workout
            </span>

            <ng-template #title>Loading...</ng-template>
          </h1>
        </div>

        <div *ngIf="workout$ | async as workout; else loading">
          <app-workout-form
            [workout]="workout"
            (create)="addWorkout($event)"
            (update)="updateWorkout($event)"
            (remove)="removeWorkout()"
          >
          </app-workout-form>
        </div>

        <ng-template #loading>
          <div class="message">
            <img src="../../../../assets/images/loading.svg" />
            Fetching workout...
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout | any>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap((param) => this.workoutsService.getWorkout(param.id))
    );
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout() {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
