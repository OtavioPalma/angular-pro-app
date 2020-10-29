import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing module
import { MealsRoutingModule } from './meals-routing.module';

// containers
import { MealsComponent } from './containers/meals/meals.component';

@NgModule({
  declarations: [MealsComponent],
  imports: [CommonModule, MealsRoutingModule],
})
export class MealsModule {}
