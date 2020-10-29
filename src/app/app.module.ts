import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Store } from 'store';

import { AppComponent } from './containers/app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
 var firebaseConfig = {
    apiKey: "AIzaSyABS37TKYOhrp_q_X3p1y_-bYXCPjMB7T0",
    authDomain: "fitness-app-otavio.firebaseapp.com",
    databaseURL: "https://fitness-app-otavio.firebaseio.com",
    projectId: "fitness-app-otavio",
    storageBucket: "fitness-app-otavio.appspot.com",
    messagingSenderId: "97988052475",
    appId: "1:97988052475:web:6a1f99e885e67c54e7b75e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
*/
