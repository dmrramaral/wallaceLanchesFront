import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor para adicionar o token JWT em todas as requisições HTTP
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Lista de URLs que não precisam de autenticação
  const publicEndpoints = ['/auth/login', '/auth/register', '/cliente'];

  // Verifica se a requisição é para um endpoint público
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    req.url.includes(endpoint)
  );

  // Se tiver token e não for endpoint público, adiciona o Authorization header
  if (token && !isPublicEndpoint) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Intercepta erros de autenticação
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token inválido ou expirado, faz logout
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
