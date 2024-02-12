// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cache$!: Observable<any>;
  private cacheTime!: Date;
  private cacheExpiry = 1;

  constructor(private http: HttpClient) {}

  getDataWithCache(): Observable<any> {
    this.refreshCacheIfNeeded();
    if (!this.cache$) {
      this.cache$ = this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
        tap(() => {
          this.cacheTime = new Date();
        }),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

    refreshCacheIfNeeded(): void {
      const now = new Date();
      if (!this.cacheTime || now.getTime() - this.cacheTime.getTime() > this.cacheExpiry) {
        if (this.cache$) {
          this.cache$ = null!;
          this.cacheTime = null!;
        }
      }
    }
}
