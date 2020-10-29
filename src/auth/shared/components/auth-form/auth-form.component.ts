import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ng-content select="h1"></ng-content>

        <label>
          <input
            type="email"
            placeholder="Email address"
            formControlName="email"
          />
        </label>

        <label>
          <input
            type="password"
            placeholder="Password"
            formControlName="password"
          />
        </label>

        <div class="error" *ngIf="invalidProperty('email', 'email')">
          Invalid Email
        </div>
        <div class="error" *ngIf="invalidProperty('email', 'required')">
          Email is required!
        </div>
        <div class="error" *ngIf="invalidProperty('password', 'required')">
          Password is required!
        </div>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  invalidProperty(field, prop) {
    const control = this.form.get(field);
    return control.hasError(prop) && control.touched;
  }
}
