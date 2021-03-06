import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{ item.name }}</p>

        <p class="list-item__ingredients">
          <span *ngIf="item.ingredients; else showWorkout">
            {{ item.ingredients | join }}
          </span>

          <ng-template #showWorkout>
            {{ item | workout }}
          </ng-template>
        </p>
      </a>

      <div class="list-item__delete" *ngIf="toggled">
        <p>Delete item?</p>

        <button class="confirm" type="button" (click)="removeItem()">
          Yes
        </button>

        <button class="cancel" type="button" (click)="toggle()">No</button>
      </div>

      <button class="trash" type="button" (click)="toggle()">
        <img src="../../../../assets/images/remove.svg" />
      </button>
    </div>
  `,
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [`../${item.ingredients ? 'meals' : 'workouts'}`, item.$key];
  }
}
