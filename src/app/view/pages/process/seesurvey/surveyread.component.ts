import { Component, Inject } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';
import * as CanvasJS from './canvasjs.min';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  text: string;
}
export interface Process {
  ProcessID: number;
  OrderID: string;
  DrawerSerial: number;
  StartTime: string;
  Consumption: number;
  Actual: string;
  Measurements: any;
  Light: string;
  heights: string;
  solution: string;
  lights: string;
  ec: string;
  ph: string;
  note: string;

}

export interface Measurements {
  Height: string;
  Ec: string;
  Ph: string;
  Solution: string;
  Lights: string;
  Note: string;
  Timestamp: string;
}

export interface Drawer {
  serial: number;
  order: string;
  slot: number;
  status: string;
}



@Component({
  selector: 'surveyread',
  templateUrl: './surveyread.component.html',
  styleUrls: ['./surveyread.component.css']
}
)
export class SurveyRead {
  ProcessID: number;
  OrderID: string;
  DrawerSerial: number;
  Configuration: string;
  StartTime: string;
  Consumption: number;
  Measurements: any;
  heights: string;
  solution: string;
  lights: string;
  ec: string;
  ph: string;
  note: string;
  to: string;
  drawerserial: number;
  description: string;
  configuration: string;
  light: string;
  Description: string;
  Light: string;


  displayedColumns: string[] = ['expid', 'drawerid', 'tankid', 'starttime', 'status', 'endtime', 'details', "light", "refill", "sampling"];

  dataSource2: Drawer[]

  dataSources: Process[]
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
          value = value.sort(function(a,b){
            return new Date(b.StartTime).getTime() - new Date(a.StartTime).getTime()
          });
          me.utilsService.hideLoader();
          me.dataSource = new MatTableDataSource(value) || [];
        }
      );
  }
  dataCalcFromSurvey(surveys) {
    surveys = surveys.filter(function (el) {
      return el.Status == "closed"
    });
    var ext = []
    surveys.forEach(function (experiment) {
      var hold = experiment.Holder
      if (hold == "Radi") {
        var pl = 184
      } else if (hold == "Medi") {
        var pl = 296
      } else {
        var pl = 536
      }
      var l = (experiment.Sampling).length
      var c = []
      for (var i = 0; i < l; i++) {
        var fi = experiment.Sampling[i].FreshWeight
        var date = Math.round((new Date(experiment.Sampling[i].Timestamp).getTime() - new Date(experiment.StartTime).getTime()) / (1000 * 60 * 60 * 24));
        if (date > 0) {
          var cyc = Math.round(365 / date)
          c.push({
            "growingDays": date,
            "singlePlantFreshWeight": fi / 1000,
            "cyclesPerYear": cyc,
            "pl": pl
          })
        }
      }
      var durations = []
      for (var j = 0; j < c.length; j++) {
        durations.push(c[j].growingDays)
      }
      durations = durations.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      })
      var p = []
      durations.forEach(function (val) {
        const same = c.filter(va => va.growingDays === val);
        const average = same.reduce((total, next) => total + next.singlePlantFreshWeight, 0) / same.length;
        p.push({
          "growingDays": same[0].growingDays,
          "singlePlantFreshWeight": average,
          "cyclesPerYear": same[0].cyclesPerYear,
          "productionPerDrawerPerYear": average * same[0].pl * 3 * cyc,
          "productionPerYearPerSquaremeter": average * same[0].pl * 3 * cyc / 3.6
        })

      })

      var obj = {
        "expid": experiment.ExpID,
        "planttype": experiment.PlantType,
        "substrate": experiment.Substrate,
        "plantsPerTank": pl,
        "statistics": p
      }
      ext.push(obj)
    })
    var datas = []
    ext.forEach(function (val) {
      datas.push({ y: val.statistics[val.statistics.length - 1].productionPerYearPerSquaremeter, label: val.expid })
    })
    var chart = new CanvasJS.Chart("chartContainerr",
      {
        title: {
          text: "Production statistics"
        },
        zoomEnabled: true,
        animationEnabled: true,

        axisY: {
          title: "productionPerYearPerSquaremeter",
          titleFontSize: 20,
          labelFontSize: 15,
        },
        axisX: {
          labelFontSize: 15,
          interval: 1
        },
        data: [{
          type: "bar",
          dataPoints: datas
        }]
      });

    chart.render();
  }

  getDetails(element): void {
    const dialogRef = this.dialog.open(Notesst, {
      width: '2000px',
      data: { measurements: element }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  onLight(element): void {
    const dialogRef = this.dialog.open(Notesst2, {
      width: '2000px',
      data: { measurements: element }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onRefill(element): void {
    const dialogRef = this.dialog.open(Notesst3, {
      width: '2000px',
      data: { measurements: element }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSampling(element): void {
    const dialogRef = this.dialog.open(Notesst4, {
      width: '2000px',
      data: { measurements: element }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


@Component({
  selector: 'note',
  templateUrl: 'note2.html',
  styleUrls: ['./note.css']
})

export class Notesst {
  displayedColumns: string[] = ['Format', 'PlantType', 'PlantVariety', 'Holder', 'Substrate', 'Company','Notes'];

  dataSource

  constructor(
    public dialogRef: MatDialogRef<Notesst>,
    public OnoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    //@ts-ignore
    var value = this.data.measurements
    this.dataSource = [{Format: value.Format, 
      PlantType: value.PlantType, PlantVariety: value.PlantVariety, Holder: value.Holder, Substrate: value.Substrate, Company: value.Company, Notes: value.Note
    }]
  }
  return(): void {
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}


@Component({
  selector: 'note',
  templateUrl: 'note3.html',
  styleUrls: ['./note.css']
})

export class Notesst2 {
  displayedColumns: string[] = ['LightDrawerID', 'LightHours', 'LightSpectrum', 'Red', 'Blue', 'White', "Purple", "LedDrawerDistance", "TreatmentStart",'Notes'];

  dataSource

  constructor(
    public dialogRef: MatDialogRef<Notesst2>,
    public OnoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    //@ts-ignore
    var as = this.data.measurements.Light
    var ext = []
    as.forEach(function (value) {
      ext.push({
        LightDrawerID: value.LightDrawerID, LightHours: value.LightHours, LightSpectrum: value.LightSpectrum, Red: value.RedIntensity, Blue: value.BlueIntensity, White: value.WhiteIntensity,
        Purple: value.PurpleIntensity, LedDrawerDistance: value.LedDrawerDistance, TreatmentStart: value.Timestamp, Notes: value.Note
      })
    })
    this.dataSource = ext

  }
  return(): void {
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}


@Component({
  selector: 'note',
  templateUrl: 'note4.html',
  styleUrls: ['./note.css']
})

export class Notesst3 {
  displayedColumns: string[] = ['TotalInitialVolume', 'SolutionType', 'NutrientSolution', 'Water', 'TotalFinalVolume',
    'InitialEC', 'FinalEC', 'InitialpH', 'FinalpH', 'Ozone', 'Calcium', 'Potassium', 'TreatmentStart','Notes'];

  dataSource

  constructor(
    public dialogRef: MatDialogRef<Notesst3>,
    public OnoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    //@ts-ignore
    var as = this.data.measurements.Refill
    var ext = []
    as.forEach(function (value) {
      ext.push({
        TotalInitialVolume: value.TotalInitialVolume, SolutionType: value.SolutionType, NutrientSolution: value.NutrientSolution, Water: value.Water,
        TotalFinalVolume: value.TotalFinalVolume,
        InitialEC: value.InitialEC,
        FinalEC: value.FinalEC, InitialpH: value.InitialpH,
        FinalpH: value.FinalpH, Ozone: value.Ozone, Calcium: value.Calcium, Potassium: value.Potassium,
        TreatmentStart: value.Timestamp, Notes: value.Note
      })
    })
    this.dataSource = ext

  }
  return(): void {
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}


@Component({
  selector: 'note',
  templateUrl: 'note5.html',
  styleUrls: ['./note.css']
})

export class Notesst4 {
  displayedColumns: string[] = ['Type', 'Germination', 'Area','Number', 'Phi2', 'NPQt', 'FvPFmP',
    'LeafTempDifferential', 'RelativeChlorophyll', 'PlantsHeight', 'LeavesNumber', 'FreshWeight', 'StemThickness', 'SamplingDate','Notes'];

  dataSource

  constructor(
    public dialogRef: MatDialogRef<Notesst4>,
    public OnoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    //@ts-ignore
    var as = this.data.measurements.Sampling
    var ext = []
    as.forEach(function (value) {
      ext.push({
        Type: value.Type, Germination: value.Germination, Area: value.Area,Number: value.Number,SampleID: value.SampleID, Phi2: value.Phi2, NPQt: value.NPQt, FvPFmP: value.FvPFmP, LeafTempDifferential: value.LeafTempDifferential,
        RelativeChlorophyll: value.RelativeChlorophyll, PlantsHeight: value.PlantsHeight, LeavesNumber: value.LeavesNumber, FreshWeight: value.FreshWeight, StemThickness: value.StemThickness, SamplingDate: value.Timestamp, Notes: value.Note
      })
    })

    this.dataSource = ext
  }
  return(): void {
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}