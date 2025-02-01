import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CrossSumGrid } from './core/cross-sum-grid/cross-sum-grid.component';
import { CrossSumService } from './services/cross-sum.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrossSumGrid, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  crossSumService = inject(CrossSumService);
  gridSize: number = 8;
  gridRows: number = this.gridSize;
  gridColumns: number = this.gridSize;
  gridCellSize: number = 40;
  answer: number[] | undefined = undefined;
  errorMessage: string = "";

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

  validateGridData(rowTargets: number[], colTargets: number[], rowWeights: number[][], colWeights: number[][], gridSize: number ) {
    const correctRowTargets = rowTargets.every(value => value != undefined && value != null) && rowTargets.length == gridSize;
    const correctColTargets = colTargets.every(
      (value) => value != undefined && value != null
    ) && colTargets.length == gridSize
    const correctRowWeights = rowWeights.every(
      (sublist) => sublist.every( value => value != undefined && value != null) && sublist.length == gridSize
    ) && rowWeights.length == gridSize
    const correctColWeights =
      colWeights.every(
        (sublist) =>
          sublist.every((value) => value != undefined && value != null) &&
          sublist.length == gridSize
      ) && colWeights.length == gridSize;
    
    return (correctRowTargets && correctColTargets && correctRowWeights &&correctColWeights)
  }

  onSolveClick(): void {
    if (this.validateGridData(this.rowTargets, this.colTargets, this.rowWeights, this.colWeights, this.gridSize)) {
      const observable = this.crossSumService.checkAnswer(this.rowTargets, this.colTargets, this.rowWeights, this.colWeights)
      observable.subscribe(answer => {
        this.answer = Array.from(Object.entries(answer), ([_, value]) => value).flat();
      })
    } else {
      this.errorMessage = "Missing data. Fill all cells and try again!"
      setTimeout(() => this.errorMessage = "", 5000)
    }
  }
}
