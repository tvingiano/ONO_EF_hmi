import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-del-modal',
  templateUrl: './del-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class DelModalComponent implements OnInit {

  @Input() public settings;
  del = false;

  constructor(
    public dialogRef: MatDialogRef<DelModalComponent>,
    public dataService: DataService
  ) { }

  ngOnInit() {
   }

  confirmDel() {
    this.del = true;
    this.dialogRef.close(this.del);
    this.dataService.openSnackBar('DELETION CONFIRMED!', 'close', 'successSnackBar');
  }

  close() {
    this.dialogRef.close(this.del);
  }

}
