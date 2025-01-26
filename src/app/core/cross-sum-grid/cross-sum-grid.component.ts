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

  handleKeydown(event: KeyboardEvent, index: number): void {
    const row = Math.floor(index / this.rows);
    const col = index % this.columns;

    let upDownLeftRightKey: boolean = false;
    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowUp':
        upDownLeftRightKey = true;
        if (row > 0) {
          nextIndex = index - this.columns;
        }
        break;

      case 'ArrowDown':
        upDownLeftRightKey = true;
        if (row < this.rows - 1) {
          nextIndex = index + this.columns;
        }
        break;

      case 'ArrowLeft':
        upDownLeftRightKey = true;
        if (col > 0) {
          nextIndex = index - 1;
        }
        break;

      case 'ArrowRight':
        upDownLeftRightKey = true;
        if (col < this.columns - 1) {
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
    const inputs = document.querySelectorAll(
      '.grid-cell'
    ) as NodeListOf<HTMLInputElement>;
    if (inputs[index]) {
      inputs[index].focus();
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
