import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators ,
  ReactiveFormsModule
} from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [SharedModule, CommonModule, ReactiveFormsModule],
  templateUrl: './email-login.component.html',
  styleUrl: './email-login.component.scss'
})
export class EmailLoginComponent implements OnInit {

  form: FormGroup;

  type: 'login' | 'signUp' | 'reset' = 'signUp';

  loading:boolean = false;

  serverMessage: string = "";

  constructor(public firebaseService: FirebaseService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', []]
    })
  }

  changeType(value: any) {
    this.type = value;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isRegister() {
    return this.type === "signUp";
  }

  get isPasswordReset() {
    return this.type === "reset";
  }

  get email() {
    return this.form.get("email")?.value || "";
  }

  get password() {
    return this.form.get("password")?.value;
  }

  get passwordConfirm() {
    return this.form.get("passwordConfirm")?.value;
  }

  get passwordDoesMatch() {
    if (this.type !== 'signUp') {
      return true;
    }
    else {
      return this.password === this.passwordConfirm;
    }
  }

  ngOnInit(): void {
      console.log("Hallo");
  }

  async onSubmit() {
    try {
      if (this.type === "signUp") {
        await this.firebaseService.createUserNormal(this.email, this.password);
      } else if (this.type === "login") {
        await this.firebaseService.logInUser(this.email, this.password);
      }
    } catch(err) {
      this.serverMessage = err as string;
      console.log(this.serverMessage);
    }
    
  }
  
}
