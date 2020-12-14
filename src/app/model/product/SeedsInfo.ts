import {BaseInfo} from '../BaseInfo';
import {ISeedCost} from '../interface/ISeedCost';
import {ISeedNutritionalFact} from '../interface/ISeedNutritionalFact';
import {ISeedQuality} from '../interface/ISeedQuality';
import {ISeedFinalValues} from '../interface/ISeedFinalValues';

export class SeedsInfo extends BaseInfo {
    SeedType: string;
    Specie: string;
    Farming: string;
    Contingency: number;
    Cost: ISeedCost;
    NutritionalFact: ISeedNutritionalFact;
    Quality: ISeedQuality;
    FinalValues: ISeedFinalValues;
}
