import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// containers
import { MealComponent } from './containers/meal/meal.component';
import { MealsComponent } from './containers/meals/meals.component';

const routes: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
