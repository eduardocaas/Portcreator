import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  if (token) {
    const cloneReq = req.clone({
      setHeaders: {
        "Token": token
      }
    });
    return next(cloneReq);
  } else {
    return next(req);
  }
};
