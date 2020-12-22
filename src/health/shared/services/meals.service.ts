import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  meals$ = from(this.authService.user).pipe(
    switchMap((user) => {
      return this.angularFireDatabase
        .list<Meal>(`meals/${user.uid}`)
        .snapshotChanges();
    }),
    tap((res) =>
      this.store.set(
        'meals',
        res.map((el) => ({ ...el.payload.val(), $key: el.key }))
      )
    )
  );

  constructor(
    private store: Store,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  addMeal(meal: Meal) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase.list(`meals/${user.uid}`).push(meal);
    });
  }

  removeMeal(key: string) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase.list(`meals/${user.uid}`).remove(key);
    });
  }

  getMeal(key: string) {
    if (!key) return of({});

    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map((meals: Meal[]) => meals.find((meal: Meal) => meal.$key === key))
    );
  }

  updateMeal(key: string, meal: Meal) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase
        .object(`meals/${user.uid}/${key}`)
        .update(meal);
    });
  }
}
