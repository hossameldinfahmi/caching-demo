// src/app/cache.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  save(key: string, data: any, cacheMinutes: number): void {
    const expires = new Date().getTime() + cacheMinutes * 60000;
    const record = { value: data, expires };
    localStorage.setItem(key, JSON.stringify(record));
  }

  load(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const record = JSON.parse(item);
    const now = new Date().getTime();
    if (now > record.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return record.value;
  }
}
