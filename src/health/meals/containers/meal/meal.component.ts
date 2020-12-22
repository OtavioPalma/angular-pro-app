import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/health/shared/services/meals.service';

@Component({
  selector: 'app-meal',
  template: `
    <div class="container">
      <div class="meal">
        <div class="meal__title">
          <h1>
            <img src="../../../../assets/images/food.svg" />
            <span>Create Meal</span>
          </h1>
        </div>

        <div>
          <app-meal-form (create)="addMeal($event)"></app-meal-form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  addMeal(event: Meal) {
    console.log(event);
  }
}
