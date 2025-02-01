import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable( {
  providedIn: 'root'
})
export class CrossSumService {
  constructor(private http: HttpClient) {
  }
  
  checkAnswer(rowTargets: number[], colTargets: number[], rowWeights: number[][], colWeights: number[][]): Observable<Object> {
    return this.http.post('http://localhost:5000/check', { row_targets: rowTargets, col_targets: colTargets, row_weights: rowWeights, col_weights: colWeights })
  }
}