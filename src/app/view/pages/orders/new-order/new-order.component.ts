import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IOrderInfo } from 'src/app/model/orders/orders-info';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { OnoApiService } from 'src/app/service/ono-api.service';
import { OrderDetailModalComponent } from '../components/order-detail-modal/order-detail-modal';
import { OrderGanttComponent } from '../components/order-gantt/order-gantt.component';
import { OrderOrder } from '../ordersList.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  constructor(
    private utilsService: UtilsService,
    private onoApiService: OnoApiService,
    private dialog: MatDialog,
    private ganttChart: OrderGanttComponent,
  ) { }


  dataSource: IOrderInfo[];
  selectedOrder: IOrderInfo;
  selData: IOrderInfo[];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.utilsService.showLoader();
    this.onoApiService
      .getFullOrders()
      .subscribe(
        value => {
          this.utilsService.hideLoader();
          this.dataSource = value || [];
        }
      );
  }

  sortGantt(x) {
    this.ganttChart.updateSort(x);
  }

  updateOrderList() {
    this.getData();
  }

  onValidate(element): void {
    this.utilsService.showLoader();
    this.onoApiService
      .validateOrder(element.OrderName)
      .subscribe(
        value => {
          this.updateOrderList();
          this.utilsService.hideLoader();
        }
      );
  }
  onDelete(element): void {
    this.utilsService.showLoader();
    this.onoApiService
      .deleteOrder(element.OrderName)
      .subscribe(
        value => {
          this.updateOrderList();
          this.utilsService.hideLoader();
        }
      );
  }

  addOrder(): void {
    const dialogRef = this.dialog.open(OrderOrder, {
      width: '400px',
      height: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      result.quantity = parseFloat(result.quantity);
      this.utilsService.showLoader();
      this.onoApiService.addOrder(result)
        .subscribe(
          value => {
            if (value.Response) {
              if (confirm(JSON.stringify(value.Response))) {
              }
            }
            this.updateOrderList();
            this.utilsService.hideLoader();
          }
        );
    });
  }

  setSelectedOrder(e){
    const newOrder = this.dataSource.filter(x => x.OrderName === e)[0];
    if (newOrder === this.selectedOrder) {
      this.selectedOrder = undefined;
    } else {
      this.selectedOrder = newOrder;
    }
  }

  showDetails(data) {
    const dialogRef = this.dialog.open(OrderDetailModalComponent);
    dialogRef.componentInstance.data = data;
  }

}



