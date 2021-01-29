import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ISeed } from 'src/app/model/registries/seeds-info';
import { SpeciesInfo } from 'src/app/model/registries/species-info';
import { OnoApiService } from 'src/app/service/ono-api.service';

@Component({
  selector: 'app-seed-form2',
  templateUrl: './seed-form2.component.html',
  styleUrls: ['./seed-form2.component.scss']
})
export class SeedForm2Component implements OnInit {


  constructor(
    private api: OnoApiService,
    private dialogRef: MatDialogRef<SeedForm2Component>,
    @Inject(MAT_DIALOG_DATA) public importData,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.data = importData.seed;
  }

  data: ISeed;
  seedForm;

  seedList: ISeed[] = [];
  specieList: SpeciesInfo[] = [];

  ngOnInit() {
    console.log(this.importData);
    console.log(this.data);

    this.getData();

    this.seedForm = this.fb.group({
      SeedType:     [this.getFormFieldValue('SeedType'), [Validators.required]],
      Specie:       [this.getFormFieldValue('Specie'), [Validators.maxLength(14), Validators.required]],
      Contingency:  [this.getFormFieldValue('Contingency'), [Validators.min(0), Validators.required]],
      Vendor:       [this.getFormFieldValue('Vendor'), [Validators.maxLength(14), Validators.required]],
      Description:  [this.getFormFieldValue('Description')],
      Note:         [this.getFormFieldValue('Note')],
      Tag:          [this.getFormFieldValue('Tag')],
      Cost: this.fb.group({
        GerminatedPercentage :  [
          this.getFormFieldValue('Cost', 'GerminatedPercentage'),
          [Validators.min(0), Validators.max(100), Validators.required]
        ],
        SeedCost :              [this.getFormFieldValue('Cost', 'SeedCost'), [Validators.min(0), Validators.required]],
      }),
      Quality: this.fb.group({
        Taste:        [this.getFormFieldValue('Quality', 'Taste'), [Validators.min(0), Validators.max(10), Validators.required]],
        Color:        [this.getFormFieldValue('Quality', 'Color'), [Validators.min(0), Validators.max(10), Validators.required]],
        Fragrance:    [this.getFormFieldValue('Quality', 'Fragrance'), [Validators.min(0), Validators.max(10), Validators.required]],
        Crunchiness:  [this.getFormFieldValue('Quality', 'Crunchiness'), [Validators.min(0), Validators.max(10), Validators.required]],
        Aesthetics:   [this.getFormFieldValue('Quality', 'Aesthetics'), [Validators.min(0), Validators.max(10), Validators.required]],
        Mortality:    [this.getFormFieldValue('Quality', 'Mortality'), [Validators.min(0), Validators.max(10), Validators.required]],
        GrowthLevel:  [this.getFormFieldValue('Quality', 'GrowthLevel'), [Validators.min(0), Validators.max(10), Validators.required]],
      }),
      NutritionalFact: this.fb.group({
        Protein :     [this.getFormFieldValue('NutritionalFact', 'Protein'), [Validators.min(0), Validators.required]],
        Fat :         [this.getFormFieldValue('NutritionalFact', 'Fat'), [Validators.min(0), Validators.required]],
        Carbohydrate: [this.getFormFieldValue('NutritionalFact', 'Carbohydrate'), [Validators.min(0), Validators.required]],
        Calories:     [this.getFormFieldValue('NutritionalFact', 'Calories'), [Validators.min(0), Validators.required]],
      }),
    });
  }

  getFormFieldValue(cat, field?) {
    let res;
    if (this.data) {
      const ginkgo = this.data[cat];
      
      if (field) {
        res = ginkgo[field];
      } else {
        res = ginkgo;
      }
    } else {
      res = undefined;
    }

    console.log(cat + '.' + field + ' = ', res);
    return res;
  }

  getData() {
    this.api.getSeeds().subscribe(x => {
      this.seedList = x;
    });

    this.api.getSpecies().subscribe(x => {
      this.specieList = x;
    });
  }

  filterSeedList() {

    const sp = this.seedForm.value.Specie;

    return this.seedList.filter(x => x.Specie === sp);
  }

  submit() {
    const newSeed = this.seedForm.value;

    if (this.importData.type === 'post') {
      this.api.postSeed(newSeed).subscribe(x => {
        console.log(x);
        this.snack.open(x.Response, '');
      });
    } else if (this.importData.type === 'put') {
      this.api.putSeed(newSeed.SeedType, newSeed).subscribe(x => {
        console.log(x);
        this.snack.open(x.Response, '');
      });
    }
  }

  check() {
    console.log(this.seedForm);
  }

  close() {
    this.dialogRef.close();
  }

}
