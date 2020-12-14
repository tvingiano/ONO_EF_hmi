import {BaseInfo} from '../BaseInfo';

export enum ProfileType {
    ADMIN = 'admin',
    MAINTAINER = 'maintainer',
    INSTALLER = 'installer',
    AGRONOMIST = 'agronomist',
    FARMER = 'farmer',
    PLANNER = 'planner',
}

export class ProfilesInfo extends BaseInfo {
    Name = '';
    StandardCost = 0;
    StandardSchedule = '';
    OvertimeCost = 0;
    OvertimeSchedule = '';
    AnomaliesManaging = false;
    SetupManaging = false;
    ProductionManaging = false;
    MaintainanceManaging = false;
    OperativityManaging = false;
    OrderManaging = false;
    SystemManaging = false;
    Deletable = false;
}
