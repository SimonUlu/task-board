import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { FirebaseCrudServiceService } from '../../services/firebase-crud-service.service';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [SharedModule, MatButtonToggle, MatButtonToggleGroup, MatDialogClose, FormsModule],
  template: `
  <h1 mat-dialog-title>Task</h1>
  <div mat-dialog-content class="content">
    <mat-form-field>
      <textarea
        placeholder="Task description"
        matInput
      ></textarea>
    </mat-form-field>
    <br />
    <mat-button-toggle-group
      #group="matButtonToggleGroup"
      [(ngModel)]="data.task.label"
    >
      <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
        <mat-icon [ngClass]="opt">{{
          opt === 'gray' ? 'check_circle' : 'lens'
        }}</mat-icon>
      </mat-button-toggle>
    </mat-button-toggle-group>
  </div>
  <div mat-dialog-actions>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
      {{ data.isNew ? 'Add Task' : 'Update Task' }}
    </button>

  </div>
  `,
  styles: ``
})
export class TaskDialogComponent {

  labelOptions = ["purple", "blue", "green", "yellow", "red", "gray"];

  constructor(
    private matDialog: MatDialog,
    private firebaseService: FirebaseCrudServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
    this.matDialog.closeAll();
  }

  handleTaskDelete() {

  }
}
