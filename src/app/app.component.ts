import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrossSumGrid } from './core/cross-sum-grid/cross-sum-grid.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrossSumGrid],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gridRows: number = 8;
  gridColumns: number = 8;
  gridCellSize: number = 40;
}
