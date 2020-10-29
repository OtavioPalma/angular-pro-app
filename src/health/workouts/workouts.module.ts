import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing module
import { WorkoutsRoutingModule } from './workouts-routing.module';

// containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';

@NgModule({
  declarations: [WorkoutsComponent],
  imports: [CommonModule, WorkoutsRoutingModule],
})
export class WorkoutsModule {}
