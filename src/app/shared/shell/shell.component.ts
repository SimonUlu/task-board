import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit{

  userIsAuthenticated:boolean = false;
  private authStatusSub?: Subscription;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches), 
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this.authStatusSub = this.firebaseService.getAuthState().subscribe(authStatus => {
      this.userIsAuthenticated = authStatus;
    });

    console.log(this.userIsAuthenticated);
  }

  signOut() {
    this.firebaseService.logOutUser();
  }
}
