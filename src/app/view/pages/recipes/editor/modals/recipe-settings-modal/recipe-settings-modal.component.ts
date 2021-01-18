import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-settings-modal',
  templateUrl: './recipe-settings-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class RecipeSettingsModalComponent implements OnInit {

  @Input() public seeds;

  sortedType = [];


  constructor(
    public recipeDialogRef: MatDialogRef<RecipeSettingsModalComponent>,
    public dataService: DataService,
    public dialog: MatDialog
  ) { }

  recipeSettingsForm;

  ngOnInit() {

    if (!this.dataService.finalJson.EstimatedProduction) {
      this.dataService.finalJson.EstimatedProduction = 0;
    }

    for (const s of this.seeds) {
      this.sortedType.push(s.SeedType);
    }
    this.sortedType.sort();

    // console.log(this.seeds);

    this.recipeSettingsForm = new FormGroup({
      Recipename: new FormControl(this.dataService.finalJson.Recipename),
      Version: new FormControl(this.dataService.finalJson.Version, Validators.min(0)),
      Recipetype: new FormControl(this.dataService.finalJson.Recipetype),
      Seedtype: new FormControl(this.dataService.finalJson.SeedType),
      Description: new FormControl(this.dataService.finalJson.Description),
      EstProd: new FormControl(this.dataService.finalJson.EstimatedProduction, Validators.min(1)),
      Note: new FormControl(this.dataService.finalJson.Note),
      Tag: new FormControl(this.dataService.finalJson.Tag),

      // FRactive: new FormControl(this.dataService.finalJson.FirstRefill.Active),
      FRtype: new FormControl(this.dataService.finalJson.FirstRefill.Type),
      FRsolution: new FormControl(this.dataService.finalJson.FirstRefill.Solution),
      // FRquantity: new FormControl('', Validators.min(1)),
    });
  }

  submit() {
    if (this.recipeSettingsForm.value.Recipename !== '') {
      this.dataService.finalJson.Recipename = this.recipeSettingsForm.value.Recipename;
    } else {
      this.dataService.openSnackBar('The name can\'t be empty', 'cancel', 'errorSnackBar');
    }

    this.dataService.finalJson.Version = this.recipeSettingsForm.value.Version;
    this.dataService.finalJson.Recipetype = this.recipeSettingsForm.value.Recipetype;
    this.dataService.finalJson.SeedType = this.recipeSettingsForm.value.Seedtype;
    this.dataService.finalJson.Description = this.recipeSettingsForm.value.Description;
    this.dataService.finalJson.EstimatedProduction = this.recipeSettingsForm.value.EstProd;
    this.dataService.finalJson.Note = this.recipeSettingsForm.value.Note;
    this.dataService.finalJson.Tag = this.recipeSettingsForm.value.Tag;
    // this.dataService.finalJson.FirstRefill.Active = this.recipeSettingsForm.value.FRactive;
    this.dataService.finalJson.FirstRefill.Type = this.recipeSettingsForm.value.FRtype;
    this.dataService.finalJson.FirstRefill.Solution = this.recipeSettingsForm.value.FRsolution;
    // this.dataService.finalJson.FirstRefill.Quantity = this.recipeSettingsForm.value.FRquantity;

    console.log('updated finalJSON: ', this.dataService.finalJson)

    this.recipeDialogRef.close();
  }


  close() {

    this.recipeDialogRef.close(false);
  }

  test() {
    console.log(this.dataService.finalJson.FirstRefill)
  }

  FirstRefillValid(){
    console.clear()
    if(this.recipeSettingsForm.status === 'INVALID') {
      console.log('INVALID');
      return true;

    } else {
      console.log('VALID');
      console.log(this.recipeSettingsForm.value.FRsolution, this.dataService.finalJson.FirstRefill.Quantity, this.recipeSettingsForm.value.FRtype);
      
      if(this.dataService.finalJson.FirstRefill.Active === true) {
        if(this.recipeSettingsForm.value.FRsolution === null || !this.dataService.finalJson.FirstRefill.Quantity || this.recipeSettingsForm.value.FRtype === null) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

}
