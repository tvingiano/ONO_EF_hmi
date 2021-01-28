import { BaseInfo } from "../BaseInfo";

export interface ISeed extends BaseInfo {
    SeedType: string;
    Specie: string;
    NutritionalFact: ISeedNutritionals;
    Cost: ISeedCost;
    Quality: ISeedQuality;
    Contingency: number;
    Vendor: string;
}

export interface ISeedNutritionals {
    Protein: number;
    Fat: number;
    Carbohydrate: number;
    Calories: number;
}

export interface ISeedCost {
    QuantityForDrawer: number;
    SingleSeedWeight: number;
    GerminatedPercentage: number;
    WeightForDrawer: number;
    WaterForRefill: number;
    EnergyForLightHour: number;
    SeedCost: number;
}

export interface ISeedQuality {
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

export interface ICurve {
    Day: number;
    Value: number;
}

