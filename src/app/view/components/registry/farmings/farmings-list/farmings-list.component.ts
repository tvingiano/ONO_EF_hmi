import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FarmingsInfo} from '../../../../../model/registries/farmings-info';

@Component({
    selector: 'app-farmings-list',
    templateUrl: './farmings-list.component.html',
    styleUrls: ['./farmings-list.component.scss']
})
export class FarmingsListComponent implements OnInit {
    @Input() title: string;
    @Input() initialData: FarmingsInfo[];

    @Output() createClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() editClick: EventEmitter<FarmingsInfo> = new EventEmitter<FarmingsInfo>();
    @Output() deleteClick: EventEmitter<FarmingsInfo> = new EventEmitter<FarmingsInfo>();

    private displayedColumns: string[] = [
        'Farming',
        'Owner',
        'Edit',
        'Delete',
    ];
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

}
