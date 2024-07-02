import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './pages/dashbord.component';

const routes: Routes = [
  {
    path: 'dashbord',
    component: DashbordComponent,
    loadChildren: () =>
      import('./router-child.module').then((m) => m.RouterChildModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DahsbordRoutingModule {}
