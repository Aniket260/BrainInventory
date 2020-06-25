import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { BrainService } from './product.service';

@Injectable({
   providedIn: 'root'
   })

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){ }
  intercept(req, next) {

    const serviceFarm = this.injector.get(BrainService);

    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization : `${serviceFarm.getToken()}` // Read token
      }
    });
    return next.handle(tokenizedReq);
  }
}

// complete
