import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseCrudServiceService } from '../../services/firebase-crud-service.service';
import { Board } from '../board.model';
import { ShellComponent } from '../../shared/shell/shell.component';
import { BoardComponent } from '../board/board.component';
import { SharedModule } from '../../shared/shared.module';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [ShellComponent, BoardComponent, SharedModule, BoardDialogComponent],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent implements OnInit, OnDestroy{

  boards: Board[] = [];
  private subscription: Subscription = new Subscription();

  constructor(public firebaseService: FirebaseCrudServiceService, public dialog: MatDialog) {

  }

  openDialog():void {
    this.dialog.open(BoardDialogComponent, {
      width: "400px",
    })
  }

  
  ngOnInit(): void {
    this.subscription.add(this.firebaseService.getUserBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
      },
      error (error) {
        console.log(error);
      }
    }))
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
