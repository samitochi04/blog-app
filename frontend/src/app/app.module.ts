import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component'; // Import RegisterComponent
import { DashboardComponent } from './dashboard/dashboard.component';  // Optional, for dashboard
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // For forms

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,  // Declare RegisterComponent here
    DashboardComponent   // Optional, for dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
