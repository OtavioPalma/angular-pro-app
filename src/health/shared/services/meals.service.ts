import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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
  meals$: Observable<Meal[]> = from(this.authService.user).pipe(
    switchMap((user) => {
      return this.angularFireDatabase
        .list<Meal>(`meals/${user.uid}`)
        .valueChanges();
    }),
    tap((res) => this.store.set('meals', res))
  );

  constructor(
    private store: Store,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}
}
