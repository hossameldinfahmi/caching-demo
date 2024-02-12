import { Component } from '@angular/core';
import { CacheService } from '../cache.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-caching',
  templateUrl: './service-caching.component.html',
  styleUrl: './service-caching.component.scss',
})
export class ServiceCachingComponent {
  title = 'caching-demo';
  cachedData: any;

  constructor(private cacheService: CacheService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cachedData = this.cacheService.load('cachedData');
    console.log(this.cachedData);
  }

  fetchData(): void {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    this.http.get(apiUrl).subscribe(
      (result) => {
        this.cacheService.save('cachedData', result, 0.5); // Cache for 5 minutes

        this.cachedData = result;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
