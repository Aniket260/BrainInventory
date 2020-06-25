import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { BrainService } from '../product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private service: BrainService) {}

  canActivate(): boolean {
    if (this.service.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
