// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheService } from './cache.service';
import { AppComponent } from './app.component';
import { InterceptorCachingComponent } from './interceptor-caching/interceptor-caching.component';
import { CacheInterceptor } from './cache.interceptor';
import { ServiceCachingComponent } from './service-caching/service-caching.component';
import { ObservablePatternsCachingComponent } from './observable-patterns-caching/observable-patterns-caching.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceCachingComponent,
    InterceptorCachingComponent,
    ObservablePatternsCachingComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
