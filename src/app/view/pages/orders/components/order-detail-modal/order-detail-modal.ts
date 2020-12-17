import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOrderInfo } from 'src/app/model/orders/orders-info';

@Component({
  selector: 'app-confirm-send-dialog-modal',
  templateUrl: './order-detail-modal.component.html',
})
export class OrderDetailModalComponent implements OnInit {

  @Input() data: IOrderInfo;

  constructor(
    public confirmSendDialogRef: MatDialogRef<OrderDetailModalComponent>,
  ) { }

  dataSource: {
    key: string;
    value: any;
  }[] = [];

  costs: {
    key: string;
    value: any;
  }[] = [];



  ngOnInit() {
    if (!this.data) {
      this.close();
    } else {
      for (const [k, v] of Object.entries(this.data)) {
        this.dataSource.push({key: k, value: v});
      }

      for (const [k, v] of Object.entries(this.data.Cost)) {
        this.costs.push({key: k, value: v});
      }

    }

  }

  close() {
    this.confirmSendDialogRef.close(false);
  }
}
