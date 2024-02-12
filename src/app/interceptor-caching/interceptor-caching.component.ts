// src/app/interceptor-caching/interceptor-caching.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interceptor-caching',
  template: `
    <h1>Interceptor Caching Demo</h1>
    <button (click)="fetchData()">Fetch Data</button>
    <div *ngIf="interceptorData">
      <h2>Data from Interceptor:</h2>
      <pre>{{ interceptorData | json }}</pre>
    </div>
  `,
})
export class InterceptorCachingComponent {
  interceptorData: any;

  constructor(private http: HttpClient) {}

  fetchData(): void {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    // Make API request; caching is handled by the interceptor
    this.http.get(apiUrl).subscribe(
      (result) => {
        this.interceptorData = result;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
