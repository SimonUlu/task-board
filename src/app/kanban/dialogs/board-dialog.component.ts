import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>3
    <p>What shall we call this board?</p>
      <mat-form-field>
        <input placeholder="title" matInput  />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial>
        Create
      </button>
    </div>
  `,
  styles: ``
})
export class BoardDialogComponent {


  constructor() {}

  public onNoClick(): void {
  }
}
