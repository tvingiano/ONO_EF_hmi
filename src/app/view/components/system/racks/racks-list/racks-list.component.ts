import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RackInfo} from '../../../../../model/system/RackInfo';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-racks-list',
    templateUrl: './racks-list.component.html',
    styleUrls: ['./racks-list.component.scss']
})
export class RacksListComponent implements OnInit {
    /* components params */
    @Input() parentModuleID: number;
    @Input() initialData: RackInfo[];
    @Input() title: string;

    /* events */
    @Output() createClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() viewClick: EventEmitter<RackInfo> = new EventEmitter<RackInfo>();
    @Output() editClick: EventEmitter<RackInfo> = new EventEmitter<RackInfo>();
    @Output() deleteClick: EventEmitter<RackInfo> = new EventEmitter<RackInfo>();

    displayedColumns: string[] = [
/*        'System', */
        'Rackname',
/*        'Module', */
        'LightSlotsNumber',
        'GrowthSlotsNumber',
        'Humidity',
        'Temperature',
        'PlcAddress',
        'View',
        'Edit',
        'Delete',
    ];

    dataSource: MatTableDataSource<RackInfo> = new MatTableDataSource<RackInfo>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor() {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        if (this.initialData) {
            this.dataSource.data = this.initialData;
        }
    }
}
