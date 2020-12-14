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
  selector: 'processes3',
  templateUrl: './processes3.component.html',
  styleUrls: ['./processes3.component.css']
}
)
export class ProcessesComponent3 {
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

  //displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','delete','edit'];
  // displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','edit'];
  displayedColumns: string[] = ['OrderID', 'Description', 'DrawerSerial', 'Configuration', "StartTime", "measurements", "curve", "images", "status"];

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
    { str: "Full11-30cm", num: 103},
    { str: "Full11-20cm", num: 104 },
    { str: "Full11-10cm", num: 105 },
    { str: "Full11-0cm", num: 106 },

    { str: "Shadow3", num: 108 },
    { str: "Shadow4", num: 126 },
    { str: "Shadow5", num: 20 },

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
      me.onoApiService.getRunningProcesses().then(function (res) {

        res.sort(function (a, b) {
          return a.DrawerSerial - b.DrawerSerial;
        });


        if (res && me.dataSource2) {
          res.forEach(function (value) {
            var a = (me.dataSource2).find(x => x.serial === value.DrawerSerial).slot
            var b = (me.trans).find(x => x.num === a).str
            ext.push({
              ProcessID: value.ProcessID, OrderID: value.OrderID, Description: value.Description, DrawerSerial: value.DrawerSerial, Actual: b,
              Light: value.Light, Configuration: value.Configuration, CvMeasures: value.CvMeasures,
              StartTime: value.StartTime, LastMeasurements: value.LastMeasurements,  IdealHeight: value.IdealHeight,  IdealArea: value.IdealArea
            })
          })
        }
        me.dataSource = ext
      })
    }, 500);
  }
  getMeasurement(result) {
    const dialogRef = this.dialog.open(Notess, {
      width: '2000px',
      data: { measurements: result.LastMeasurements }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  onImages(element) {
    this.dialog.open(Images, {
      data: {
        id: element.ProcessID
      },
      width: '2000px',
      height: '1200px'

    });
  }
  onCurve(element) {
    this.dialog.open(Curves, {
      data: {
        measures: element.CvMeasures,
        height: element.IdealHeight,
        area: element.IdealArea
      },
      width: '1000px',
      height: '1200px'

    });
  }
  onRiepilogo() {
    this.dialog.open(Riepilogo, {
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

export class Notess {
  displayedColumns: string[] = ['Ec', 'Ph', 'Solution', 'Lights', 'Note', 'Timestamp'];

  dataSource: Measurements[]

  constructor(
    public dialogRef: MatDialogRef<Notess>,
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
  selector: 'images',
  templateUrl: './images.html'
})
export class Images {
  constructor(private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(

    map(({ matches }) => {
      if (matches) {
        return [
          { id: "assets/images/" + this.data.id + "/original.png", title: 'Original', cols: 1, rows: 1 },
          { id: "assets/images/" + this.data.id + "/height.png", title: 'Height', cols: 1, rows: 1 },
          { id: "assets/images/" + this.data.id + "/area.png", title: 'Area', cols: 1, rows: 1 }
        ];
      }

      return [
        { id: "assets/images/" + this.data.id + "/original.png", title: 'Original', cols: 1, rows: 1 },
        { id: "assets/images/" + this.data.id + "/height.png", title: 'Height', cols: 1, rows: 1 },
        { id: "assets/images/" + this.data.id + "/area.png", title: 'Area', cols: 1, rows: 1 }
      ];
    })
  );

  getUrl() {
    return "url('assets/images/ONO_interfaccia_sfondo_azzurro.png')";
  }

}
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'curves',
  templateUrl: './curves.html'
})
export class Curves {

  ngOnInit() {
    var meas = this.data.measures
    let heightpoints = []
    var startDa = new Date(meas[0].Timestamp)
    var startDay = startDa.getDate()
    meas.forEach(function (val) {
      var da = new Date(val.Timestamp)
      var dat = da.getDate()
      heightpoints.push({ x: dat - startDay, y: val.Moda })
    })
    let heightpointsIdeal = []

    var height = this.data.height
    height.forEach(function (val) {
      heightpointsIdeal.push({ x: val.Day, y: val.Value })
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
					showInLegend: true,
					type: "line",
					name: "Expected values",
					dataPoints: heightpointsIdeal
				},
				{
					showInLegend: true,

					type: "line",
					name: "Measured values",
					dataPoints: heightpoints
				}]
    });

    chartheight.render();
    let areapoints = []
    meas.forEach(function (val) {
      var da = new Date(val.Timestamp)
      var dat = da.getDate()
      areapoints.push({ x: dat - startDay, y: val.Percentage })
    })
    let areapointsIdeal = []

    var area = this.data.area
    area.forEach(function (val) {
      areapointsIdeal.push({ x: val.Day, y: val.Value })
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
					showInLegend: true,
					type: "line",
					name: "Expected values",
					dataPoints: areapointsIdeal
				},
				{
					showInLegend: true,

					type: "line",
					name: "Measured values",
					dataPoints: areapoints
				}]
    });

    chartarea.render();
  }
  // /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [

  //         { title: 'Height', cols: 1, rows: 1 },
  //         { title: 'Area', cols: 1, rows: 1 },
  //         //    { title: 'Riepilogo', cols: 1, rows: 1 }

  //       ];
  //     }

  //     return [

  //       { title: 'Height', cols: 1, rows: 1 },
  //       { title: 'Area', cols: 1, rows: 1 },
  //       //   { title: 'Riepilogo', cols: 1, rows: 1 }    
  //     ];
  //   })
  // );


  getUrl() {
    return "url('assets/images/ONO_interfaccia_sfondo_azzurro.png')";
  }

  constructor(private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'riepilogo',
  templateUrl: './riepilogo.html'
})
export class Riepilogo {


  constructor(
    public dialogRef: MatDialogRef<Riepilogo>,
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
