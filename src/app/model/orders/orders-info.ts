export class IOrderInfo {
    BatchID: number;
    BookedDrawers: [number];
    Client: string;
    Cost: {
        SeedNumber: number;
        DrawerNumber: number;
        Energy: number;
        TotalSeedCost: number;
    };
    DrawerNumber: number;
    Energy: number;
    SeedNumber: number;
    TotalSeedCost: number;
    FinalQuantity: number;
    FinalQuantityMeasureUnit: string;
    FinalWeight: number;
    LastUpdate: string;
    LoadOperator: string;
    OrderAuthor: string;
    OrderName: string;
    OrderNotes: string;
    OrderStatus: 'validate' | 'to validate';
    OrderTags: string;
    Priority: number;
    RealEndTime: string;
    RealStartTime: string;
    Recipe: string;
    ScheduledEndTime: string;
    ScheduledStartTime: string;
    Seed: string;
    UnloadOperator: string;
}
