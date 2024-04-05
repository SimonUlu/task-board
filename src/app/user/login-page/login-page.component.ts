import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailLoginComponent } from '../email-login/email-login.component';


@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    EmailLoginComponent
  ],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  // Logical variables
  userIsAuthenticated:boolean = false;
  private authStatusSub?: Subscription;
  signUp:boolean = false;
  signIn:boolean = true;

  // Injected variables
  userEmail: string = "";
  userPassword: string = "";
  userConfirmPassword: string = "";

  constructor(public firebaseService: FirebaseService) { }

  logInWithGoogle() {
    this.firebaseService.createUserWithGoogle();
  }

  logInWithEmail() {
    this.firebaseService.logInUser("test@mail.de", "Testpassword");
  }

  signUpWithEmail() {
    this.firebaseService.createUserNormal("test@mail.de", "testspas");
  }

  signOut() {
    this.firebaseService.logOutUser();
  }

  ngOnInit(): void {
    this.authStatusSub = this.firebaseService.getAuthState().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
    console.log(this.userIsAuthenticated);
  }

  ngOnDestroy(): void {
      if (this.authStatusSub) {
        this.authStatusSub.unsubscribe();
      }
  }

}
