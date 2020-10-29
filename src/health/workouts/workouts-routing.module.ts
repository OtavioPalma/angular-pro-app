import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';

const routes: Routes = [{ path: '', component: WorkoutsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsRoutingModule {}
