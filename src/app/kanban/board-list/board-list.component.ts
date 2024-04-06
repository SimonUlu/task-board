import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseCrudServiceService } from '../../services/firebase-crud-service.service';
import { Board } from '../board.model';
import { ShellComponent } from '../../shared/shell/shell.component';
import { BoardComponent } from '../board/board.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [ShellComponent, BoardComponent, SharedModule],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss'
})
export class BoardListComponent implements OnInit{

  boards: Board[] = [];

  constructor(public firebaseService: FirebaseCrudServiceService) {

  }


  ngOnInit(): void {
    (async () => {
      try {
        this.boards = await this.firebaseService.getUserBoards();
        console.log(this.boards);
      } catch (error) {
        console.error(error);
        // Behandle den Fehler entsprechend, z.B. durch Setzen von boards auf ein leeres Array
        this.boards = [];
      }
    })();
  }
}
