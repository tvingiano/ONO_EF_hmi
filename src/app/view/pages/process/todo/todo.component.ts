import { Component, Inject } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';

export interface DialogData {
  text: string;
}


@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
}
)
export class Todo {
  displayedColumns: string[] = ['expid', 'drawer', 'tankid', 'lastRefill', 'nextRefill', 'lastSampling', 'nextSampling', 'status1', 'status2'];
  dataSource

  constructor(public dialog: MatDialog, private onoApiService: OnoApiService, private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.getProcessInfoList()
  }
  applyFilter(event) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
  updateProcessInfoList() {
    this.getProcessInfoList();
  }

  getProcessInfoList() {
    var me = this
    me.utilsService.showLoader();
    me.onoApiService
      .readSurveys()
      .subscribe(
        value => {
          value = value.sort(function (a, b) {
            return new Date(b.StartTime).getTime() - new Date(a.StartTime).getTime()
          });
          var ext = []
          value.forEach(function (val) {
            var obj = {}
            var last = val.Refill[val.Refill.length-1].Timestamp
            obj["lastRefill"] = new Date(last).getDate() + '-' + (new Date(last).getMonth() + 1) + '-' + new Date(last).getFullYear();
            if (val.Sampling.length > 0) {
              var lastSam = val.Sampling[val.Sampling.length-1].Timestamp
              obj["lastSampling"] = new Date(lastSam).getDate() + '-' + (new Date(lastSam).getMonth() + 1) + '-' + new Date(lastSam).getFullYear();
            
            } else {
              var lastSam = val.StartTime
              obj["lastSampling"] = "Never"

            }
            if (val.Status == "running") {
              var re
              val.RefillFactor ? re = val.RefillFactor : re = 4
              var next = new Date(last).setDate(new Date(last).getDate() + re);
              if (new Date().getTime() >= next) {
                var a = new Date(next).getDate() + '-' + (new Date(next).getMonth() + 1) + '-' + new Date(next).getFullYear();

                obj["status1"] = "warning"
                obj["nextRefill"] = a
              } else if (Math.floor((next - new Date().getTime())/ (1000 * 60 * 60 * 24)) <=2) {
                obj["status1"] = "error" 

                for (var k = 1; k < 50; k++) {
                  if (next >= new Date().getTime()) {
                    var a2 = new Date(next).getDate() + '-' + (new Date(next).getMonth() + 1) + '-' + new Date(next).getFullYear();
                    obj["nextRefill"] = a2
                    break
                  }
                }
              } else {
                obj["status1"] = "done"
                for (var k = 1; k < 50; k++) {
                  if (next >= new Date().getTime()) {
                    var a2 = new Date(next).getDate() + '-' + (new Date(next).getMonth() + 1) + '-' + new Date(next).getFullYear();
                    obj["nextRefill"] = a2
                    break
                  }
                } 
              }




              var sa
              val.SamplinFactor ? sa = val.SamplinFactor : sa = 10
              var next2 = new Date(lastSam).setDate(new Date(lastSam).getDate() + sa);
              if (new Date().getTime() >= next2) {
                var a = new Date(next2).getDate() + '-' + (new Date(next2).getMonth() + 1) + '-' + new Date(next2).getFullYear();

                obj["status2"] = "warning"
                obj["nextSampling"] = a
              } else if (Math.floor((next2 - new Date().getTime())/ (1000 * 60 * 60 * 24)) <=2) {
                obj["status2"] = "error" 

                for (var k = 1; k < 50; k++) {
                  if (next2 >= new Date().getTime()) {
                    var a2 = new Date(next2).getDate() + '-' + (new Date(next2).getMonth() + 1) + '-' + new Date(next2).getFullYear();
                    obj["nextSampling"] = a2
                    break
                  }
                }
              } else {
                obj["status2"] = "done"

                for (var k = 1; k < 50; k++) {
                  if (next2 >= new Date().getTime()) {
                    var a2 = new Date(next2).getDate() + '-' + (new Date(next2).getMonth() + 1) + '-' + new Date(next2).getFullYear();
                    obj["nextSampling"] = a2
                    break
                  }
                } 
              }

              obj["expid"] = val.ExpID
              obj['drawer'] = val.DrawerID
              obj['tankid'] = val.TankID
              // if (obj["status1"] == "Warning" || obj["status2"] == "Warning") obj["status"] = "Warning"
              // if (obj["status1"] != "done" && obj["status2"] != "done") 
              ext.push(obj)
            }
          })
          me.utilsService.hideLoader();
          me.dataSource = ext || [];
        }
      );
  }
  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
}