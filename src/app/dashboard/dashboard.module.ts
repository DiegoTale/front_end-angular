import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
