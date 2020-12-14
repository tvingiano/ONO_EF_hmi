import {Component, OnInit, ViewChild} from '@angular/core';
import {OnoApiService} from '../../../../service/ono-api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {LampInfo} from '../../../../model/system/LampInfo';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-lamps',
    templateUrl: './lamps.component.html',
    styleUrls: ['./lamps.component.scss']
})
export class LampsComponent implements OnInit {
    displayedColumns: string[] = [
        'Code',
        'Color',
        'Channel1Consumption',
        'Channel2Consumption',
        'Channel3Consumption',
        'Channel4Consumption',
        'Edit',
        'Delete',
    ];

    private dataSource: MatTableDataSource<LampInfo> = new MatTableDataSource<LampInfo>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
        private ono: OnoApiService,
        private uiLoaderService: NgxUiLoaderService,
    ) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        this.uiLoaderService.start();
        this.ono.lampsGet().subscribe(
            (response: LampInfo[]) => {
                this.dataSource.data = response;
                this.uiLoaderService.stop();
            }
        );
    }

}
