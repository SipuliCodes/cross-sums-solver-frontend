import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cross-sum-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cross-sum-grid.component.html',
  styleUrls: ['./cross-sum-grid.component.scss'],
})
export class CrossSumGrid {
  @Input() rows!: number;
  @Input() columns!: number;
  @Input() cellSize!: number;
  @Input() rowTargetIndices!: number[];
  @Input() colTargetIndices!: number[];
  @Input() gridIndices!: number[];

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      let change = changes[name];
      if (name == "rows") {
        this.rows = change.currentValue;
      } else if (name == "columns") {
        this.columns = change.currentValue;
      }
    }
    this.calculateIndices()
  }

  calculateIndices() {
    this.rowTargetIndices = Array.from({ length: this.columns }, (_, i) => i);
    this.colTargetIndices = Array.from(
      { length: this.rows },
      (_, i) => (i + 1) * this.rows + i
    );
    this.gridIndices = Array.from(
      { length: this.rows * this.columns },
      (_, i) =>
        (Math.floor(i / this.columns) + 1) * this.columns +
        Math.floor(i / this.columns) +
        (i % this.rows) + 1
    );
  }

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

  handleKeydown(event: KeyboardEvent, index: number): void {
    const row = Math.floor(index / (this.rows + 1));
    const col = index % (this.columns+1);

    let upDownLeftRightKey: boolean = false;
    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowUp':
        upDownLeftRightKey = true;
        if (row > 0) {
          nextIndex = index - this.columns - 1;
        }
        break;

      case 'ArrowDown':
        upDownLeftRightKey = true;
        if (row < this.rows) {
          nextIndex = index + this.columns + 1;
        }
        break;

      case 'ArrowLeft':
        upDownLeftRightKey = true;
        if (col > 0) {
          nextIndex = index - 1;
        } else if (col >= 0 && row > 0) {
          nextIndex = index - 1;
        }
        break;

      case 'ArrowRight':
        upDownLeftRightKey = true;
        if (col <= this.columns) {
          nextIndex = index + 1;
        }
        break;

      case 'Tab':
        return;

      default:
        return;
    }

    if (upDownLeftRightKey) {
      event.preventDefault();
    }

    if (nextIndex !== null) {
      event.preventDefault();
      this.focusCell(nextIndex);
    }
  }

  focusCell(index: number): void {
    const input = document.getElementById(`cell-${index}`
    ) as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }

  handleFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    
    setTimeout(() => input.select(), 0);
  }

  get gridStyles() {
    return {
      display: 'grid',
      gridTemplateRows: `repeat(${this.rows}, ${this.cellSize}px)`,
      gridTemplateColumns: `repeat(${this.columns}, ${this.cellSize}px)`,
    };
  }
}
