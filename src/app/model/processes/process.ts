import {BaseInfo} from '../BaseInfo';

export class ProcessInfo extends BaseInfo {
    ProcessID: number;
    OrderID: string;
    DrawerSerial: number;
    StartTime: string;
    Consumption: number;
    Actual: string;
    Measurements: any;
    Light: string;
    heights: string;
    solution: string;
    lights: string;
    ec: string;
    ph: string;
    note: string;
    LastMeasurements: string;
    Configuration: string;
}
