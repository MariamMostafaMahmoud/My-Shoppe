import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // logic
  if (localStorage.getItem('userToken')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken')!
      }
    })
  }

  return next(req);
};
