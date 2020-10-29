import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing module
import { ScheduleRoutingModule } from './schedule-routing.module';

// containers
import { ScheduleComponent } from './containers/schedule/schedule.component';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, ScheduleRoutingModule],
})
export class ScheduleModule {}
