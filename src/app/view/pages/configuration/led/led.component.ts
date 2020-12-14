import {Component, OnInit} from '@angular/core';
import {PageState} from '../../../../model/page-state.enum';
import {OnoApiService} from 'src/app/service/ono-api.service';
import {UtilsService} from '../../../../service/helper/utils.service';
import {LedInfo} from '../../../../model/configuration/led-info';

@Component({
    selector: 'app-led',
    template: `
        <app-page-wrapper title="LED panels" shadow="false">
            <mat-card>
                <mat-card-content>
                    <div class="row">
                        <div class="col-md">
                            <!-- show spinner -->
                            <div class="d-flex justify-content-center mt-5" *ngIf="!entityList">
                                <mat-spinner diameter="50"></mat-spinner>
                            </div>
                            <app-led-list *ngIf="entityList"
                                             [title]="'LED panels' | translate"
                                             [initialData]="entityList"
                                             [displayedColumns]="displayedColumns"
                                             (On)="On($event)"
                                             (Off)="Off($event)"
                            ></app-led-list>
                        </div>

                    </div>
                </mat-card-content>
            </mat-card>
        </app-page-wrapper>
    `,
    styleUrls: ['./led.component.scss']
})

export class LedsComponent2 implements OnInit {

    private pageStates = PageState;

    entityInfo: LedInfo;
    entityList: LedInfo[];
    displayedColumns: string[] = [
        "Address",
        "Status",
        "Type",
        "On",
        "Off"
    ];


    constructor(
        private onoApiService: OnoApiService,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.updateEntityList();
    }

    updateEntityList() {
        this.entityList = null;
        this.onoApiService.getLed()
            .subscribe(
                value => {
                    this.entityList = value || [];
                }
            );
    }

    On(element): void {
        var result = {
          "address": parseInt(element.Address),
          "pwm1Int": 1000,
          "pwm2Int": 1000,
          "pwm3Int": 1000,
          "pwm4Int": 1000
        }
            this.onoApiService.manageLamp(result)
        var ress = {
          "address": parseInt(element.Address),
          "status": "on"
        }
            this.onoApiService.manageLamp(result)

      }

      Off(element): void {
        var result = {
          "address": parseInt(element.Address),
          "pwm1Int": 0,
          "pwm2Int": 0,
          "pwm3Int": 0,
          "pwm4Int": 0
        }
           this.onoApiService.manageLamp(result)
        var ress = {
          "address": parseInt(element.Address),
          "status": "off"
        }
      //  this.onoApiService.changeLampStatus(ress).subscribe(() => {
        //    this.updateEntityList();
       // });
    this.onoApiService.manageLamp(result)

 
      }
    
}
