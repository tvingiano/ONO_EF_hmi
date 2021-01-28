import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ISeed } from 'src/app/model/registries/seeds-info';

@Component({
  selector: 'app-seed-form2',
  templateUrl: './seed-form2.component.html',
  styleUrls: ['./seed-form2.component.scss']
})
export class SeedForm2Component implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISeed,
    private fb: FormBuilder,
  ) {
  }

  sections = ['baseInfo', 'NutritionalFact', 'Cost', 'Quality', 'Growth'];

  sf = {
    baseInfo: [
      'SeedType',
      'Specie',
      'Contingency',
      'Vendor',
      'Description',
      'Note',
      'Tag',
    ],
    NutritionalFact: [
      'Protein',
      'Fat',
      'Carbohydrate',
      'Calories',
    ],
    Cost: [
      'GerminatedPercentage',
      'SeedCost',
    ],
    Quality: [
        'Taste',
        'Color',
        'Fragrance',
        'Crunchiness',
        'Aesthetics',
        'Mortality',
        'GrowthLevel',
    ],
    Growth: [
      'HeightCurve',
      'AreaCurve',
      'WeightCurve'
    ]
  };

seedForm = this.fb.group({
    baseInfo: this.fb.group({
      SeedType:     [this.data.SeedType, [Validators.maxLength(14), Validators.required]],
      Specie:       [this.data.Specie, [Validators.maxLength(14), Validators.required]],
      Contingency:  [this.data.Contingency, [Validators.min(0), Validators.required]],
      Vendor:       [this.data.Vendor, [Validators.maxLength(14), Validators.required]],
      Description:  [this.data.Description],
      Note:         [this.data.Note],
      Tag:          [this.data.Tag]
    }),
    NutritionalFact: this.fb.group([{
      Protein :     [this.data.NutritionalFact.Protein, [Validators.min(0), Validators.required]],
      Fat :         [this.data.NutritionalFact.Fat, [Validators.min(0), Validators.required]],
      Carbohydrate: [this.data.NutritionalFact.Carbohydrate, [Validators.min(0), Validators.required]],
      Calories:     [this.data.NutritionalFact.Calories, [Validators.min(0), Validators.required]],
    }]),
    Cost: this.fb.group({
      GerminatedPercentage :  [this.data.Cost.GerminatedPercentage, [Validators.min(0), Validators.max(100), Validators.required]],
      SeedCost :              [this.data.Cost.SeedCost, [Validators.min(0), Validators.required]],
    }),
    Quality: this.fb.group({
      Taste:        [this.data.Quality.Taste, [Validators.min(0), Validators.max(10), Validators.required]],
      Color:        [this.data.Quality.Color, [Validators.min(0), Validators.max(10), Validators.required]],
      Fragrance:    [this.data.Quality.Fragrance, [Validators.min(0), Validators.max(10), Validators.required]],
      Crunchiness:  [this.data.Quality.Crunchiness, [Validators.min(0), Validators.max(10), Validators.required]],
      Aesthetics:   [this.data.Quality.Aesthetics, [Validators.min(0), Validators.max(10), Validators.required]],
      Mortality:    [this.data.Quality.Mortality, [Validators.min(0), Validators.max(10), Validators.required]],
      GrowthLevel:  [this.data.Quality.GrowthLevel, [Validators.min(0), Validators.max(10), Validators.required]],
    }),
    Growth: this.fb.group({
      HeightCurve: this.fb.group({
        Value: this.fb.array(['', Validators.min(0)])
      }),
      AreaCurve: this.fb.group({
        Value: this.fb.array(['', Validators.min(0)])
      }),
      WeightCurve: this.fb.group({
        Value: this.fb.array(['', Validators.min(0)])
      })
    }),
  });

ngOnInit() {
  }

}
