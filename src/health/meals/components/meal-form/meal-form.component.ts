import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meal } from 'src/health/shared/services/meals.service';

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal Name</h3>

            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />

            <div class="error" *ngIf="required">Workout name is required</div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>

            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()"
            >
              <img src="../../../../assets/images/add-white.svg" />
              Add Food
            </button>
          </div>

          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. Eggs" />

              <span class="meal-form__remove" (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createMeal()"
            >
              Create Meal
            </button>

            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateMeal()"
            >
              Save
            </button>

            <a class="button button--cancel" [routerLink]="['../']"> Cancel </a>
          </div>

          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>

              <button class="confirm" type="button" (click)="removeMeal()">
                Yes
              </button>

              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>
            </div>

            <button
              class="button button--delete"
              type="button"
              (click)="toggle()"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent implements OnChanges {
  @Input()
  meal: Meal;

  @Output()
  create: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output()
  update: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output()
  remove: EventEmitter<null> = new EventEmitter<null>();

  toggled: boolean = false;
  exists: boolean = false;

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: this.formBuilder.array(['']),
  });

  constructor(private formBuilder: FormBuilder) {}

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  ngOnChanges() {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit();
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
