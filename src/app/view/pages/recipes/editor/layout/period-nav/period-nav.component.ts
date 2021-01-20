import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnInit,
  destroyPlatform,
} from '@angular/core';
import {
  DataService
} from '../../services/data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {
  IGroup
} from '../../model/dataFormat';
import { FormulaComponent } from '../../components/formula/formula.component';
import { ImportModalComponent } from '../../modals/import-modal/import-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupSettingsModalComponent } from '../../modals/group-settings-modal/group-settings-modal.component';
import { DelModalComponent } from '../../modals/del-modal/del-modal.component';
import { ConfirmSendDialogModalComponent } from '../../modals/confirm-send-dialog-modal/confirm-send-dialog-modal.component';
import { HttpClient } from '@angular/common/http';
import { OnoApiService } from 'src/app/service/ono-api.service';


@Component({
  selector: 'app-period-nav',
  templateUrl: './period-nav.component.html',
  styleUrls: ['./period-nav.component.scss']
})

export class PeriodNavComponent implements AfterViewInit, OnInit {

  @ViewChildren(FormulaComponent) formulas: QueryList < FormulaComponent > ;

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    public http: HttpClient,
    private ono: OnoApiService,
  ) {
  }

  selected = [];

  search;

  contextmenu;

  head = false;

  message: string;

  openTab;

  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  divStyle;
  vis = 'hidden';
  inDownload = false;

  ngOnInit() {

    /*
    CHECHING IF DATA HAS BEEN PASSED FROM SELECTED RECIPE
    */
    console.clear();

    // console.log('STATE => ', history.state);

    if (history.state.data === undefined) {

      if (history.state.seed) {
        this.dataService.finalJson.SeedType = history.state.seed;
      } else {

        // Generate a new group and push it in the groups container in dataservice on page Loaded
        if (this.dataService.groups.length === 0) {
          this.dataService.groups.push({
            gid: 0,
            title: 'Gruppo 0',
            exp: 1,
            stage: 'sprout',
            totalPeriod: 0,
            extended: true,
            items: []
          });
        }
      }

    } else {
      this.clear();
      this.dataService.sentRecipe(history.state.data.data);
    }

    this.search = '';

    this.openTab = 0;

  }

  updateSearch(x) {
    this.search = x;
  }

  // ______________________________

  ngAfterViewInit(): void {
    // after the page is loaded, it keep check for the valid recipes every 100ms
    setInterval(() => {
      this.dataService.getFinalRecipe();

      let full = false;

      for (const x of this.dataService.groups) {
        if (!x.items.length || x.items.length === 0) {
          full = true;
        }
      }

      if (full === false) {
        this.addGroup();
      }

    }, 100);
  }

  disableContextMenu() {
    // disable right click capabilities in the workarea
    this.contextmenu = false;
  }

  delAll() {
    const settings = {
      name: 'all the groups and their relative periods'
    };
    const dialogRef = this.dialog.open(DelModalComponent, {width: '400px'});
    dialogRef.componentInstance.settings = settings;
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        // It will remove every elements in the state array: light, climate, generic, solution and recipe.
        // It will also remove all the groups and place a new empty group 'group 0' with default settings
        this.dataService.light = [];
        this.dataService.climate = [];
        this.dataService.generic = [];
        this.dataService.solution = [];
        this.dataService.recipe = [];

        this.dataService.groups = [{
          gid: 0,
          title: 'group 0',
          extended: true,
          stage: 'sprout',
          exp: 1,
          totalPeriod: 0,
          items: []
        }];
      }
      this.dataService.checkRecipe();
    });

  }

  clear() {
    this.dataService.light = [];
    this.dataService.climate = [];
    this.dataService.generic = [];
    this.dataService.solution = [];
    this.dataService.recipe = [];

    this.dataService.groups = [];

    this.dataService.checkRecipe();
  }

  receiveMessage($event) {
    this.message = $event;
  }


  checkDel() {
    // used in developing for have a quick check on all the variables in dataservice on console
    console.clear();
    console.log('light: ', this.dataService.light);
    console.log('climate: ', this.dataService.climate);
    console.log('solution: ', this.dataService.solution);
    console.log('generic: ', this.dataService.generic);
    console.log('recipe: ', this.dataService.recipe);
    console.log('groups: ', this.dataService.groups);
    console.log('saved: ', this.dataService.savedPeriods);
    console.log('presets: ', this.dataService.presets);
  }

  // ###############################################

  dropItem(event: CdkDragDrop < string[] > ) {
    // Check the provenience of a draggable object that has been dropped into workarea
    // If it came from itself it means that the user is moving the periods inside, so i will switch them with moveItemInArray
    // If it came from one other group i will move it in the new group
    // If it came from 'pres' (presets cdk list) i will call addFromPresets() to add the preset element in the workarea
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'pres') {

      // duplicate the selected item of presets with json.parse-stringify
      const presPer = JSON.parse(JSON.stringify(this.dataService.presets[event.previousIndex]));

      // sending the new presPer in addFromPresets
      this.dataService.addFromPresets(presPer, event.container.id, event.currentIndex);

    } else if (event.previousContainer.id === 'saved') {

      const savePer = JSON.parse(JSON.stringify(this.dataService.savedPeriods[event.previousIndex]));

      this.dataService.addFromPresets( savePer, event.container.id, event.currentIndex);
    } else if (event.previousContainer.id === 'recipeEditor') {
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropInPreview(event) {
  }

  getConnectedList(): any[] {
    const res = this.dataService.groups.map(x => `${x.gid}`);
    res.push('pres');
    return res;
  }

  dropGroup(event: CdkDragDrop < string[] > ) {
    // used when movin entire group to change their position or adding a new one
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dataService.groups, event.previousIndex, event.currentIndex);
    } else {
      this.addGroup();
    }

  }

  addGroup() {
    // It will add a new group where it has been dropped (the moveItemInArray down below), checking for the lowest avaiable id
    let maxId = 0;
    for (const ele of this.dataService.groups) {
      if (ele.gid > maxId) {
        maxId = ele.gid;
      }
    }
    maxId++;
    this.dataService.groups.push({
      gid: maxId,
      title: 'Group ' + maxId,
      exp: 1,
      stage: 'sprout',
      totalPeriod: 0,
      extended: true,
      items: [],

    });
    // **
    // this function was used when the groups was generated by dropping the empty group and now
    // it is no longer used but i wanna keep it here. U never know :)
    // btw if u are reading this i wanna say: "i love you for the hard work you are doing <3 -Ginkgo97"
    // moveItemInArray(this.dataService.groups, this.dataService.groups.length - 1, event.currentIndex);
  }

  addId() {
    const firstIndex = this.dataService.groups[0].gid;
    this.dataService.addFromPresets({pid: -2, name: 'empty', type: 2, note: ''}, firstIndex, 0);
  }

  openGroupSettings(group: IGroup) {
    // It will open the GroupSettingsModalComponent and then chek for the changes afterClosed
    const dialogRef = this.dialog.open(GroupSettingsModalComponent,  {panelClass: 'custom-Group-settings-dialog-component'});
    dialogRef.componentInstance.group = group;
    dialogRef.afterClosed().subscribe(res => {

      if (res === true) {
        group.items.forEach(item => {
          this.dataService.light = this.dataService.light.filter(x => x.pid !== item.pid);
          this.dataService.climate = this.dataService.climate.filter(x => x.pid !== item.pid);
          this.dataService.generic = this.dataService.generic.filter(x => x.pid !== item.pid);
          this.dataService.solution = this.dataService.solution.filter(x => x.pid !== item.pid);
          this.dataService.recipe = this.dataService.recipe.filter(x => x.pid !== item.pid);
        });
        const newGroups = this.dataService.groups.filter(x => x.gid !== group.gid);
        this.dataService.groups = newGroups;
      }

      this.dataService.checkRecipe();
    });
  }

  importRecipe() {
    const dialogRef = this.dialog.open(ImportModalComponent, {width: '400px'});
    dialogRef.afterClosed().subscribe( res => {
      this.dataService.uploadRecipe(res);
    });
  }

  toggleGroup(event, group) {
    // It will be used to save the toggle state of each group when pressing the +/- icon on the square brackets
    for (const i in this.dataService.groups) {
      if (this.dataService.groups[i].gid === group.gid) {
        this.dataService.groups[i].extended = !this.dataService.groups[i].extended;
        return;
      }
    }
  }

  setExp(event, g) {
    // THis function is called every time the exp value is changed
    const groupIndex = this.dataService.groups.indexOf(g);
    this.dataService.groups[groupIndex].exp = parseInt(event.srcElement.value, 10);
  }

  isHead(group) {
    // period should not have the + on his right, this function return 'none' as attribute of ngStyle.display
    if (this.dataService.groups[this.dataService.groups.length - 1] === group) {
      return 'none';
    }
  }

  expIsHead(x, group) {
    // if the plus on the period is missing, exp and total period dutarion are disaligned
    // this function solve it dinamically changing the attribute 'right'

    // but first i load the value that i need to display
    this.checkGroupsTotalPeriod();

    if (this.dataService.groups[this.dataService.groups.length - 1] === group) {
      return x + 'px';
    } else {
      const fin = 17.5 + x;
      return fin + 'px';
    }
  }

  titleClass(group: IGroup) {

    // It will get the title of the group and adda dinamic class if avery period is full, partiallyu-full or empty

    let found;
    if (group.items.length > 0) {
      for (const item of group.items) {
        found = false;
        for (const rec of this.dataService.recipe) {
          if (rec.pid === item.pid) {
            found = true;
          }
        }
        if (found === false) {
          return 'partial';
        }
      }
      return 'full';
    } else {
      return 'empty';
    }
  }

  checkGroupsTotalPeriod() {
    // it will scan every item of every group and get the relative periodduration
    // saving it's value in totalPeriod of each group
    this.dataService.groups.forEach(group => {
      const gIndex = this.dataService.groups.indexOf(group);

      let parDuration = 0;

      group.items.forEach(item => {
        if (item.periodduration) {
          parDuration = parDuration + item.periodduration;
        }
      });

      this.dataService.groups[gIndex].totalPeriod = parDuration;

    });
  }

  // #################################################
  isGroupCompleted(group) {
    // this function return what image should i show in the collapsed group,
    // 'none' if it's empty or contain inclompere periods
    // group.stage.toLowerCase() if it's full

    if (group.items.length === 0) {
      return 'none';
    }

    for (const item of group.items) {
      let inThisRec = false;
      for (const rec of this.dataService.recipe) {
        if (rec.pid === item.pid) {
          inThisRec = true;
        }
      }
      if (inThisRec === false) {
        return 'none';
      }
    }
    return group.stage.toLowerCase();
  }

  droppedHere(event: CdkDragDrop < string[] > ) {
    switch (event.previousContainer.id) {
      case 'pres':
        break;
      case 'recipeEditor':
        {
          // console.log('should be a square');
          if (this.dataService.groups.length > 1) {

            const dialogRef = this.dialog.open(DelModalComponent, {width: '400px'});
            const settings = {name: event.item.data.title};
            // console.log('settings: ', settings);
            dialogRef.componentInstance.settings = settings;
            dialogRef.afterClosed().subscribe(res => {
              if (res === true) {
                event.item.data.items.forEach(item => {
                  this.dataService.light = this.dataService.light.filter(x => x.pid !== item.pid);
                  this.dataService.climate = this.dataService.climate.filter(x => x.pid !== item.pid);
                  this.dataService.generic = this.dataService.generic.filter(x => x.pid !== item.pid);
                  this.dataService.solution = this.dataService.solution.filter(x => x.pid !== item.pid);
                  this.dataService.recipe = this.dataService.recipe.filter(x => x.pid !== item.pid);
                });
                const newGroups = this.dataService.groups.filter(x => x.gid !== event.item.data.gid);
                this.dataService.groups = newGroups;
              }
            });
          } else {
            this.dataService.openSnackBar('You can\'t delete the last group', 'close', 'errorSnackBar');
          }

        }
        break;


      default: {
        const dialogRef = this.dialog.open(DelModalComponent, {width: '400px'});
        const settings = {name: event.item.data.name};
        dialogRef.componentInstance.settings = settings;
        // console.log(event);
        dialogRef.afterClosed().subscribe(res => {
          if (res === true) {
            let groupIndex;
            let itemIndex;

            for (const group of this.dataService.groups) {
              for (const item of group.items) {
                if (item.pid === event.item.data.pid) {
                  groupIndex = this.dataService.groups.indexOf(group);
                  itemIndex = this.dataService.groups[groupIndex].items.indexOf(item);
                  break;
                }
              }
            }

            this.dataService.groups[groupIndex].items.splice(itemIndex, 1);

            this.dataService.light = this.dataService.light.filter(x => x.pid !== event.item.data.id);
            this.dataService.climate = this.dataService.climate.filter(x => x.pid !== event.item.data.id);
            this.dataService.solution = this.dataService.solution.filter(x => x.pid !== event.item.data.id);
            this.dataService.generic = this.dataService.generic.filter(x => x.pid !== event.item.data.id);
            this.dialog.closeAll();
          }
          this.dataService.checkRecipe();
        });

        }      break;
    }
  }

  send() {
    // It will open the GroupSettingsModalComponent and then chek for the changes afterClosed
    const dialogRef = this.dialog.open(ConfirmSendDialogModalComponent, {panelClass: 'custom-confirm-send-dialog-component'});
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {

        this.dataService.finalJson.Periods = [];

        this.dataService.groups.forEach(g => {
          g.items[0] ? this.dataService.finalJson.Periods.push(g) : '';
        });

        const expJSON = JSON.parse(JSON.stringify(this.dataService.finalJson, null, 2));

        this.ono.postRecipe(expJSON).subscribe(x => {
          console.log(x);
        });

      } else {
        // console.log('nothing has been done');
      }
    });
  }

  enableSave() {
    if (this.dataService.recipe.length !== 0) {
      return true;
    }
  }

  enableSend() {
    if (this.enableSave() === true) {
      let res = true;
      for (const g of this.dataService.groups) {
        for (const i of g.items) {
          let found = false;
          for (const r of this.dataService.recipe) {
            if (r.pid === i.pid) {
              found = true;
            }
          }
          if (found !== true) {
            res = false;
          }
        }
      }

      // console.log(res);
      return res;
    }
  }

}
