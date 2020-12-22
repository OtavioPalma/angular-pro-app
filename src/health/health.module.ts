import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// routing module
import { HealthRoutingModule } from './health-routing.module';
//shared module
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [CommonModule, HealthRoutingModule, SharedModule],
})
export class HealthModule {}
