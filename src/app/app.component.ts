import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ShellComponent } from './shared/shell/shell.component';
import { FirebaseService } from './services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

// Firebase Imports

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    ShellComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task-board';

  constructor(private fireStore: Firestore, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    console.log("init");
  }
}