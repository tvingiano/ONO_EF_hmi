import { Component, Inject, OnInit } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { BusyService } from 'src/app/service/busy.service';
import { IInfoProcess, IImageMetadata } from 'src/app/model/interface/IInfoProcess';

import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl } from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';



export interface DialogData {
  text: string;
}
export interface Result {
  From: number;
  To: number;
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
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./manage-style.scss']
}
)
export class ProcessesComponent implements OnInit {
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
  type;
  frequency;
  tank;
  volume;
  hour;
  minute;
  sched;
  Duration;
  FinalWeight;

  // displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','delete','edit'];
  // displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','edit'];
  displayedColumns: string[] =
    ['OrderID', 'Description', 'DrawerSerial', 'Actual', 'Light', 'edit', 'call', 'home', 'refill', 'deleterefill', 'delete'];

  trans = [
    { str: 'External bay', num: 0 },
    { str: 'Pit-stop', num: 101 },
    { str: 'Spray', num: 200 },
    { str: 'Window1', num: 5 },
    { str: 'Window2', num: 7 },
    { str: 'Window3', num: 9 },
    { str: 'Window4', num: 11 },
    { str: 'Window6', num: 15 },
    { str: 'Window7', num: 17 },

    { str: 'Full11-30cm', num: 103 },
    { str: 'Full11-20cm', num: 104 },
    { str: 'Full11-10cm', num: 105 },
    { str: 'Full11-0cm', num: 106 },

    { str: 'Shadow3', num: 108 },
    { str: 'Shadow4', num: 126 },
    { str: 'Shadow5', num: 20 },

    { str: 'Full7-0cm', num: 36 },
    { str: 'Full7-10cm', num: 35 },
    { str: 'Full7-20cm', num: 34 },

    { str: 'Red&Blue6-0cm', num: 122 },
    { str: 'Red&Blue6-10cm', num: 121 },
    { str: 'Red&Blue6-20cm', num: 120 },
    { str: 'Red&Blue6-30cm', num: 119 },

    { str: 'White9-0cm', num: 33 },
    { str: 'White9-10cm', num: 32 },
    { str: 'White9-20cm', num: 31 },
    { str: 'White9-30cm', num: 30 },

    { str: 'Purple5-0cm', num: 113 },
    { str: 'Purple5-10cm', num: 112 },
    { str: 'Purple5-20cm', num: 111 },
    { str: 'Purple5-30cm', num: 110 },

    { str: 'Full1-0cm', num: 116 },
    { str: 'Full1-10cm', num: 115 },
    { str: 'Full1-20cm', num: 114 },
    { str: 'Full1-30cm', num: 113 },

    { str: 'Red&Blue3-0cm', num: 29 },
    { str: 'Red&Blue3-10cm', num: 28 },
    { str: 'Red&Blue3-20cm', num: 27 },
    { str: 'Red&Blue3-30cm', num: 26 },


    { str: 'Red&Blue4-0cm', num: 4 },
    { str: 'Red&Blue4-10cm', num: 3 },
    { str: 'Red&Blue4-20cm', num: 2 },
    { str: 'Red&Blue4-30cm', num: 1 },

    { str: 'Red&Blue2-0cm', num: 40 },
    { str: 'Red&Blue2-10cm', num: 39 },
    { str: 'Red&Blue2-20cm', num: 38 },
    { str: 'Red&Blue2-30cm', num: 37 },


    { str: 'Purple8-0cm', num: 102 },

    { str: 'Purple10-0cm', num: 130 },
    { str: 'Purple10-10cm', num: 129 },
    { str: 'Purple10-20cm', num: 128 },
    { str: 'Purple10-30cm', num: 127 }

  ];

  processesData: IInfoProcess[];

  selectedProcess: IInfoProcess;
  currentImageMetadata;
  currentImageIndex;
  imagesMetadata = [];


  colors = {
    date: '#00aeef',
    growth: '#cf38cf',
    empty: '#fff',
    completed: '#32CD32',
  };

  imagesFound = undefined;
  imageUrl;
  loadingImages = false;

  now: Date;

  fullDrawers;
  slotList;
  newHome = undefined;

  homeForm = new FormControl('');

  refillMenu = false;

  filters = {
    startDate: undefined,
    endDate: undefined,
    status: [],
    progress: undefined,
    customer: undefined,
    id: undefined,
    recipe: undefined,
  };

  showfilter = false;

  loadingData = false;

  constructor(
    public dialog: MatDialog,
    private onoApiService: OnoApiService,
    private router: Router,
    private utilsService: UtilsService,
    private busyService: BusyService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.getProcessData();
  }

  print() {
    console.log(this.filters);
  }

  getProcessData() {

    this.loadingData = true;
    this.onoApiService.infoprocess().subscribe(x => {
      if (x !== null) {
        const appo = this.sortProcess(x);
        this.processesData = this.filter(appo);

        this.onoApiService.getFullDrawers().subscribe(y => {
          this.fullDrawers = y;

          this.onoApiService.slotsGet().subscribe(s => {
            this.slotList = s;

            // this.loadingData = false;
          });

        });
      }
      this.loadingData = false;
    });

    this.now = new Date();
  }

  sortProcess(x) {
    return x.sort( (a, b) => new Date(a.EndTime).valueOf() - new Date(b.EndTime).valueOf());
  }

  setFilter(key: string, value) {
    this.filters[`${key}`] = value;
    console.log(this.filters);
  }

  filter(x: IInfoProcess[]) {

    const appo = [];

    x.forEach(ele => {

      const f = this.filters;

      let pass = true;

      // check order ID
      f.id ? ((ele.OrderID !== f.id) ? pass = false : '') : '';


      // check status
      f.status.length ? f.status.forEach(s => {(s !== ele.Status) ? pass = false : ''; }) : '';


      // check recipe
      f.recipe ?  (ele.Recipe !== f.recipe ? pass = false : '') : '';

      // // check customer
      // if (f.customer) {
      //   if (ele !== f.recipe) {pass = false;}
      // }

      // check progress
      f.progress ? (this.getDateProgress(ele.StartTime, ele.EndTime) >= f.progress ? pass = false : '') : '';

      // check period

      const fs = f.startDate ? new Date(f.startDate).getTime() : new Date();
      const fe = f.endDate ? new Date(f.endDate).getTime() : new Date(2022, 0, 0);
      const s = new Date(ele.StartTime).getTime();
      const e = new Date(ele.StartTime).getTime();

      ((s >= fs) && (e <= fe)) ? pass = false : '';

      

      // alla fine se ele è ancora passabile:

      pass === true ? appo.push(ele) : '';


    });

    return appo;
  }


  /**
   * Set the current selected process and the list of avaiable images for that period
   * Also saves the downloaded imagesmetadata in this.imagesMetadata for future reuse;
   * @param process - IInfoProcess
   */
  setSelectedProcess(process: IInfoProcess) {
    this.selectedProcess = process;
    this.currentImageMetadata = undefined;
    this.newHome = undefined;
    this.homeForm.setValue(process.Home);
    // console.log(this.imagesMetadata);

    this.imagesFound = undefined;

    this.loadingImages = true;

    // check if selected period has already been downloaded

    let foundInArray = false;

    // i will just use this cycle to set foundInArray if exist
    for (const x of this.imagesMetadata) {
      if (x.ProcessID === process.ProcessID && foundInArray === false) {
        foundInArray = true;
      }
    }




    if (foundInArray === true) {

      // imagesmetadata has already been downloaded
      // gotta select the currentimages

      this.imagesMetadata.forEach(x => {
        if (x.ProcessID === process.ProcessID) {
          this.currentImageMetadata = x;
          this.imagesFound = true;
          this.currentImageIndex = 0;


          this.getUrl();
          this.loadingImages = false;

          // console.log('already in memory');
          return;
        }
      });

    } else {

      // imagesmetadata have never been downloaded
      // so i will do it now :)

      this.onoApiService.getImagesMetadata(process.ProcessID).subscribe(res => {

        if (res && res['ProcessID'] === process.ProcessID) {
          this.imagesFound = true;
          this.currentImageIndex = res['Images'].length - 1;
          this.currentImageMetadata = res;
          this.imagesMetadata.push(res);
        } else {
          this.imagesFound = false;
          this.currentImageIndex = undefined;
          this.currentImageMetadata = undefined;

        }

        this.getUrl();
        this.loadingImages = false;
      });
    }
  }


  isSelectedProcess() {
    return !!this.selectedProcess;
  }

  /**
   * returns dd/mm
   * @param data - date
   */
  formatData(data) {
    const formattedData = new Date(data);
    return `${formattedData.getDate()}/${formattedData.getMonth() + 1}`;
  }

  /**
   * returns dd/mm/yyyy-hh:mm
   * @param date - date
   */
  formatFullDate(date)  {
    const d = new Date(date);

    const dt = {
      h:  d.getUTCHours(),
      m:  d.getUTCMinutes() > 10 ? d.getUTCMinutes() : '0' + d.getUTCMinutes(),
      s:  d.getUTCSeconds() > 10 ? d.getUTCSeconds() : '0' + d.getUTCSeconds()
    };

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}-${dt.h}:${dt.m}:${dt.s}`;
  }

  /**
   * returns difference between now and date range in percentage format
   * @param start - process starting date
   * @param end - process ending date
   */
  getDateProgress(start, end) {
    const d1 = new Date(start).getTime();
    const d2 = new Date(end).getTime();
    const now = Date.now();

    const res = Math.round((now - d1) / (d2 - d1) * 100);

    return (res > 100 ? 100 : res) + '%';
  }

  /**
   * returns completion percentage between ExpectedFinalWeight and CvMeasusre.Percentage
   * @param process - IInforProcess format
   */
  getGrowthPercentage(process: IInfoProcess) {

    if (process.CvMeasures.length > 0) {
      const expectedWeight = process.ExpectedFinalWeight;
      const lastEl = process.CvMeasures.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf())[0];
      return (process.ExpectedFinalWeight * lastEl.Percentage / 100).toFixed(2);
    } else {
      return undefined;
    }
  }

  /**
   * return completion percentage based on date
   * @param process - IInforProcess format
   */
  getProgress(process: IInfoProcess) {
    const d1 = new Date(process.StartTime).getTime();
    const d2 = new Date(process.EndTime).getTime();
    const now = Date.now();

    return Math.round((now - d1) / (d2 - d1) * 100);
  }

  getTime(date) {
    const time = new Date(date);

    return `${time.getHours()}.${time.getMinutes()}.${time.getSeconds()}`;
  }



  getClass(process: IInfoProcess) {
    if (process.LightStatus === true) {
      switch (process.LightType) {
        case 'Full':
          return 'full';
        case 'White':
          return 'white';
        case 'Red&Blue':
          return 'redblue';
        case 'Purple':
          return 'purple';
        default:
          return 'def';
      }

    } else {
      return 'off';
    }
  }

  getUrl() {
    if (this.currentImageMetadata) {

      const process = this.selectedProcess.ProcessID;
      const type = 'original';
      const page = this.currentImageMetadata.Images[this.currentImageIndex].Page;

      this.imageUrl = `url('${environment.server.images}/${process}/${type}/${page}')`;

    } else {
      this.imageUrl = undefined;
    }
  }

  nextImg() {
    this.currentImageIndex++;
    this.getUrl();
  }
  backImg() {
    this.currentImageIndex--;
    this.getUrl();
  }

  lastImg() {
    return this.currentImageIndex === this.currentImageMetadata.Images.length - 1 ? true : false;
  }
  firstImg() {
    return this.currentImageIndex === 0 ? true : false;
  }

  getLastCvElement(array) {
    if (array) {
      return array.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf())[0];
    }
  }

  getLastSolutionElement(array) {
    if (array !== null) {
      return array.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf())[0];
    }
  }

  order(phases: [{
    Title: string;
    Duration: number;
    GroupID: number;
  }]) {
    return phases.sort((a, b) => {
      return a.GroupID - b.GroupID;
    });
  }



  // view functions
  viewLastTestDate() {
    try {
      const lastDate = new Date(this.getLastSolutionElement(this.selectedProcess.Solution).Timestamp);

      const date = lastDate.getDay() + '/' + (lastDate.getMonth() + 1) + '/' + lastDate.getFullYear();

      return date;
    } catch (error) {
      return ' - ';
    }
  }

  viewLastCvDate() {
    try {
      const lastDate = new Date(this.getLastCvElement(this.selectedProcess.CvMeasures).Timestamp);

      const date = lastDate.getDay() + '/' + (lastDate.getMonth() + 1) + '/' + lastDate.getFullYear();

      return date;
    } catch (error) {
      return ' - ';
    }
  }

  viewLastTestTime() {
    try {
      const x = new Date(this.getLastSolutionElement(this.selectedProcess.Solution).Timestamp);

      const date = {
        h:  x.getUTCHours(),
        m:  x.getUTCMinutes() > 10 ? x.getUTCMinutes() : '0' + x.getUTCMinutes(),
        s:  x.getUTCSeconds() > 10 ? x.getUTCSeconds() : '0' + x.getUTCSeconds()
      };

      return `${date.h}:${date.m}:${date.s}`;
    } catch (error) {
      return ' - ';
    }
  }

  viewLastCvTime() {
    try {
      const x = new Date(this.getLastCvElement(this.selectedProcess.CvMeasures).Timestamp);

      const date = {
        h:  x.getUTCHours(),
        m:  x.getUTCMinutes() > 10 ? x.getUTCMinutes() : '0' + x.getUTCMinutes(),
        s:  x.getUTCSeconds() > 10 ? x.getUTCSeconds() : '0' + x.getUTCSeconds()
      };

      return `${date.h}:${date.m}:${date.s}`;
    } catch (error) {
      return ' - ';
    }
  }


  viewNextRefillDate() {
    try {
      if (this.selectedProcess.NextRefill !== null) {
        const x = new Date(this.selectedProcess.NextRefill);

        const date = `${x.getDate() < 10 ? '0' + x.getDate() : x.getDate()}/${x.getMonth() + 1}/${x.getFullYear()}`;

        return date;
      } else {
        return ' - ';
      }

    } catch (error) {
      return ' - ';
    }
  }


  viewNextRefillTime() {
    try {
      if (this.selectedProcess.NextRefill !== null) {
        const x = new Date(this.selectedProcess.NextRefill);

        const date = {
          h:  x.getUTCHours(),
          m:  x.getUTCMinutes() > 10 ? x.getUTCMinutes() : '0' + x.getUTCMinutes(),
          s:  x.getUTCSeconds() > 10 ? x.getUTCSeconds() : '0' + x.getUTCSeconds()
        };

        return `${date.h}:${date.m}:${date.s}`;
      } else {
        return ' - ';
      }

    } catch (error) {
      return ' - ';
    }
  }

  viewLastWeight() {
    try {
      const expWeigt = this.selectedProcess.ExpectedFinalWeight;
      const cvProgress = this.getLastCvElement(this.selectedProcess.CvMeasures).Percentage;
      return expWeigt * cvProgress / 100;
    } catch (error) {
      return ' - ';
    }
  }

  viewNextRefill() {
    try {
      const ref = this.selectedProcess.NextRefill;
      if (ref === null) {
        return ' - ';
      }
      return ref;

    } catch (error) {
      return ' - ';
    }
  }

  viewTemp() {
    try {
      return this.selectedProcess.Temperature.toFixed(1);
    } catch (error) {
      return ' - ';
    }
  }

  viewHum() {
    try {
      return this.selectedProcess.Humidity.toFixed(1);
    } catch (error) {
      return ' - ';
    }
  }

  viewLastPh() {
    try {
      return this.getLastSolutionElement(this.selectedProcess.Solution).Ph.toFixed(1);
    } catch (error) {
      return ' - ';
    }
  }

  viewLastEc() {
    try {
      return this.getLastSolutionElement(this.selectedProcess.Solution).Ec.toFixed(1);
    } catch (error) {
      return ' - ';
    }
  }


  viewPhaseRelativeWidth(phase, process: IInfoProcess) {
    let duration = 0;
    let res;

    process.Phases.forEach(ph => {
      duration += ph.Duration;
    });

    process.Phases.forEach(ph => {
      if (ph === phase) {
        res = (ph.Duration / duration);
      }
    });

    // console.log(process.OrderID + ' -> ph. ' + phase.GroupID + ' --> ' + res);
    return res;


  }


  viewPhaseProgress(phase, process: IInfoProcess) {
    let duration = 0;

    const ranges = [];
    for (const x of process.Phases) {

      ranges.push(
        {
          GroupID: x.GroupID,
          floor: duration,
          ceil: duration + x.Duration
        }
      );


      duration += x.Duration;
    }

    const progress = (this.now.getTime() - new Date(process.StartTime).getTime()) / (1000 * 60 * 60 * 24);

    let res;

    ranges.forEach(range => {
      if (range.GroupID === phase.GroupID) {

        if (progress < range.floor) { res = 0; }

        if (progress >= range.floor && progress < range.ceil) { res = ((progress - range.floor) / (range.ceil - range.floor)); }

        if (progress >= range.ceil) { res = 1; }

      }
    });

    // console.log('process ' + process.OrderID + ', phase ' + phase.GroupID + ' -> ' + res.toFixed(2));

    return res.toFixed(2);

  }


  getPosition(process: IInfoProcess) {
    const a = (this.fullDrawers).find(x => x.Serial === process.DrawerSerial).Slotname;
    if (a !== undefined) {
      const b = (this.trans).find(x => x.num === a).str;

      return b;
    } else {
      return ' - ';
    }
  }

  getPositionID(process: IInfoProcess) {
    return (this.fullDrawers).find(x => x.Serial === process.DrawerSerial).Slotname;
  }

  getHome(home) {
    const b = (this.trans).find(x => x.num === home);

    return b.str;
  }

  resetData() {
    setTimeout(_ => {
      this.updateProcessInfoList();
    }, 5000);
  }

  updateNewHome(event) {
    this.newHome = event.target.value;
  }

  setNewHome() {
    const data = {Home: parseInt(this.newHome, 10)};

    this.busyService.commitSettingState();
    this.onoApiService.putProcessHome(this.selectedProcess.ProcessID, data).subscribe( x => {

      this.newHome = undefined;
      this.updateProcessInfoList();
      this.busyService.inactiveSettingState(x);
    });
  }
  cancNewHome() {
    this.newHome = undefined;
    this.homeForm.setValue(this.selectedProcess.Home);
  }

  filterSlotList(list) {
    return list.filter( x => x.Area.includes('cm'));
  }

  isDisabled(slot) {
    return slot.Slotstatus === 'lock' && slot.Slotname !== this.getPositionID(this.selectedProcess);
  }

  isSelected(slot) {
    return slot.Area === this.getHome(this.selectedProcess.Home) ? true : false;
  }

  viewLastSolData() {
    try {
      const ele = this.getLastSolutionElement(this.selectedProcess.Solution);
      return this.formatFullDate(ele.Timestamp);
    } catch (err) {
      return '-';
    }
  }

  viewLastCvData() {
    try {
      const ele = this.getLastCvElement(this.selectedProcess.CvMeasures);
      return this.formatFullDate(ele.Timestamp);
    } catch (err) {
      return '-';
    }
  }

  isShadowed(id) {
    if (id) {
      const a = (this.slotList).find(x => x.Slotname === parseInt(id, 10));

      if (a.Slotstatus === 'shadowed' || a.Slotstatus === 'couldShadow') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  /////////////////////////////////////
  updateProcessInfoList() {
    this.getProcessData();
  }


  onDelete(element): void {
    const me = this;
    if (confirm('Are you sure to stop the process ' + element.OrderID + ' - ' + element.Description + '?')) {
      me.utilsService.showLoader();
      me.onoApiService
        .abortProcesss(element.ProcessID)
        .subscribe(
          value => {
            // this.utilsService.hideLoader();
            me.updateProcessInfoList();
          }
        );
    }
  }

  deleterefill(element): void {
    const me = this;
    if (confirm('Are you sure to stop the refill for the drawer ' + element.DrawerID + '?')) {
      me.utilsService.showLoader();
      me.onoApiService
        .deleterefill(element.DrawerID)
        .subscribe(
          value => {
            // this.utilsService.hideLoader();
            me.updateProcessInfoList();
          }
        );
    }
    this.refillMenu = false;
  }

  onEdit(element): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '800px',
      height: '450px',
      data: { description: this.description, light: this.light, configuration: this.configuration, drawerserial: this.drawerserial }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      result.drawerserial ? result.drawerserial = result.drawerserial : result.drawerserial = element.DrawerSerial;
      me.onoApiService
        .editProcess(element.ProcessID, result)
        .subscribe(
          value => {
            me.updateProcessInfoList();
          }
        );
    });
  }
  refill(element): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Refill, {
      width: '500px',
      data: {
        type: this.type, tank: this.tank, volume: this.volume, ph: this.ph,
        ec: this.ec, hour: this.hour, minute: this.minute, frequency: this.frequency, sched: this.sched
      }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {

      this.refillMenu = false;

      if (!result) { this.busyService.inactiveRefillState(result); return; }
      if (result.type === 'Ebb and flow') {
        for (let i = 0; i < (result.tank).length; i++) {
          result.tank[i] = parseInt(result.tank[i], 10);
        }
        let value;
        if (result.sched !== 'Instanteneous') {
          value = {
            Drawer: element.DrawerSerial,
            Tub: result.tank,
            Volume: parseFloat(result.volume),
            Ph: parseFloat(result.ph),
            Ec: parseFloat(result.ec),
            Hour: parseInt(result.hour, 10),
            Minute: parseInt(result.minute, 10),
            Frequency: parseInt(result.frequency, 10)
          };
        } else {
          value = {
            Drawer: element.DrawerSerial,
            Tub: result.tank,
            Volume: parseFloat(result.volume),
            Ph: parseFloat(result.ph),
            Ec: parseFloat(result.ec),
            Hour: -1,
            Minute: -1,
            Frequency: -1
          };
        }
        this.busyService.commitRefillState(value);
        me.onoApiService
          .ebbAndFlow(value)
          // .fakeRefill(value)
          .subscribe(res => {
            setTimeout(_ => {
              this.busyService.inactiveRefillState(res);
              me.updateProcessInfoList();
            }, 3000);
          });
      } else if (result.type === 'Flood with water recycle') {
        for (let i = 0; i < (result.tank).length; i++) {
          result.tank[i] = parseInt(result.tank[i], 10);
        }
        var value;
        if (result.sched != 'Instanteneous') {
          value = {
            Drawer: element.DrawerSerial,
            Tub: result.tank,
            Volume: parseFloat(result.volume),
            Ph: parseFloat(result.ph),
            Ec: parseFloat(result.ec),
            Hour: parseInt(result.hour, 10),
            Minute: parseInt(result.minute, 10),
            Frequency: parseInt(result.frequency, 10)
          };
        } else {
          value = {
            Drawer: element.DrawerSerial,
            Tub: result.tank,
            Volume: parseFloat(result.volume),
            Ph: parseFloat(result.ph),
            Ec: parseFloat(result.ec),
            Hour: -1,
            Minute: -1,
            Frequency: -1
          };
        }
        this.busyService.commitRefillState(value);
        me.onoApiService
          .refillMeasure(value)
          // .fakeRefill(value)
          .subscribe(res => {
            setTimeout(_ => {
              this.busyService.inactiveRefillState(res);
              me.updateProcessInfoList();
            }, 3000);
          });
      } else if (result.type === 'Flood without water recycle') {
        for (let i = 0; i < (result.tank).length; i++) {
          result.tank[i] = parseInt(result.tank[i], 10);
        }
        var value;
        if (result.sched != 'Instanteneous') {
          value = {
            Drawer: element.DrawerSerial,
            Tub: result.tank,
            Volume: parseFloat(result.volume),
            Ph: parseFloat(result.ph),
            Ec: parseFloat(result.ec),
            Hour: parseInt(result.hour, 10),
            Minute: parseInt(result.minute, 10),
            Frequency: parseInt(result.frequency, 10)
          };
        } else {
          value = {
            Drawer: element.DrawerSerial,
            Tub: result.tank,
            Volume: parseFloat(result.volume),
            Ph: parseFloat(result.ph),
            Ec: parseFloat(result.ec),
            Hour: -1,
            Minute: -1,
            Frequency: -1
          };
        }
        this.busyService.commitRefillState(value);
        me.onoApiService
          .totalRefill(value)
          // .fakeRefill(value)
          .subscribe(res => {
            setTimeout(_ => {
              this.busyService.inactiveRefillState(res);
              me.updateProcessInfoList();
            }, 3000);
          });
      } else if (result.type === 'Spray') {
        var value;
        if (result.sched != 'Instanteneous') {
          value = {
            Drawer: element.DrawerSerial,
            Speed: 0.03,
            Solution: result.solution,
            Hour: parseInt(result.hour, 10),
            Minute: parseInt(result.minute, 10),
            Frequency: parseInt(result.frequency, 10)
          };
        } else {
          value = {
            Drawer: element.DrawerSerial,
            Speed: 0.03,
            Solution: result.solution,
            Hour: -1,
            Minute: -1,
            Frequency: -1
          };
        }
        this.busyService.commitRefillState(value);
        me.onoApiService
          .sprayroutine(value)
          // .fakeRefill(value)
          .subscribe(res => {
            setTimeout(_ => {
              this.busyService.inactiveRefillState(res);
              me.updateProcessInfoList();
            }, 3000);
          });
      }
    });
  }
  onClose(element): void {
    const me = this;
    if (confirm('Are you sure to close the process ' + element.OrderID + '?')) {
      me.utilsService.showLoader();
      me.onoApiService
        .closeProcess(element.ProcessID)
        .subscribe(
          _ => {
            // this.utilsService.hideLoader();
            me.utilsService.hideLoader();
            me.updateProcessInfoList();
          }
        );
    }
  }
  onAdd(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '800px',
      height: '700px',
      data: {
        OrderID: this.OrderID,
        DrawerSerial: this.DrawerSerial,
        Light: this.Light,
        Configuration: this.Configuration,
        Description: this.Description,
        Duration: this.Duration,
        FinalWeight: this.FinalWeight
      }
    });
    const me = this;
    // dialogRef.afterClosed().subscribe(result => {
    //   this.onoApiService
    //     .addProcess(result)
    //     .subscribe(
    //       value => {
    //         me.updateProcessInfoList();
    //       }
    //     );
    // });
    dialogRef.afterClosed().subscribe(result => {
      this.onoApiService
        .addProcessNew(result)
        .subscribe(
          value => {
            me.updateProcessInfoList();
          }
        );
    });
  }

  onReset(): void {
    this.utilsService.showLoader();
    this.onoApiService
      .resetParams()
      .subscribe(
        value => {
          // this.utilsService.hideLoader();
          this.updateProcessInfoList();
        }
      );
  }


  onZero(): void {

    this.onoApiService.height({ height: 0, acceleration: 1, speed: 0.05, deceleration: 1 });
  }

  onMeasure(): void {
    this.onoApiService.cv();
  }


  onNote(element): void {
    const dialogRef = this.dialog.open(Note2, {
      width: '800px',
      height: '700px',
      data: {
        heights: this.heights,
        solution: this.solution,
        lights: this.lights,
        ec: this.ec,
        ph: this.ph,
        note: this.note,
        process: element.ProcessID
      }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      me.onoApiService.processNote(result);
    });
  }
  onSwap(element): void {

    this.busyService.toggleDrawerState();

    const dialogRef = this.dialog.open(Swap2, {
      width: '500px',
      data: { to: this.to }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { this.busyService.toggleDrawerState(); return; } // doesn't continue the code if result is null/undefined

      result.From = parseInt(element.DrawerSerial, 10);

      if (result.to === 'Pit-stop') { result.To = 101; } else if (result.to === 'Spray') { result.To = 200; } else if (result.to === 'External Bay') { result.To = 0; } else if (result.to === 'Window1') { result.To = 5; } else if (result.to === 'Window2') { result.To = 7; } else if (result.to === 'Window3') { result.To = 9; } else if (result.to === 'Window4') { result.To = 11; } else if (result.to === 'Window6') { result.To = 15; } else if (result.to === 'Window7') { result.To = 17; } else if (result.to === 'Window8') { result.To = 20; } else if (result.to === 'Full11-20cm') { result.To = 104; } else if (result.to === 'Full11-10cm') { result.To = 105; } else if (result.to === 'Full11-0cm') { result.To = 106; } else if (result.to === 'Shadow3') { result.To = 108; } else if (result.to === 'Shadow4') { result.To = 126; } else if (result.to === 'Shadow5') { result.To = 20; } else if (result.to === 'Full7-0cm') { result.To = 36; } else if (result.to === 'Full7-10cm') { result.To = 35; } else if (result.to === 'Full7-20cm') { result.To = 34; } else if (result.to === 'Red&Blue6-0cm') { result.To = 122; } else if (result.to === 'Red&Blue6-10cm') { result.To = 121; } else if (result.to === 'Red&Blue6-20cm') { result.To = 120; } else if (result.to === 'Red&Blue6-30cm') { result.To = 119; } else if (result.to === 'White9-0cm') { result.To = 33; } else if (result.to === 'White9-10cm') { result.To = 32; } else if (result.to === 'White9-20cm') { result.To = 31; } else if (result.to === 'White9-30cm') { result.To = 30; } else if (result.to === 'Purple5-0cm') { result.To = 113; } else if (result.to === 'Purple5-10cm') { result.To = 112; } else if (result.to === 'Purple5-20cm') { result.To = 111; } else if (result.to === 'Purple5-30cm') { result.To = 110; } else if (result.to === 'Full1-0cm') { result.To = 116; } else if (result.to === 'Full1-10cm') { result.To = 115; } else if (result.to === 'Full1-20cm') { result.To = 114; } else if (result.to === 'Red&Blue3-0cm') { result.To = 29; } else if (result.to === 'Red&Blue3-10cm') { result.To = 28; } else if (result.to === 'Red&Blue3-20cm') { result.To = 27; } else if (result.to === 'Red&Blue3-30cm') { result.To = 26; } else if (result.to === 'Red&Blue4-0cm') { result.To = 4; } else if (result.to === 'Red&Blue4-10cm') { result.To = 3; } else if (result.to === 'Red&Blue4-20cm') { result.To = 2; } else if (result.to === 'Red&Blue4-30cm') { result.To = 1; } else if (result.to === 'Red&Blue2-0cm') { result.To = 40; } else if (result.to === 'Red&Blue2-10cm') { result.To = 39; } else if (result.to === 'Red&Blue2-20cm') { result.To = 38; } else if (result.to === 'Red&Blue2-30cm') { result.To = 37; } else if (result.to === 'Purple8-0cm') { result.To = 102; } else if (result.to === 'Purple10-0cm') { result.To = 130; } else if (result.to === 'Purple10-10cm') { result.To = 129; } else if (result.to === 'Purple10-20cm') { result.To = 128; } else if (result.to === 'Purple10-30cm') { result.To = 127; } else { result.To = parseInt(result.to, 10); }

      if (result.To === 0) {
        if (confirm('Hai controllato i pistoni del modulo di refill?')) {
          this.busyService.commitDrawerState(result);
          this.onoApiService.toExternal(result.From)
            .subscribe(
              value => {
                setTimeout(_ => {
                  this.busyService.inactiveDrawerState(value);
                  me.updateProcessInfoList();
                }, 2000);

              }
            );
        } else {
          this.busyService.toggleDrawerState();
        }
      } else {

        this.onoApiService
          .slotGet(result.To)
          .subscribe(
            value => {
              if (value.Slotstatus === 'shadowed') {
                if (confirm('The slots is shadowed from another drawer; are you sure you want to move it?')) {
                  this.busyService.commitDrawerState(result);
                  this.onoApiService
                    .newTests(result)
                    .subscribe(
                      val => {
                        setTimeout(_ => {
                          this.busyService.inactiveDrawerState(val);
                          me.updateProcessInfoList();
                        }, 2000);

                      }
                    );
                }
              } else if (value.Slotstatus === 'couldShadow') {
                if (confirm('The drawer will shadow another drawer put under the light; are you sure you want to move it?')) {
                  this.busyService.commitDrawerState(result);
                  this.onoApiService
                    .newTests(result)
                    .subscribe(
                      val => {
                        setTimeout(() => {
                          this.busyService.inactiveDrawerState(val);
                          me.updateProcessInfoList();
                        }, 2000);
                      }
                    );
                } else {
                  this.busyService.toggleDrawerState();
                }
              } else {
                if (confirm('Hai controllato i pistoni del modulo di refill?')) {
                  this.busyService.commitDrawerState(result);
                  this.onoApiService
                    .newTests(result)
                    .subscribe(
                      val => {
                        setTimeout(() => {
                          this.busyService.inactiveDrawerState(val);
                          me.updateProcessInfoList();
                        }, 2000);
                      }
                    );
                } else {
                  this.busyService.toggleDrawerState();
                }
              }
            });
      }
    });
  }

  home(element): void {

    this.busyService.toggleDrawerState();
    const result = {};
    const me = this;
    result['From'] = parseInt(element.DrawerSerial, 10);
    result['To'] = parseInt(element.Home, 10);
    this.onoApiService
      .slotGet(result['To'])
      .subscribe(
        value => {
          if (value.Slotstatus === 'shadowed') {
            if (confirm('The slots is shadowed from another drawer; are you sure you want to move it?')) {
              this.busyService.commitDrawerState(result);
              this.onoApiService
                .newTests(result)
                .subscribe(
                  val => {
                    this.busyService.inactiveDrawerState(val);
                    setTimeout(() => {
                      me.updateProcessInfoList();
                    }, 2000);

                  }
                );
            } else {
              this.busyService.toggleDrawerState();
            }
          } else if (value.Slotstatus === 'couldShadow') {
            if (confirm('The drawer will shadow another drawer put under the light; are you sure you want to move it?')) {
              this.busyService.commitDrawerState(result);
              this.onoApiService
                .newTests(result)
                .subscribe(
                  val => {
                    this.busyService.inactiveDrawerState(val);
                    setTimeout(() => {
                      me.updateProcessInfoList();
                    }, 2000);
                  }
                );
            } else {
              this.busyService.toggleDrawerState();
            }
          } else {
            if (confirm('Hai controllato i pistoni del modulo di refill?')) {
              this.busyService.commitDrawerState(result);
              this.onoApiService
                .newTests(result)
                .subscribe(
                  val => {
                    setTimeout(() => {
                      this.busyService.inactiveDrawerState(val);
                      me.updateProcessInfoList();
                    }, 2000);
                  }
                );
            } else {
              this.busyService.toggleDrawerState();
            }
          }
        });

  }
  toExternal(element): void {
    const result = {};
    const me = this;
    result['From'] = parseInt(element.DrawerSerial, 10);
    result['To'] = 0;
    this.busyService.toggleDrawerState();
    if (confirm('Hai controllato i pistoni del modulo di refill?')) {
      this.busyService.commitDrawerState(result);
      this.onoApiService.toExternal(result['From'])
        .subscribe(
          value => {
            setTimeout(_ => {
              this.busyService.inactiveDrawerState(value);
              me.updateProcessInfoList();
            }, 2000);

          }
        );
    } else {
      this.busyService.toggleDrawerState();
    }
  }

  window(element): void {

    this.busyService.toggleDrawerState();
    const result = {};
    const me = this;
    result['From'] = parseInt(element.DrawerSerial, 10);
    result['To'] = 5;
    this.onoApiService
      .slotGet(result['To'])
      .subscribe(
        value => {
          if (value.Slotstatus === 'shadowed') {
            if (confirm('The slots is shadowed from another drawer; are you sure you want to move it?')) {
              console.log(result)
              this.busyService.commitDrawerState(result);
              this.onoApiService
                .newTests(result)
                .subscribe(
                  val => {
                    this.busyService.inactiveDrawerState(val);
                    setTimeout(() => {
                      me.updateProcessInfoList();
                    }, 2000);

                  }
                );
            } else {
              this.busyService.toggleDrawerState();
            }
          } else if (value.Slotstatus === 'couldShadow') {
            if (confirm('The drawer will shadow another drawer put under the light; are you sure you want to move it?')) {
              this.busyService.commitDrawerState(result);
              this.onoApiService
                .newTests(result)
                .subscribe(
                  val => {
                    this.busyService.inactiveDrawerState(val);
                    setTimeout(() => {
                      me.updateProcessInfoList();
                    }, 2000);
                  }
                );
            } else {
              this.busyService.toggleDrawerState();
            }
          } else {
            if (confirm('Hai controllato i pistoni del modulo di refill?')) {
              this.busyService.commitDrawerState(result);
              this.onoApiService
                .newTests(result)
                .subscribe(
                  val => {
                    setTimeout(() => {
                      this.busyService.inactiveDrawerState(val);
                      me.updateProcessInfoList();
                    }, 2000);
                  }
                );
            } else {
              this.busyService.toggleDrawerState();
            }
          }
        });

  }

  return() {
    this.router.navigate(['status']);
  }

  // beneath the function to disable the buttons while waiting for server action-api response

  drawerState() {
    const me = this.busyService.state;
    if (me.drawer.active === true || me.refill.active === true) { return true; } else { return false; }
  }

}


@Component({
  selector: 'lamp-schedule',
  templateUrl: 'lamp-schedule.html',
})
export class Note2 implements OnInit {
  addresses = [];
  constructor(
    public dialogRef: MatDialogRef<Note2>,
    public OnoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    const me = this;
    // this.OnoApiService.getLampsAddress().then(function (res) {
    //   res = res._body
    //   var array = res.split(',');
    //   array.pop()
    //   me.addresses = array
    // })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'swap',
  templateUrl: 'swap.html',
})
export class Swap2 {

  slots = ['External Bay', 'Spray', 'Pit-stop', 'Window1', 'Window2', 'Window3', 'Window4', 'Window6', 'Window7', 'Window8', 'Shadow3', 'Shadow4', 'Shadow5', 'Full1-0cm', 'Full1-10cm', 'Full1-20cm',
    'Red&Blue2-10cm', 'Red&Blue2-20cm', 'Red&Blue2-30cm', 'Red&Blue3-0cm', 'Red&Blue3-10cm', 'Red&Blue3-20cm', 'Red&Blue3-30cm',
    'Red&Blue4-0cm', 'Red&Blue4-10cm', 'Red&Blue4-20cm', 'Red&Blue4-30cm', 'Purple5-0cm', 'Purple5-10cm', 'Purple5-20cm', 'Purple5-30cm',
    'Red&Blue6-0cm', 'Red&Blue6-10cm', 'Red&Blue6-20cm', 'Red&Blue6-30cm', 'Full7-0cm', 'Full7-10cm', 'Full7-20cm', 'Purple8-0cm',
    'White9-0cm', 'White9-10cm', 'White9-20cm', 'White9-30cm', 'Purple10-0cm', 'Purple10-10cm', 'Purple10-20cm', 'Full11-0cm', 'Full11-10cm', 'Full11-20cm', 'Full11-30cm'];

  constructor(
    public dialogRef: MatDialogRef<Swap2>,
    public onoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'edit-process',
  templateUrl: 'edit-process.html',
})
export class Edit implements OnInit {
  addresses = [];
  constructor(
    public dialogRef: MatDialogRef<Edit>,
    public onoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    const me = this;
    // this.OnoApiService.getLampsAddress().then(function (res) {
    //   res = res._body
    //   var array = res.split(',');
    //   array.pop()
    //   me.addresses = array
    // })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'new-process',
  templateUrl: 'new-process.html',
})
export class Add implements OnInit {
  addresses = [];
  constructor(
    public dialogRef: MatDialogRef<Add>,
    public onoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    const me = this;
    // this.OnoApiService.getLampsAddress().then(function (res) {
    //   res = res._body
    //   var array = res.split(',');
    //   array.pop()
    //   me.addresses = array
    // })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'refill',
  templateUrl: 'refill.html',
})
export class Refill implements OnInit {
  tanks = [1, 2, 3];
  types = ['Ebb and flow', 'Flood with water recycle', 'Flood without water recycle', 'Spray'];
  scheds = ['Instanteneous', 'Periodical'];
  sols = ['Water', 'OzonatedWater', 'Solution'];
  constructor(
    public dialogRef: MatDialogRef<Add>,
    public onoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    const me = this;
    // this.OnoApiService.getLampsAddress().then(function (res) {
    //   res = res._body
    //   var array = res.split(',');
    //   array.pop()
    //   me.addresses = array
    // })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
