import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CrossSumGrid } from './core/cross-sum-grid/cross-sum-grid.component';
import { CrossSumService } from './services/cross-sum.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrossSumGrid, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  crossSumService = inject(CrossSumService);
  gridSize: number = 8;
  gridRows: number = this.gridSize;
  gridColumns: number = this.gridSize;
  gridCellSize: number = 40;

  rowTargets: number[] = new Array<number>(this.gridSize);
  colTargets: number[] = new Array<number>(this.gridSize);

  rowWeights: number[][] = Array.from({length: this.gridSize}, () => [])
  colWeights: number[][] = Array.from({length: this.gridSize}, () => [])

  addRowTarget([index, value]: number[]) {
    this.rowTargets[index] = value;
  }

  addColTarget([index, value]: number[]) {
    this.colTargets[index] = value;
  }

  addRowWeight([row, col, value]: number[]) {
    this.rowWeights[row][col] = value;
  }

  addColWeight([row, col, value]: number[]) {
    this.colWeights[row][col] = value;
  }

  changeGridSize(min: number, max: number) {
    if (this.gridSize < min) {
      this.gridSize = min;
    } else if (this.gridSize > max) {
      this.gridSize = max;
    }

    this.rowTargets = new Array<number>(this.gridSize);
    this.colTargets = new Array<number>(this.gridSize);
    this.rowWeights = Array.from({length: this.gridSize}, () => [])
    this.colWeights = Array.from({length: this.gridSize}, () => [])

    this.gridRows = this.gridSize;
    this.gridColumns = this.gridSize;
  }

  handleFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;

    setTimeout(() => input.select(), 0);
  }

  onSolveClick(): void {
    console.log(this.rowTargets)
    console.log(this.colTargets)
    console.log(this.rowWeights)
    console.log(this.colWeights)
  }
}
