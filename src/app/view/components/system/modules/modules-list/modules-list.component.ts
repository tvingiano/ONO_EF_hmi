import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModuleInfo} from '../../../../../model/system/ModuleInfo';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-modules-list',
    templateUrl: './modules-list.component.html',
    styleUrls: ['./modules-list.component.scss']
})
export class ModulesListComponent implements OnInit {

    /* components params */
    @Input() title: string;
    @Input() initialData: ModuleInfo[];

    /* events */
    @Output() createClick: EventEmitter<null> = new EventEmitter<null>();
    @Output() viewClick: EventEmitter<ModuleInfo> = new EventEmitter<ModuleInfo>();
    @Output() editClick: EventEmitter<ModuleInfo> = new EventEmitter<ModuleInfo>();
    @Output() deleteClick: EventEmitter<ModuleInfo> = new EventEmitter<ModuleInfo>();

    private displayedColumns: string[] = [
        'Modulename',
        'RackNumber',
        'LightSlotsNumber',
        'GrowthSlotsNumber',
        'SolutionCapacity',
        'View',
        'Edit',
        'Delete',
    ];
    private dataSource: MatTableDataSource<ModuleInfo> = new MatTableDataSource<ModuleInfo>();

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
