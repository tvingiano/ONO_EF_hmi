import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LedInfo} from '../../../../model/configuration/led-info';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-led-list',
    templateUrl: './led-list.component.html',
    styleUrls: ['./led-list.component.scss']
})
export class LedListComponent implements OnInit {
    /* components params */
    @Input() displayedColumns: string[] = [
        "Address",
        "Status",
        "Type",
        "On",
        "Off"
    ];

    @Input() initialData: LedInfo[];
    @Input() title: string;

    /* events */
    @Output() On: EventEmitter<null> = new EventEmitter<null>();
    @Output() Off: EventEmitter<null> = new EventEmitter<null>();


    dataSource: MatTableDataSource<LedInfo> = new MatTableDataSource<LedInfo>();

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
