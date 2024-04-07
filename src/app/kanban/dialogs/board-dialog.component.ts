import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1 mat-dialog-title class="text-2xl font-bold">Board</h1>
    <div mat-dialog-content class="mb-4">
      <p class="mb-2">What shall we call this board?</p>
      <mat-form-field class="w-full">
        <input placeholder="title" matInput />
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="flex justify-end">
      <button mat-button (click)="onNoClick()" class="mr-2">Cancel</button>
      <button mat-button cdkFocusInitial>Create</button>
    </div>
  `,
  styles: ``
})
export class BoardDialogComponent {


  constructor(public matDialog: MatDialog) {}

  public onNoClick(): void {
    this.matDialog.closeAll();
  }
}
