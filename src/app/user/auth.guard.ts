import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Injectable, Inject, inject } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class PermissionService  {
  constructor(private firebaseService: FirebaseService) {}

  canActivate() {
    const authState = this.firebaseService.getAuthState();
    return authState;
  }
}



export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate();
};

