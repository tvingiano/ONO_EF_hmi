export interface IInfoProcess {

    CvMeasures: [
        {
            Max: number;
            Min: number;
            Moda: number;
            Percentage: number;
            Timestamp: string;
        }
    ];
    DrawerSerial: number;
    EndTime: string;
    ExpectedFinalWeight: number;
    Home: number;
    Humidity: number;
    LastUpdate: string;
    LightStatus: boolean;
    LightType: string;
    NextRefill: string;
    OrderID: string;
    Phases: [
        {
            Title: string;
            Duration: number;
            GroupID: number;
        }
    ];
    ProcessID: number;
    Recipe: string;
    Solution: [
        {
            Ec: number;
            Ph: number;
            Timestamp: string;
        }
    ];
    StartTime: string;
    Status: 'running' | 'closed';
    Temperature: number;
}

export interface IImageMetadata {
    ProcessID: number;
    Images: [
        {
            Page: number;
            Timestamp: string;
        }
    ];
    Timestamp: string;

}
