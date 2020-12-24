import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { User } from './auth/shared/services/auth/auth.service';
import { Meal } from './health/shared/services/meals.service';
import { ScheduleItem } from './health/shared/services/schedule.service';
import { Workout } from './health/shared/services/workout.service';

export interface State {
  user: User;
  meals: Meal[];
  workouts: Workout[];
  date: Date;
  schedule: ScheduleItem[];
  selected: any;
  list: any;
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined,
  date: undefined,
  schedule: undefined,
  selected: undefined,
  list: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
