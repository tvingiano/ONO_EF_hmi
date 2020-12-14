export interface ISeedData {
    _id: number;
    SeedType: string;
    Specie: string;
    NutritionalFact: {
        Protein: number;
        Fat: number;
        Carbohydrate: number;
        Calories: number;
    };
    Cost: {
    QuantityForDrawer: number;
    SingleSeedWeight: number;
    GerminatedPercentage: number;
    WeightForDrawer: number;
    WaterForRefill: number;
    EnergyForLightHour: number;
    SeedCost: number;
    };
    Quality: {
        Taste: number;
        Color: number;
        Fragrance: number;
        Crunchiness: number;
        Aesthetics: number;
        Mortality: number;
        Growthlevel: number;
        Heightcurve: [
            {
                Day: number;
                Value: number;
            }
        ];
    };
    Owner: string;
    Description: string;
    Note: string;
    Tag: string;
    Timestamp: string;
}
