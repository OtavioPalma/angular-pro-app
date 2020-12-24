import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="controls">
      <button type="button" (click)="moveDate(offset - 1)">
        <img src="../../../../assets/images/chevron-left.svg" />
      </button>

      <p>{{ selected | date: 'MMMM d, y' }}</p>

      <button type="button" (click)="moveDate(offset + 1)">
        <img src="../../../../assets/images/chevron-right.svg" />
      </button>
    </div>
  `,
  styleUrls: ['./schedule-controls.component.scss'],
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  constructor() {}

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
