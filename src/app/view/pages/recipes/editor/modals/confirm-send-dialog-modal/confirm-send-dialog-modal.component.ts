import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeRecapModalComponentComponent } from '../recipe-recap-modal-component/recipe-recap-modal-component.component';
import { RecipeSettingsModalComponent } from '../recipe-settings-modal/recipe-settings-modal.component';

@Component({
  selector: 'app-confirm-send-dialog-modal',
  templateUrl: './confirm-send-dialog-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class ConfirmSendDialogModalComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public confirmSendDialogRef: MatDialogRef<ConfirmSendDialogModalComponent>,
    private finalStep: MatDialogRef<RecipeRecapModalComponentComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

  }

  submit() {
    // this.confirmSendDialogRef.close(true);

    const dialogRef = this.dialog.open(RecipeRecapModalComponentComponent, {panelClass: 'custom-confirm-send-dialog-component'});
    dialogRef.afterClosed().subscribe(x => {
      this.confirmSendDialogRef.close(x);
    });
  }


  close() {
    this.confirmSendDialogRef.close(false);
  }
}
