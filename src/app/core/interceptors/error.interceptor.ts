// core/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@core/services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage = 'Une erreur est survenue';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'Impossible de contacter le serveur';
        } else if (error.status === 404) {
          errorMessage = 'Ressource non trouvée';
        } else if (error.status === 400) {
          errorMessage = 'Requête invalide';
        } else if (error.status === 500) {
          errorMessage = 'Erreur serveur';
        }

        this.toast.show(errorMessage, 'error');
        return throwError(() => error);
      })
    );
  }
}