import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { MealsComponent } from './containers/meals/meals.component';

const routes: Routes = [{ path: '', component: MealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
