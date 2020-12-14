import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SlotInfo} from '../../../../../model/system/SlotInfo';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-slots-list',
    templateUrl: './slots-list.component.html',
    styleUrls: ['./slots-list.component.scss']
})
export class SlotsListComponent implements OnInit {

    /* components params */
    @Input() parentRackID: number;
    @Input() initialData: SlotInfo[];
    @Input() title: string;

    /* events */
    @Output() createClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() viewClick: EventEmitter<SlotInfo> = new EventEmitter<SlotInfo>();
    @Output() editClick: EventEmitter<SlotInfo> = new EventEmitter<SlotInfo>();
    @Output() deleteClick: EventEmitter<SlotInfo> = new EventEmitter<SlotInfo>();

    displayedColumns: string[] = [
        'Slotname',
        'Rack',
        'Slotstatus',
        'Area',
        'LightConfiguration',
        'LampsNumber',
        'Height',
        'RackSide',
        'View',
        'Edit',
        'Delete',
    ];

    private dataSource: MatTableDataSource<SlotInfo> = new MatTableDataSource<SlotInfo>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
    ) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        if (this.initialData) {
            this.dataSource.data = this.initialData;
        }
    }

}
