import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// shared module
import { SharedModule } from '../shared/shared.module';
// components
import { MealFormComponent } from './components/meal-form/meal-form.component';
// containers
import { MealComponent } from './containers/meal/meal.component';
import { MealsComponent } from './containers/meals/meals.component';
// routing module
import { MealsRoutingModule } from './meals-routing.module';

@NgModule({
  declarations: [MealsComponent, MealComponent, MealFormComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MealsModule {}
