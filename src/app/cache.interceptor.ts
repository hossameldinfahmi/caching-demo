// cache-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, { data: any; expires: number }>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cache.get(req.urlWithParams);

    if (cachedResponse && !this.isCacheExpired(cachedResponse)) {
      return of(new HttpResponse({ body: cachedResponse.data }));
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const expirationTime = new Date().getTime() + 1 * 60 * 1000;
          this.cache.set(req.urlWithParams, { data: event.body, expires: expirationTime });
        }
      })
    );
  }

  private isCacheExpired(entry: { data: any; expires: number }): boolean {
    return new Date().getTime() > entry.expires;
  }
}
