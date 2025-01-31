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
  rowTargetIndices!: number[];
  colTargetIndices!: number[];
  gridIndices!: number[];

  rowTargets: number[] = [];
  colTargets: number[] = [];
  grid: number[] = [];
  rowWeights!: number[][];
  colWeights!: number[][];

  debounceTimeout: any;

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      let change = changes[name];
      if (name == 'rows') {
        this.rows = change.currentValue;
        this.rowWeights = [];
        this.rowTargets = [];
        for (let i = 0; i < this.rows; i++) {
          this.rowWeights.push([]);
        }
      } else if (name == 'columns') {
        this.columns = change.currentValue;
        this.colWeights = [];
        this.colTargets = [];
        this.grid = [];
        for (let i = 0; i < this.columns; i++) {
          this.colWeights.push([]);
        }
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
      this.rowTargets[index] = validatedInput;
    } else if (name == 'col') {
      this.colTargets[index] = validatedInput;
    } else if (name == 'grid') {
      const row = Math.floor(index / this.rows);
      const col = index % this.columns;
      this.grid[index] = validatedInput;
      this.rowWeights[row][col] = validatedInput;
      this.colWeights[col][row] = validatedInput;
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
    const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    if (arrows.includes(event.key)) {
      event.preventDefault()
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
    }, 5)
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
