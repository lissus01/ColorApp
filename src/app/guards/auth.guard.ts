import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private db: DbService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.db.ValidarSesion();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
