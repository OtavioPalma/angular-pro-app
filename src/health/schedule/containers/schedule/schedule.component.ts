import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals.service';
import {
  ScheduleItem,
  ScheduleService,
} from 'src/health/shared/services/schedule.service';
import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workout.service';
import { Store } from 'store';

@Component({
  selector: 'app-schedule',
  template: `
    <div class="container">
      <div class="schedule">
        <app-schedule-calendar
          [date]="date$ | async"
          [items]="schedule$ | async"
          (change)="changeDate($event)"
          (select)="changeSection($event)"
        ></app-schedule-calendar>

        <app-schedule-assign
          *ngIf="open"
          [section]="selected$ | async"
          [list]="list$ | async"
          (update)="assignItem($event)"
          (cancel)="closeAssign()"
        ></app-schedule-assign>
      </div>
    </div>
  `,
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  subscriptions: Subscription[] = [];

  open = false;

  constructor(
    private scheduleService: ScheduleService,
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(section: any) {
    this.open = true;
    this.scheduleService.selectSection(section);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}
