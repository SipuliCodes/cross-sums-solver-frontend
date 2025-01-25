import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CrossSumGrid } from './core/cross-sum-grid/cross-sum-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrossSumGrid, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gridSize: number = 8;
  gridRows: number = this.gridSize;
  gridColumns: number = this.gridSize;
  gridCellSize: number = 40;

  changeGridSize( min: number, max: number) {
    if (this.gridSize < min) {
      this.gridSize = min;
    } else if (this.gridSize > max) {
      this.gridSize = max;
    }

    this.gridRows = this.gridSize;
    this.gridColumns = this.gridSize;
  }
}
