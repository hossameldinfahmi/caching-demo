// data.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-observable-caching-component',
  template: `
    <h2>Data Component</h2>
    <button (click)="fetchData()">Fetch Data</button>
    <div *ngIf="data">
      <h3>Data:</h3>
      <pre>{{ data | json }}</pre>
    </div>
  `,
})
export class ObservablePatternsCachingComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getDataWithCache().subscribe(
      (result) => {
        this.data = result;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  fetchData(): void {
    // Force refresh the cache
    this.dataService.refreshCacheIfNeeded();
    this.dataService.getDataWithCache().subscribe(
      (result) => {
        this.data = result;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
