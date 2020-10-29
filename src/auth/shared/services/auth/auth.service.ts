import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { Store } from 'store';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store, private angularFireAuth: AngularFireAuth) {}

  get authState() {
    return this.angularFireAuth.authState;
  }

  auth$ = this.angularFireAuth.authState.pipe(
    map((next) => {
      if (!next) {
        this.store.set('user', null);
        return;
      }

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      };

      this.store.set('user', user);
    })
  );

  createUser(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.angularFireAuth.signOut();
  }
}
