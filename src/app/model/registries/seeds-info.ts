import { BaseInfo } from "../BaseInfo";

export class ISeed extends BaseInfo {
    SeedType: string;
    Specie: string;
    NutritionalFact: ISeedNutritionals;
    Cost: ISeedCost;
    Quality: ISeedQuality;
    Contingency: number;
    Vendor: string;
}

export class ISeedNutritionals {
    Protein: number;
    Fat: number;
    Carbohydrate: number;
    Calories: number;
}

export class ISeedCost {
    GerminatedPercentage: number;
    SeedCost: number;
}

export class ISeedQuality {
    Taste: number;
    Color: number;
    Fragrance: number;
    Crunchiness: number;
    Aesthetics: number;
    Mortality: number;
    GrowthLevel: number;
    HeightCurve: ICurve[];
    AreaCurve: ICurve[];
    WeightCurve: ICurve[];
};

export class ICurve {
    Day: number;
    Value: number;
}

