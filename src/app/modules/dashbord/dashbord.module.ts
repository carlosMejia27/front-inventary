import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './pages/dashbord.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';

@NgModule({
  declarations: [HomeComponent, DashbordComponent],
  imports: [CommonModule, SharedModule, CategoryModule],
})
export class DashbordModule {}
