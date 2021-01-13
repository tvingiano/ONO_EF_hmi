export interface ILightData {
    pid: number;
    photoperiod: {
        day: number;
        night: number;
    };
    lightintensity: number;
    lightspectrum: string;
    drawerdistance: number;
}
export interface ISolutionData {
    pid: number;
    solution: string;
    solutionquantity: number;
    refill: {
        refilltype;
        ph: {
            min: number;
            max: number;
        };
        ec: {
            min: number;
            max: number;
        };
        frequency: number;
    };
    spray: {
        active: boolean;        // does this type of refill even exist?
        frequency: number;
        solution: string;
    };
}
export interface IClimateData {
    pid: number;
    temperature: number;
    humidity: number;
}
export interface IGenericData {
    pid: number;
    periodduration: number;
}

export interface IInfoData {
    pid: number;
    group: number;
    name: string;
    note: string;
}

export interface IGroup {
    gid: number;
    title: string;
    exp: number;
    stage: string;
    extended: boolean;
    totalPeriod: number;            // integer in minutes (1440 min 7 days)
    items: IPeriod[];
}


export interface IPeriod {
    type: number;                   // which type of period is it? (0: presets, 1:saved, 2 custom)
    pid: number;                    // unique integer
    name: string;                   // string
    note: string;                   // string
    photoperiod: {
        day: number;                // integer in minutes
        night: number;              // integer in minutes
    };
    lightintensity: number;
    lightspectrum: string;
    drawerdistance: number;
    solution: string;
    solutionquantity: number;
    refill: {
        refilltype: number;         // 0-"only measure"
                                    // 1-"flood with solution recycle"
                                    // 2-"flood without solution recycle"
                                    // 3-"Ebb&Flow"
                                    // 4-"spray"
        frequency: number;          // integer in minutes
        ph: {
            min: number;
            max: number;
        };
        ec: {
            min: number;
            max: number;
        };
    };

    //////////////////////
    spray: {
        active: boolean;        // does this type of refill even exist?
        frequency: number;
        solution: string;
    };
    /////////////////////

    temperature: number;
    humidity: number;
    periodduration: number;
}

export interface FinalJson {
    Recipename: string;
    Version: number;
    Recipetype: string;
    SeedType: string;
    Periods: IGroup[];
    EstimatedProduction: number;

    FirstRefill: {
        active: boolean;
        type: boolean;
        solution: string;
        quantity: number; // solo se type === 'spray'
    };

    Description: string;
    Note: string;
    Tag: string;
}
