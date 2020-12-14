import {Component, OnInit, ViewChild} from '@angular/core';
import {OnoApiService} from '../../../../service/ono-api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SeedsInfo} from '../../../../model/product/SeedsInfo';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {UtilsService} from '../../../../service/helper/utils.service';
import {SeedEditDialogComponent} from './seed-edit-dialog/seed-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.scss']
})
export class SeedsComponent implements OnInit {
  displayedColumns: string[] = [
    'SeedType',
    'Specie',
    'Farming',
    'GerminatedPercentage',
    'WeightForDrawer',
    'Contingency',
    'Edit',
    'Delete',
  ];

  dataSource: MatTableDataSource<SeedsInfo> = new MatTableDataSource<SeedsInfo>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
      private ono: OnoApiService,
      private uiLoaderService: NgxUiLoaderService,
      private dialog: MatDialog,
      private utils: UtilsService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.uiLoaderService.start();
    this.ono.seedsGet().subscribe(
        (response: SeedsInfo[]) => {
          this.dataSource.data = response;
          this.uiLoaderService.stop();
        }
    );
  }
  onEditClick(value: SeedsInfo) {
    this.openEditDialog(value);
  }


  openEditDialog(value: SeedsInfo) {
    this.dialog.open(
        SeedEditDialogComponent,
        {
          data: {
            seedInfo: {
              ...value
            },
            title: 'Edit seed'
          }
        }
    ).afterClosed().subscribe(
        (result: FormGroup) => {
          if (result) {
            const dirtyValues = this.utils.getDirtyValues(result);
            const {value: {SeedType}} = result;
            this.uiLoaderService.start();
            this.ono
                .seedPut(SeedType, dirtyValues)
                .pipe(
                    switchMap(() => {
                      return this.ono.seedsGet();
                    })
                )
                .subscribe((response: SeedsInfo[]) => {
                  this.dataSource.data = response;
                  this.uiLoaderService.stop();
                });
          }
        }
    );
  }


}
