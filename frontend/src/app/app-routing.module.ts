import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blogs', component: BlogListComponent, canActivate: [AuthGuard] },
  { 
    path: 'blogs/create', 
    component: BlogFormComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'blogs/edit/:id', 
    component: BlogFormComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { path: 'admin/register', component: AdminRegisterComponent },
  { path: '**', redirectTo: '/blogs' }
];
