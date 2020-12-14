import {BaseInfo} from '../BaseInfo';

export enum ArrayType {
    Bay = 'Bay',
    Light = 'Light',
    Growth = 'Growth',
    Pit_Stop = 'Pit-Stop'
}

export const AREA_TYPES = [ArrayType.Bay, ArrayType.Light, ArrayType.Growth, ArrayType.Pit_Stop];

export class SlotInfo extends BaseInfo {
    System: string;
    Module: number;
    Rack: number;
    Area: string;
    LightConfiguration: string;
    LampsNumber: number;
    Height: number;
    RackSide: string;
    Slotname: number;
    Slotstatus: string;
}
