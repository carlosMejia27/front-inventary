import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DahsbordRoutingModule } from './modules/dashbord/dashboard-rounting.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashbord' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, useHash: true }),
    DahsbordRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
