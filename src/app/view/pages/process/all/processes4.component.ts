import { Component, Inject } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

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
  selector: 'processes4',
  templateUrl: './processes4.component.html',
  styleUrls: ['./processes4.component.css']
}
)
export class ProcessesComponent4 {
  ProcessID: number;
  OrderID: string;
  DrawerSerial: number;
  Configuration: string;
  StartTime: string;
  EndTime: string;

  Consumption: number;
  Measurements: any;
  heights: string;
  solution: string;
  lights: string;
  ec: string;
  ph: string;
  note: string;
  to: string;

  //displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','delete','edit'];
  // displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','edit'];
  displayedColumns: string[] = ['OrderID', 'Description', "Statuss", "StartTime", "EndTime", "measurements", "curve"];

  dataSource2: Drawer[]

  dataSource: Process[]
  trans = [

    { str: "Pit-stop", num: 101 },
    { str: "Red&Blue4-30cm", num: 1 },
    { str: "Window1", num: 5 },
    { str: "Window2", num: 7 },
    { str: "Window3", num: 9 },
    { str: "Window4", num: 11 },
    { str: "Window6", num: 15 },
    { str: "Window7", num: 17 },
    { str: "Window8", num: 20 },

    { str: "Buio1", num: 123 },
    { str: "Buio2", num: 124 },
    { str: "Buio3", num: 125 },

    { str: "Full7-0cm", num: 36 },
    { str: "Full7-10cm", num: 35 },
    { str: "Full7-20cm", num: 34 },

    { str: "Red&Blue6-0cm", num: 122 },
    { str: "Red&Blue6-10cm", num: 121 },
    { str: "Red&Blue6-20cm", num: 120 },
    { str: "Red&Blue6-30cm", num: 119 },

    { str: "White9-0cm", num: 33 },
    { str: "White9-10cm", num: 32 },
    { str: "White9-20cm", num: 31 },
    { str: "White9-30cm", num: 30 },

    { str: "Purple5-0cm", num: 113 },
    { str: "Purple5-10cm", num: 112 },
    { str: "Purple5-20cm", num: 111 },
    { str: "Purple5-30cm", num: 110 },

    { str: "Full1-0cm", num: 116 },
    { str: "Full1-10cm", num: 115 },
    { str: "Full1-20cm", num: 114 },
    { str: "Full1-30cm", num: 113 },

    { str: "Red&Blue3-0cm", num: 29 },
    { str: "Red&Blue3-10cm", num: 28 },
    { str: "Red&Blue3-20cm", num: 27 },
    { str: "Red&Blue3-30cm", num: 26 },


    { str: "Red&Blue4-0cm", num: 4 },
    { str: "Red&Blue4-10cm", num: 3 },
    { str: "Red&Blue4-20cm", num: 2 },

    { str: "Red&Blue2-0cm", num: 40 },
    { str: "Red&Blue2-10cm", num: 39 },
    { str: "Red&Blue2-20cm", num: 38 },
    { str: "Red&Blue2-30cm", num: 37 },


    { str: "Purple8-0cm", num: 102 },

    { str: "Purple10-0cm", num: 130 },
    { str: "Purple10-10cm", num: 129 },
    { str: "Purple10-20cm", num: 128 },
    { str: "Purple10-30cm", num: 127 }

  ]

  constructor(public dialog: MatDialog, private onoApiService: OnoApiService, private router: Router) { }

  ngOnInit() {
    var me = this
    var ext = []
    var ext2 = []

    this.onoApiService.getFullDrawerss().then(function (res) {
      if (res) {
        res.forEach(function (value) {
          ext2.push({
            serial: value.Serial, order: value.CurrentOrder, slot: value.Slotname, status: value.DrawerStatus
          })
        })
      }
      me.dataSource2 = ext2
    })

    setTimeout(function () {
      me.onoApiService.getProcesses().then(function (res) {

        res.sort(function (a, b) {
          return a.DrawerSerial - b.DrawerSerial;
        });


        if (res && me.dataSource2) {
          res.forEach(function (value) {
            ext.push({
              ProcessID: value.ProcessID, OrderID: value.OrderID, Description: value.Description, DrawerSerial: value.DrawerSerial,
              Light: value.Light, Configuration: value.Configuration, Status: value.ProcessStatus,
              StartTime: value.StartTime, EndTime: value.EndTime, LastMeasurements: value.LastMeasurements
            })
          })
        }
        me.dataSource = ext
      })
    }, 500);


  }


  getMeasurement(result) {
    const dialogRef = this.dialog.open(Notess2, {
      width: '2000px',
      data: { measurements: result.LastMeasurements }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onImages() {
    this.dialog.open(Images2, {
      width: '2000px',
      height: '1200px'

    });
  }
  onCurve(element) {
    this.dialog.open(Curves2, {
      data: {
        measures: element.CvMeasures
      },
      width: '1000px',
      height: '1200px'

    });
  }
  onRiepilogo() {
    this.dialog.open(Riepilogo2, {
      width: '780px',
      height: '500px'

    });
  }

  onDelete(element): void {
    if (confirm("Are you sure to stop the process " + element.OrderID + " - " + element.Description + "?")) {
      this.onoApiService.abortProcess(element.ProcessID).then(function (res) {
        setTimeout(function () {
          window.location.reload();
        }, 50);

      })
    }
  }


  return() {
    this.router.navigate(['status'])
  }

}




@Component({
  selector: 'note',
  templateUrl: 'note.html',
  styleUrls: ['./note.css']
})

export class Notess2 {
  displayedColumns: string[] = ['Ec', 'Ph', 'Solution', 'Lights', 'Note', 'Timestamp'];

  dataSource: Measurements[]

  constructor(
    public dialogRef: MatDialogRef<Notess2>,
    public OnoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    //@ts-ignore
    var as = this.data.measurements
    var ext = []
    as.forEach(function (value) {
      ext.push({
        Height: value.Height, Ec: value.Ec, Ph: value.Ph, Solution: value.Solution, Lights: value.Lights, Note: value.Note,
        Timestamp: value.Timestamp
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
  selector: 'images2',
  templateUrl: './images2.html'
})
export class Images2 {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Original', cols: 1, rows: 1 },
          { title: 'Height', cols: 1, rows: 1 },
          { title: 'Area', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Original', cols: 1, rows: 1 },
        { title: 'Height', cols: 1, rows: 1 },
        { title: 'Area', cols: 1, rows: 1 }
      ];
    })
  );


  getUrl() {
    return "url('assets/images/ONO_interfaccia_sfondo_azzurro.png')";
  }

  constructor(private breakpointObserver: BreakpointObserver) { }
}
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'curves2',
  templateUrl: './curves2.html'
})
export class Curves2 {
  /** Based on the screen size, switch from standard to one column per row */
  ngOnInit() {
    var meas = this.data.measures
    let heightpoints = []
    meas.forEach(function (val) {
      heightpoints.push({ x: new Date(val.Timestamp), y: val.Moda })
    })
    let chartheight = new CanvasJS.Chart("chartheight", {
      zoomEnabled: true,
      animationEnabled: true,
      axisX: {
        title: "day",
      },
      axisY: {
        title: "[cm]",
      },

      title: {
      },
      data: [
        {
          type: "line",
          dataPoints: heightpoints
        }]
    });

    chartheight.render();
    let areapoints = []
    meas.forEach(function (val) {
      areapoints.push({ x: new Date(val.Timestamp), axisY: val.Percentage })
    })
    let chartarea = new CanvasJS.Chart("chartarea", {
      zoomEnabled: true,

      animationEnabled: true,
      axisX: {
        title: "day",
      },
      axisY: {
        title: "[cm^2]",
      },

      title: {
      },
      data: [
        {
          type: "line",
          dataPoints: areapoints
        }]
    });

    chartarea.render();
  }


  getUrl() {
    return "url('assets/images/ONO_interfaccia_sfondo_azzurro.png')";
  }

  constructor(private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'riepilogo2',
  templateUrl: './riepilogo2.html'
})
export class Riepilogo2 {


  constructor(
    public dialogRef: MatDialogRef<Riepilogo2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  return(): void {
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
