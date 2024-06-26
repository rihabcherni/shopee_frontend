// tab.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabPageRoutingModule } from './tab-routing.module';
import { TabPage } from './tab.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [TabPage]
})
export class TabPageModule {}
