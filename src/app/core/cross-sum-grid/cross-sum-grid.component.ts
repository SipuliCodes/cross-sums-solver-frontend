import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cross-sum-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cross-sum-grid.component.html',
  styleUrls: ['./cross-sum-grid.component.scss'],
})
export class CrossSumGrid {
  @Input() rows: number = 5;
  @Input() columns: number = 5;
  @Input() cellSize: number = 50;

  validateInput(event: Event, min: number, max: number): void {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value, 10);

    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    input.value = value.toString();
  }

  get gridStyles() {
    return {
      display: 'grid',
      gridTemplateRows: `repeat(${this.rows}, ${this.cellSize}px)`,
      gridTemplateColumns: `repeat(${this.columns}, ${this.cellSize}px)`,
    };
  }
}
