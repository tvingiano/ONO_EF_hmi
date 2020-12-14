import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FarmingsInfo} from '../../../../model/registries/farmings-info';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {TableItem} from '../../../../model/table-item';

@Component({
    selector: 'app-items-table',
    templateUrl: './items-table.component.html',
    styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {
    /* input params */
    @Input() title: string;
    @Input() initialData: any;
    @Input() displayedColumns: TableItem[] = [];
    @Input() actionButtons: string[] = [];
    @Input() pageSize = 10;

    /* component events */
    @Output() createClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() viewClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() editClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter<any>();

    /* inner params */
    private dataSource: MatTableDataSource<FarmingsInfo> = new MatTableDataSource<FarmingsInfo>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor() {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        /* set initial data*/
        if (this.initialData) {
            this.dataSource.data = this.initialData;
        }
    }

    getTableColumns() {
        /* concat displayed columns with actions buttons  */
        return [...this.displayedColumns.map<string>(value => value.key), ...this.actionButtons];
    }

}
