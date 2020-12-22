import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/health/shared/services/meals.service';
import { Store } from 'store';

@Component({
  selector: 'app-meals',
  template: `
    <div class="container">
      <div class="meals">
        <div class="meals__title">
          <h1>
            <img src="../../../../assets/images/food.svg" />
            Your Meals
          </h1>

          <a [routerLink]="['../meals/new']" class="btn__add">
            <img src="../../../../assets/images/add-white.svg" />
            New Meal
          </a>
        </div>

        <div *ngIf="meals$ | async as meals; else loading">
          <div class="message" *ngIf="!meals.length">
            <img src="../../../../assets/images/face.svg" />
            No Meals! Add a new meal to start
          </div>

          <app-list-item
            *ngFor="let meal of meals"
            [item]="meal"
            (remove)="removeMeal($event)"
          ></app-list-item>
        </div>

        <ng-template #loading>
          <div class="message">
            <img src="../../../../assets/images/loading.svg" />
            Fetching meals...
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(private store: Store, private mealsService: MealsService) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.$key);
  }
}
