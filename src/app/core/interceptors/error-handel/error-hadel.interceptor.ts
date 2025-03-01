import { HttpInterceptorFn } from '@angular/common/http';

export const errorHadelInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
