import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
    title: string;
}

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <div mat-dialog-content>
            <p>{{data.title}}</p>
        </div>
        <div mat-dialog-actions class="justify-content-center">
            <button mat-button (click)="dialogRef.close()" cdkFocusInitial color="primary">{{'label.NoThanks' | translate}}</button>
            <button mat-button [mat-dialog-close]="true" color="accent">{{'label.ok' | translate}}</button>
        </div>
    `,
    styles: []
})
export class ConfirmDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) {
    }

    ngOnInit() {
    }

}
