import {BaseInfo} from '../BaseInfo';

export enum RackSide {
    North = 'North',
    South = 'South'
}

export const RACK_SIDES = [RackSide.North, RackSide.South];

export class RackInfo extends BaseInfo {
    System = null;
    Rackname = 0;
    Module = 0;
    LightSlotsNumber = 0;
    GrowthSlotsNumber = 0;
    Humidity = 0;
    Temperature = 0;
    PlcAddress = '';
}
