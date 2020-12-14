import { Component, OnInit, ViewChild, AfterViewChecked, Inject } from '@angular/core';
import { OnoApiService } from '../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { IOrder } from 'src/app/model/orders/IOrder';
import { IOrderInfo } from 'src/app/model/orders/orders-info';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'ordersList',
  templateUrl: './ordersList.component.html',
  styleUrls: ['./ordersList.component.css']
})
export class OrdersListComponent {
  displayedColumns: string[] = ['ordername', 'recipe', 'batch', 'drawers', 'status', 'startforecast', 'endforecast', 'validate', 'edit', 'delete'];
  dataSource: IOrderInfo[];
  constructor(public dialog: MatDialog, public connectionService: OnoApiService, private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.getOrderList();
  }
  updateOrderList() {
    this.getOrderList();
  }
  getOrderList() {
    this.utilsService.showLoader();
    this.connectionService
      .getFullOrders()
      .subscribe(
        value => {
          this.utilsService.hideLoader();
          this.dataSource = value || [];
        }
      );
  }
  isInvalid(element) {
    if (element["OrderStatus"] == "validated" || element["OrderStatus"] == "running") {
      return true
    } else return false
  }
  ready() {
    this.connectionService
      .ready()
      .subscribe(
        value => {
          if (confirm(JSON.stringify(value.Response))) {
            var val = {
              "drawerID": parseInt(value.Serial),
              "orderID": value.Order
            }
            this.connectionService.startProcess(val)
          }
        })
  }
  return() {
    this.router.navigate(['orders'])
  }
  onValidate(element): void {
    var me = this
    this.utilsService.showLoader();
    this.connectionService
      .validateOrder(element.OrderName)
      .subscribe(
        value => {
          me.updateOrderList();
          me.utilsService.hideLoader();
        }
      );
  }
  onDelete(element): void {
    var me = this
    this.utilsService.showLoader();
    this.connectionService
      .deleteOrder(element.OrderName)
      .subscribe(
        value => {
          me.updateOrderList();
          me.utilsService.hideLoader();
        }
      );
  }
  addOrder(): void {
    const dialogRef = this.dialog.open(OrderOrder, {
      width: '400px',
      height: '500px',
      data: {}
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      result.quantity = parseFloat(result.quantity)
      this.utilsService.showLoader();
      me.connectionService.addOrder(result)
        .subscribe(
          value => {
            if (value.Response) {
              if (confirm(JSON.stringify(value.Response))) {
              }
            }
            me.updateOrderList();
            me.utilsService.hideLoader();
          }
        );
    })
  }
  getUrl() {
    return "url('assets/images/ONO_interfaccia_sfondo_azzurro.png')";
  }
}

@Component({
  selector: 'add-order-page',
  templateUrl: 'add-order-page.html',
})
export class OrderOrder {
  dynamicForm: FormGroup;
  recipes = []

  constructor(
    public dialogRef: MatDialogRef<OrderOrder>, public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.connectionService.getRecipes().then(res => {
      const array = [];
      res.forEach(val => {
        array.push(val.Recipename);
      });
      this.recipes = array;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
