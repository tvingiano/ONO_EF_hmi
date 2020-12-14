
export class addProcess {
    OrderID       : string; // the title of the process
    DrawerSerial  : number; // the tray serial number
    Light         : string; // the home or slot of the tray (need to be not shadowed) to be placed in
    Configuration : string; // the light type
    Description   : string; // OPTIONAL
    Duration      : number; // Duration of the process ( days)
    FinalWeight   : number; // Desired weight
    Recipe        : string; // Recipe to use
}