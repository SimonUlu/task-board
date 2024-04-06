import { Component, Input } from '@angular/core';
import { Board } from '../board.model';
import { FirebaseCrudServiceService } from '../../services/firebase-crud-service.service';
import { ShellComponent } from '../../shared/shell/shell.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../task.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ShellComponent, DragDropModule, SharedModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  @Input() board!: Board;

  constructor(private firebaseService: FirebaseCrudServiceService) {}

}
