import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { provideToastr } from 'ngx-toastr';
import { spinnerInterceptor } from './core/interceptors/spinner/spinner.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,spinnerInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 5000, // مدة العرض 5 ثواني
      progressBar: true, // تفعيل شريط التقدم
      progressAnimation: 'increasing', 
    }), 
    
  ]
};
