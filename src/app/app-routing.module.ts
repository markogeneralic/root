import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityMainComponent } from './components/activity-main/activity-main.component';
import { CountryMainComponent } from './components/country-main/country-main.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { EventMainComponent } from './components/event-main/event-main.component';
import { LoginComponent } from './components/login/login.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { AuthGuard } from './helpers/canActivateAuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'country', component: CountryMainComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductMainComponent, canActivate: [AuthGuard] },
  { path: 'activity', component: ActivityMainComponent, canActivate: [AuthGuard] },
  { path: 'data', component: EventMainComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardMainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
