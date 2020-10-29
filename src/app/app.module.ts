import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from 'src/health/health.module';

// routing module
import { AppRoutingModule } from './app-routing.module';

// containers
import { AppComponent } from './containers/app.component';

// components
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, HealthModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
