import { Component, Input,  SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Input() rowTargets!: number[];
  @Input() colTargets!: number[];
  @Input() answer!: number[] | undefined;

  rowTargetIndices!: number[];
  colTargetIndices!: number[];
  gridIndices!: number[];
  grid: number[] = [];

  @Output() newRowTarget = new EventEmitter<number[]>();
  @Output() newColTarget = new EventEmitter<number[]>();
  @Output() newRowWeight = new EventEmitter<number[]>();
  @Output() newColWeight = new EventEmitter<number[]>();

  addRowTarget(index: number, value: number) {
    this.newRowTarget.emit([index, value]);
  }

  addColTarget(index: number, value: number) {
    this.newColTarget.emit([index, value]);
  }

  addRowWeight(row: number, col: number, value: number) {
    this.newRowWeight.emit([row, col, value]);
  }

  addColWeight(row: number, col: number, value: number) {
    this.newColWeight.emit([row, col, value]);
  }

  debounceTimeout: any;

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      let change = changes[name];
      if (name == 'rows') {
        this.rows = change.currentValue;
      } else if (name == 'columns') {
        this.columns = change.currentValue;
        this.grid = [];
      }
    }
    this.calculateIndices();
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
        (i % this.rows) +
        1
    );
  }

  changeInput(event: Event, index: number, name: string) {
    const input = event.target as HTMLInputElement;
    const validatedInput = this.validateInput(input, 1, 30);
    if (name == 'row') {
      this.addRowTarget(index, validatedInput);
    } else if (name == 'col') {
      this.addColTarget(index, validatedInput);
    } else if (name == 'grid') {
      const row = Math.floor(index / this.rows);
      const col = index % this.columns;
      this.grid[index] = validatedInput;
      this.addRowWeight(row, col, validatedInput);
      this.addColWeight(col, row, validatedInput);
    }

    input.value = validatedInput.toString();
  }

  validateInput(input: HTMLInputElement, min: number, max: number): number {
    let value = parseInt(input.value, 10);

    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    return value;
  }

  handleKeydown(event: KeyboardEvent, index: number): void {
    const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (arrows.includes(event.key)) {
      event.preventDefault();
    }
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      const row = Math.floor(index / (this.rows + 1));
      const col = index % (this.columns + 1);

      let nextIndex: number | null = null;

      switch (event.key) {
        case 'ArrowUp':
          if (row > 0) {
            nextIndex = index - this.columns - 1;
          }
          break;

        case 'ArrowDown':
          if (row < this.rows) {
            nextIndex = index + this.columns + 1;
          }
          break;

        case 'ArrowLeft':
          if (col > 0) {
            nextIndex = index - 1;
          } else if (col >= 0 && row > 0) {
            nextIndex = index - 1;
          }
          break;

        case 'ArrowRight':
          if (col <= this.columns) {
            nextIndex = index + 1;
          }
          break;

        case 'Tab':
          return;

        default:
          return;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        this.focusCell(nextIndex);
      }
    }, 5);
  }

  focusCell(index: number): void {
    const input = document.getElementById(`cell-${index}`) as HTMLInputElement;
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
