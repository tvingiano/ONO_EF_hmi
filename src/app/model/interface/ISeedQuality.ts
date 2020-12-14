import {ISeedQualityHeightCurve} from './ISeedQualityHeightCurve';

export interface ISeedQuality {
    Aesthetics: number;
    Color: number;
    Crunchiness: number;
    Fragrance: number;
    GrowthLevel: number;
    Mortality: number;
    Taste: number;
    HeightCurve: ISeedQualityHeightCurve;
}
