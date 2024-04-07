import { Component, Input } from '@angular/core';
import { Board } from '../board.model';
import { FirebaseCrudServiceService } from '../../services/firebase-crud-service.service';
import { ShellComponent } from '../../shared/shell/shell.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ShellComponent, DragDropModule, SharedModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  @Input() board!: Board;

  constructor(private firebaseService: FirebaseCrudServiceService, public matDialog: MatDialog) {}

  openDialog(task?: any, idx?: number) {
    const newTask = {label: 'purple'};
    const dialogRef = this.matDialog.open(TaskDialogComponent,  {
      width: "500px", 
      data: task
      ? {task: {...task}, isNew: false, boardId: this.board.id, idx}
      : {task: newTask, isNew: true}
    })
  }

}
