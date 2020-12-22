import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// shared module
import { SharedModule } from '../shared/shared.module';
// components
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
// containers
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
// routing module
import { WorkoutsRoutingModule } from './workouts-routing.module';

@NgModule({
  declarations: [WorkoutsComponent, WorkoutFormComponent, WorkoutComponent],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class WorkoutsModule {}
