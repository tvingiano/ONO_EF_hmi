import {Component, OnInit, ViewChild} from '@angular/core';
import {OnoApiService} from '../../../../service/ono-api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {UtilsService} from '../../../../service/helper/utils.service';
import {SeedEditDialogComponent} from './seed-edit-dialog/seed-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import { ISeed } from 'src/app/model/registries/seeds-info';

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

  dataSource: MatTableDataSource<ISeed> = new MatTableDataSource<ISeed>();

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
    this.ono.getSeeds().subscribe(
        (response: ISeed[]) => {
          this.dataSource.data = response;
          this.uiLoaderService.stop();
        }
    );
  }
  onEditClick(value: ISeed) {
    this.openEditDialog(value);
  }


  openEditDialog(value: ISeed) {
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
                      return this.ono.getSeeds();
                    })
                )
                .subscribe((response: ISeed[]) => {
                  this.dataSource.data = response;
                  this.uiLoaderService.stop();
                });
          }
        }
    );
  }


}
