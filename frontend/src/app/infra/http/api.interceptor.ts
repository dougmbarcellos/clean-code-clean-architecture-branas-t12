import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req);
  }

  let url = req.url.startsWith('/')
    ? `${environment.apiUrl}${req.url}`
    : `${environment.apiUrl}/${req.url}`;

  return next(
    req.clone({
      url,
    })
  );
};
