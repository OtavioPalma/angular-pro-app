import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// routing module
import { HealthRoutingModule } from './health-routing.module';

@NgModule({
  imports: [CommonModule, HealthRoutingModule],
})
export class HealthModule {}
