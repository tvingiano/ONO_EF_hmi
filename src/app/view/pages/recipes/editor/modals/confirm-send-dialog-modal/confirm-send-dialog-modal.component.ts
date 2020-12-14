import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-send-dialog-modal',
  templateUrl: './confirm-send-dialog-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class ConfirmSendDialogModalComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public confirmSendDialogRef: MatDialogRef<ConfirmSendDialogModalComponent>,
  ) { }

  ngOnInit() {

  }

  submit() {
    this.confirmSendDialogRef.close(true);
  }


  close() {
    this.confirmSendDialogRef.close(false);
  }
}
