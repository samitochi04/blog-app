import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';  // Ensure RegisterComponent is correctly imported
import { DashboardComponent } from './dashboard/dashboard.component';  // Optional, for dashboard
import { AuthGuard } from './auth/auth.guard';  // If using AuthGuard

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },  // Default route, redirects to login
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },  // Ensure this is correctly configured
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // For logged-in users
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
