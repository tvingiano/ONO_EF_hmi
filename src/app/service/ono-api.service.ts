import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ModuleInfo } from '../model/system/ModuleInfo';
import { RackInfo } from '../model/system/RackInfo';
import { SlotInfo } from '../model/system/SlotInfo';
import { LampInfo } from '../model/system/LampInfo';
import { IResponse } from '../model/interface/IResponse';
import { SeedsInfo } from '../model/product/SeedsInfo';
import { ISystemRegistry } from '../model/interface/ISystemRegistry';
import { ProfilesInfo } from '../model/system/ProfilesInfo';
import { FarmingsInfo } from '../model/registries/farmings-info';
import { PlantsInfo } from '../model/registries/plants-info';
import { SpeciesInfo } from '../model/registries/species-info';
import { SolutionsInfo } from '../model/registries/solutions-info';
import { SubstrateInfo } from '../model/substrate-info';
import { LedInfo } from '../model/configuration/led-info';
import { ProcessInfo } from '../model/processes/process';
import { DrawerInfo } from '../model/processes/drawer';
import { Climate } from '../model/configuration/climate';
import { Shutter } from '../model/configuration/shutter';
import { ClimateSet } from '../model/configuration/climate-set';
import { Drawer } from '../model/configuration/drawer';
import { SlotSimple } from '../model/configuration/slot-simple';
import { IOrder } from '../model/orders/IOrder';
import { IOrderInfo } from '../model/orders/orders-info';
import { IRectangleEvents } from '@amcharts/amcharts4/core';

@Injectable({
    providedIn: 'root'
})
export class OnoApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    /*
    * Login request
    * */
    login({ username, password }) {
        return this.http.post<{ Code: number, Token: string }>(
            `${environment.server.login}`,
            { username, password },
            {
                observe: 'response',
                withCredentials: true
            }
        );
    }

    /*
    * Return current user information
    * */
    whoami(): Observable<User> {
        return this.http.get<User>(`${environment.server.whoami}`, {
            withCredentials: true
        });
    }

    /*
    * Refresh request
    * */
    refresh() {
        return this.http.get(`${environment.server.refresh}`, {
            withCredentials: true
        });
    }

    /*
    * Edits current user information (username is read from the token; the body contains only fields to change)
    * */
    userPut(userID, values) {
        return this.http.put(
            `${environment.server.users}/${userID}`,
            { ...values },
            {
                responseType: 'text',
                withCredentials: true
            }
        );
    }

    /*
    * Returns all users
    * */
    usersGet(): Observable<User[]> {
        return this.http.get<User[]>(
            `${environment.server.users}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns information for the user passed into URL parameters
    * */
    userGet(userName): Observable<User> {
        return this.http.get<User>(
            `${environment.server.users}/${userName}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Adds a new user
    * */
    userPost(values: User): Observable<User> {
        return this.http.post<User>(
            `${environment.server.users}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Deletes the user passed into URL parameters
    * */
    userDelete(userName): Observable<User> {
        return this.http.delete<User>(
            `${environment.server.users}/${userName}`,
            {
                responseType: 'json'
            }
        );
    }

    changefan(val): Observable<any> {
        if (val !== '') {
            return this.http.get<any>(
                `${environment.server.setfan}/${val}`,
                {
                    responseType: 'json'
                }
            );
        }
    }

    changehumidity(val): Observable<any> {
        if (val !== '') {
            return this.http.get<any>(
                `${environment.server.sethumidity}/${val}`,
                {
                    responseType: 'json'
                }
            );
        }
    }

    /*
    * Returns all users
    * */
    profilesGet(): Observable<ProfilesInfo[]> {
        return this.http.get<ProfilesInfo[]>(
            `${environment.server.profiles}`,
            {
                responseType: 'json'
            }
        );
    }

    profilesPost(values: ProfilesInfo): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.profiles}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    profilesPut(profileName: string, values: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.profiles}/${profileName}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    profilesDelete(profileName: string): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.profiles}/${profileName}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all systems registries
    * */
    systemRegistryListGet(systemName?: string): Observable<ISystemRegistry[]> {
        return this.http.get<ISystemRegistry[]>(
            `${environment.server.systemregistry}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns systems registry entity
    * */
    systemRegistryGet(systemName: string): Observable<ISystemRegistry> {
        return this.http.get<ISystemRegistry>(
            `${environment.server.systemregistry}/${systemName}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all systems registries
    * */
    systemRegistryPost(values: ISystemRegistry): Observable<any> {
        return this.http.post<any>(
            `${environment.server.systemregistry}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Edits system registries (the body always contains the system name and only the fields to change)
    * */
    systemRegistryPut(systemID: string, values: any): Observable<any> {
        return this.http.put<any>(
            `${environment.server.systemregistry}/${systemID}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Deletes the system registry passed into URL parameters
    * */
    systemRegistryDelete(registryName: string): Observable<any> {
        return this.http.delete<any>(
            `${environment.server.systemregistry}/${registryName}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all modules
    * */
    modulesGet(): Observable<ModuleInfo[]> {
        return this.http.get<ModuleInfo[]>(
            `${environment.server.modules}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns the information of the module
    * */
    moduleGet(moduleID: number): Observable<ModuleInfo> {
        return this.http.get<ModuleInfo>(
            `${environment.server.modules}/${moduleID}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Edits a module (the element name to edit is specified in the URL parameters; the body contains only the fields to edit)
    * */
    modulePut(moduleID: number, values: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.modules}/${moduleID}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Create new module
    * */
    modulePost(values: any): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.modules}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Delete module
    * */
    moduleDelete(moduleID: number): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.modules}/${moduleID}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all racks
    * */
    racksGet(): Observable<RackInfo[]> {
        return this.http.get<RackInfo[]>(
            `${environment.server.racks}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns the information of the rack
    * */
    rackGet(rackID: number): Observable<RackInfo> {
        return this.http.get<RackInfo>(
            `${environment.server.racks}/${rackID}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Modifies the rack
    * */
    rackPut(rackID: number, values: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.racks}/${rackID}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Create new rack
    * */
    rackPost(values: any): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.racks}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Delete rack
    * */
    rackDelete(rackId: number): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.racks}/${rackId}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all slots
    * */
    slotsGet(): Observable<SlotInfo[]> {
        return this.http.get<SlotInfo[]>(
            `${environment.server.slots}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns slot info
    * */
    slotGet(slotID): Observable<SlotInfo> {
        return this.http.get<SlotInfo>(
            `${environment.server.slots}/${slotID}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Modifies the slot
    * */
    slotPut(slotID: number, values: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.slots}/${slotID}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Create new slot
    * */
    slotPost(values: any): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.slots}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Delete slot
    * */
    slotDelete(slotId: number): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.slots}/${slotId}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all lamps
    * */
    lampsGet(): Observable<LampInfo[]> {
        return this.http.get<LampInfo[]>(
            `${environment.server.lamps}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Returns all seeds
    * */
    seedsGet(): Observable<SeedsInfo[]> {
        return this.http.get<SeedsInfo[]>(
            `${environment.server.fullseeds}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Modifies the seed
    * */
    seedPut(SeedType: string, values: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.seeds}/${SeedType}`,
            { ...values },
            {
                responseType: 'json'
            }
        );
    }

    /*
    *  GET system component info
    * */
    getSystemComponentInfo<T>(params: string[]): Observable<T> {
        return this.http.get<T>(
            `${environment.apiHost}${params.join('/')}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    *  POST system component info
    * */
    postSystemComponentInfo<T>(params: any[], data: object): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.apiHost}${params.join('/')}`,
            { ...data },
            {
                responseType: 'json'
            }
        );
    }

    /*
    *  PUT system component info
    * */
    putSystemComponentInfo<T>(params: any[], data: object): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.apiHost}${params.join('/')}`,
            { ...data },
            {
                responseType: 'json'
            }
        );
    }

    /*
    *  DELETE system component info
    * */
    deleteSystemComponentInfo<T>(params: any[]): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.apiHost}${params.join('/')}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    *  GET system components list
    * */
    getSystemComponentList<T>(params: string[]): Observable<T[]> {
        return this.http.get<T[]>(
            `${environment.apiHost}${params.join('/')}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * GET farmings
    * */
    getFarmings(): Observable<FarmingsInfo[]> {
        return this.http.get<FarmingsInfo[]>(
            `${environment.server.farmings}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * POST farmings
    * */
    postFarmings(value: FarmingsInfo): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.farmings}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * PUT farmings
    * */
    putFarmings(id: string, value: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.farmings}/${id}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * DELETE farmings
    * */
    deleteFarmings(id: string): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.farmings}/${id}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * GET farmings
    * */
    getPlants(): Observable<PlantsInfo[]> {
        return this.http.get<PlantsInfo[]>(
            `${environment.server.plants}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * POST farmings
    * */
    postPlants(value: PlantsInfo): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.plants}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * PUT farmings
    * */
    putPlants(id: string, value: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.plants}/${id}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * DELETE farmings
    * */
    deletePlants(id: string): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.plants}/${id}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * GET species
    * */
    getSpecies(): Observable<SpeciesInfo[]> {
        return this.http.get<SpeciesInfo[]>(
            `${environment.server.species}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * POST species
    * */
    postSpecies(value: SpeciesInfo): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.species}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * PUT species
    * */
    putSpecies(id: string, value: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.species}/${id}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * DELETE species
    * */
    deleteSpecies(id: string): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.species}/${id}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * GET Solutions
    * */
    getsSolutions(): Observable<SolutionsInfo[]> {
        return this.http.get<SolutionsInfo[]>(
            `${environment.server.solutions}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * POST Solutions
    * */
    postSolutions(value: SolutionsInfo): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.solutions}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * PUT species
    * */
    putSolutions(id: string, value: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.solutions}/${id}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * DELETE Solutions
    * */
    deleteSolutions(id: string): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.solutions}/${id}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * GET Substrates
    * */
    getsSubstrates(): Observable<SubstrateInfo[]> {
        return this.http.get<SubstrateInfo[]>(
            `${environment.server.substrates}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * POST Substrates
    * */
    postSubstrates(value: SubstrateInfo): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.substrates}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /*
    * PUT Substrates
    * */
    putSubstrates(id: string, value: any): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.substrates}/${id}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    abortProcesss(val): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.processAbort}/${val}`,
            {
                responseType: 'json'
            }
        );
    }
    closeProcess(val): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.closeProcess}/${val}`,
            {
                responseType: 'json'
            }
        );
    }
    addProcess(val): Observable<IResponse> {
        if (val.OrderId !== '') {
            val.DrawerSerial = parseInt(val.DrawerSerial, 10);
            return this.http.post<IResponse>(
                `${environment.server.process}`,
                { ...val },
                {
                    responseType: 'json'
                }
            );
        }
    }
    addProcessNew(val): Observable<IResponse> {
        if (val.OrderId !== '') {
            val.DrawerSerial = parseInt(val.DrawerSerial, 10);
            val.Duration = parseInt(val.Duration, 10);
            val.FinalWeight = parseFloat(val.FinalWeight);
            return this.http.post<IResponse>(
                `${environment.server.processnew}`,
                { ...val },
                {
                    responseType: 'json'
                }
            );
        }
    }
    /*
    * DELETE Substrates
    * */
    deleteSubstrates(id: string): Observable<IResponse> {
        return this.http.delete<IResponse>(
            `${environment.server.substrates}/${id}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * GET Led panels
    * */
    getLed(): Observable<LedInfo[]> {
        return this.http.get<LedInfo[]>(
            `${environment.server.newLamps}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
* POST manage lamp
* */

    manageLamp(val): Observable<IResponse> {
        if (val.address !== '') {
            val.address = parseInt(val.address, 10);
            val.pwm1Int = parseInt(val.pwm1Int, 10);
            val.pwm2Int = parseInt(val.pwm2Int, 10);
            val.pwm3Int = parseInt(val.pwm3Int, 10);
            val.pwm4Int = parseInt(val.pwm4Int, 10);
            return this.http.post<IResponse>(
                `${environment.server.managelamp}`,
                { ...val },
                {
                    responseType: 'json'
                }
            );
        }
    }

    scheduleLamp(val): Observable<IResponse> {
        if (val.address !== '') {
            const vals = {
                Address: parseInt(val.address, 10),
                Hour: parseInt(val.hour, 10),
                Minute: parseInt(val.minute, 10),
                Second: 0,
                Turn: val.turn,
                Pwm1Int: parseInt(val.pwm1Int, 10),
                Pwm2Int: parseInt(val.pwm2Int, 10),
                Pwm3Int: parseInt(val.pwm3Int, 10),
                Pwm4Int: parseInt(val.pwm4Int, 10)
            };
            return this.http.post<IResponse>(
                `${environment.server.cronlamp}`,
                { ...vals },
                {
                    responseType: 'json'
                }
            );
        }
    }


    getFullDrawerss(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/fulldrawers', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }

    getLamps(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/readlamps', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }

    getRunningProcesses(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/runningprocesses', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }
    getRunningProcessess(): Observable<ProcessInfo[]> {
        return this.http.get<ProcessInfo[]>(
            `${environment.server.runningprocesses}`,
            {
                responseType: 'json'
            }
        );
    }

    abortProcess(val): Promise<any> {
        if (val !== '') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.put('http://192.168.60.3:8000/processAbort/' + val, { withCredentials: false })
                .toPromise()
                .then(res => {
                    return res;
                });
        }
    }
    resetParams(): Observable<IResponse> {
        return this.http.get<IResponse>(
            `${environment.server.resetparams}`,
            {
                responseType: 'json'
            }
        );
    }
    readEstimated(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.estimated}`,
            {
                responseType: 'json'
            }
        );
    }

    height(val): Observable<IResponse> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const op = {
            Height: parseFloat(val.height),
            Acceleration: parseFloat(val.acceleration),
            Speed: parseFloat(val.speed),
            Deceleration: parseFloat(val.deceleration)
        };
        return this.http.post<IResponse>('http://192.168.60.3:8000/height', op, { withCredentials: false });
    }

    processNote(val) {
        if (val.from !== '') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post('http://192.168.60.3:8000/processnote', val, { withCredentials: false }).subscribe();
        }
    }

    newTest(val) {
        if (val.process !== 0) {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post('http://192.168.60.3:8000/sendtest', val, { withCredentials: false }).subscribe();
        }
    }

    newTests(val): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.sendtest}`,
            { ...val },
            {
                responseType: 'json'
            }
        );
    }


    growthStatus(val) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://192.168.60.3:8000/growthStatus', val, { withCredentials: false }).subscribe();

    }

    getNewLamps(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/newLamps', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }



    // turnon(): Promise<any> {
    //     let headers = new Headers()
    //     headers.append('Content-Type', 'application/json')
    //     return this.http.get('http://192.168.60.3:8000/climateonoff/1', { withCredentials: false })
    //         .toPromise()
    //         .then(res => {
    //             return res
    //         })
    // }
    // turnoff(): Promise<any> {
    //     let headers = new Headers()
    //     headers.append('Content-Type', 'application/json')
    //     return this.http.get('http://192.168.60.3:8000/climateonoff/0', { withCredentials: false })
    //         .toPromise()
    //         .then(res => {
    //             return res
    //         })

    // }

    turnon(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.climateonoff}/1`,
            {
                responseType: 'json'
            }
        );
    }
    turnoff(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.climateonoff}/0`,
            {
                responseType: 'json'
            }
        );
    }

    validateOrder(val): Observable<any> {
        return this.http.get<any>(
            `${environment.server.confirmorder}/` + val,
            {
                responseType: 'json'
            }
        );
    }
    deleteOrder(val): Observable<any> {
        return this.http.delete<any>(
            `${environment.server.orders}/` + val,
            {
                responseType: 'json'
            }
        );
    }

    changetemperature(val): Observable<any> {
        if (val !== '') {
            return this.http.get<any>(
                `${environment.server.settemperature}/${val}`,
                {
                    responseType: 'json'
                }
            );
        }
    }

    // changetemperature(val): Promise<any> {
    //     if (val != "") {
    //         let headers = new Headers()
    //         headers.append('Content-Type', 'application/json')
    //         return this.http.get('http://192.168.60.3:8000/settemperature/' + val, { withCredentials: false })
    //             .toPromise()
    //             .then(res => {
    //                 return res
    //             })
    //     }
    // }

    // changefan(val): Promise<any> {
    //     if (val != "") {
    //         let headers = new Headers()
    //         headers.append('Content-Type', 'application/json')
    //         return this.http.get('http://192.168.60.3:8000/setfan/' + val, { withCredentials: false })
    //             .toPromise()
    //             .then(res => {
    //                 return res
    //             })
    //     }
    // }
    // changehumidity(val): Promise<any> {
    //     if (val != "") {
    //         let headers = new Headers()
    //         headers.append('Content-Type', 'application/json')
    //         return this.http.get('http://192.168.60.3:8000/sethumidity/' + val, { withCredentials: false })
    //             .toPromise()
    //             .then(res => {
    //                 return res
    //             })
    //     }
    // }
    readEnergy(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/readenergy', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });

    }
    ambiental(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/ambiental', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });

    }
    getMovem(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/movements', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });

    }

    getFullRecipes(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/recipes', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }

    getRecipes(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/recipes', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }


    addOrder(val): Observable<IResponse> {
        if (val.ordername !== 0) {
            const value = {
                ordername: val.ordername,
                client: '',
                recipe: val.recipe,
                quantity: val.quantity,
                udm: 'kg',
                priority: 1
            };
            return this.http.post<IResponse>(
                `${environment.server.orders}`,
                { ...value },
                {
                    responseType: 'json'
                }
            );
        }
    }

    get(val): Observable<IResponse> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const op = {
            Side: val.side,
            Acceleration: parseFloat(val.acceleration),
            Speed: parseFloat(val.speed),
            Deceleration: parseFloat(val.deceleration),
            Direction: val.direction
        };
        return this.http.post<IResponse>(
            'http://192.168.60.3:8000/get',
            op, { withCredentials: false });
    }
    put(val): Observable<IResponse> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const op = {
            Side: val.side,
            Acceleration: parseFloat(val.acceleration),
            Speed: parseFloat(val.speed),
            Deceleration: parseFloat(val.deceleration),
            Direction: val.direction
        };
        return this.http.post<IResponse>(
            'http://192.168.60.3:8000/put',
            op,
            {
                withCredentials: false
            }
        );
    }

    getProcesses(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/processes', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }

    efficiency(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/efficiency', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }


    shuttle(val) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const op = {
            From: parseFloat(val.initialHeight),
            To: parseFloat(val.finalHeight),
            Reps: parseInt(val.reps, 10),
            Acceleration: parseFloat(val.acceleration),
            Speed: parseFloat(val.speed),
            Deceleration: parseFloat(val.deceleration)
        };
        this.http.post('http://192.168.60.3:8000/shuttle', op, { withCredentials: false }).subscribe();
    }


    porters(val) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const op = {
            To: parseFloat(val.To),
            Drawer: parseInt(val.DrawerSerial, 10),
            Reps: parseInt(val.reps, 10),
            Acceleration: parseFloat(val.acceleration),
            Speed: parseFloat(val.speed),
            Deceleration: parseFloat(val.deceleration)
        };
        this.http.post('http://192.168.60.3:8000/porters', op, { withCredentials: false }).subscribe();
    }


    drawerStress(val) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const op = {
            Drawer: parseInt(val.DrawerSerial, 10),
            Reps: parseInt(val.reps, 10),
            From: parseInt(val.From, 10),
            To: parseInt(val.To, 10)
        };
        this.http.post('http://192.168.60.3:8000/drawerStress', op, { withCredentials: false }).subscribe();
    }

    startProcess(val) {
        if (val.drawerID !== '') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post('http://192.168.60.3:8000/start', val, { withCredentials: false }).subscribe();
        }
    }


    // slotsGetSimple(): Promise<any> {
    //     let headers = new Headers()
    //     headers.append('Content-Type', 'application/json')
    //     return this.http.get('http://192.168.60.3:8000/slots', { withCredentials: false })
    //         .toPromise()
    //         .then(res => {
    //             return res
    //         })
    // }
    // getClimateSetpoints(): Promise<any> {
    //     let headers = new Headers()
    //     headers.append('Content-Type', 'application/json')
    //     return this.http.get('http://192.168.60.3:8000/climatesetpoints', { withCredentials: false })
    //         .toPromise()
    //         .then(res => {
    //             return res
    //         })
    // }

    getClimateSetpoints(): Observable<ClimateSet> {
        return this.http.get<ClimateSet>(
            `${environment.server.climatesetpoints}`,
            {
                responseType: 'json'
            }
        );
    }

    getClimate(): Observable<Climate[]> {
        return this.http.get<Climate[]>(
            `${environment.server.getclimate}`,
            {
                responseType: 'json'
            }
        );
    }



    // getClimate(): Promise<any> {
    //     let headers = new Headers()
    //     headers.append('Content-Type', 'application/json')
    //     return this.http.get('http://192.168.60.3:8000/getclimate', { withCredentials: false })
    //         .toPromise()
    //         .then(res => {
    //             return res
    //         })

    // }

    cv(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/computerVision', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });
    }
    getLeds(): Observable<LedInfo[]> {
        return this.http.get<LedInfo[]>(
            `${environment.server.newLamps}`,
            {
                responseType: 'json'
            }
        );
    }
    getFullOrders(): Observable<IOrderInfo[]> {
        return this.http.get<IOrderInfo[]>(
            `${environment.server.orders}`,
            {
                responseType: 'json'
            }
        );
    }

    slotsGetSimple(): Observable<SlotSimple[]> {
        return this.http.get<SlotSimple[]>(
            `${environment.server.slots}`,
            {
                responseType: 'json'
            }
        );
    }

    getFullDrawers(): Observable<Drawer[]> {
        return this.http.get<Drawer[]>(
            `${environment.server.fulldrawers}`,
            {
                responseType: 'json'
            }
        );
    }
    ready(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.ready}`,
            {
                responseType: 'json'
            }
        );
    }
    resetAlarms(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.resetAlarms}`,
            {
                responseType: 'json'
            }
        );
    }
    aggregate(a, b, c): Observable<any> {
        return this.http.get<any>(
            `${environment.server.aggregate}` + '/' + a + '/' + b + '/' + c,
            {
                responseType: 'json'
            }
        );
    }
    // climatesnapshot(): Observable<any> {
    //     return this.http.get<any>(
    //         `${environment.server.climatesnapshot}`,
    //         {
    //             responseType: 'json'
    //         }
    //     );
    // }

    climatesnapshot(): Promise<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://192.168.60.3:8000/fullclimatesetpoints', { withCredentials: false })
            .toPromise()
            .then(res => {
                return res;
            });

    }


    editProcess(processId, values) {
        values.drawerserial = parseInt(values.drawerserial, 10);
        return this.http.put(
            `${environment.server.process}/${processId}`,
            { ...values },
            {
                responseType: 'text',
                withCredentials: true
            }
        );
    }

    readSurveys(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.survey}`,
            {
                responseType: 'json'
            }
        );
    }


    newSurveyProcess(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.newsurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    newSurveyLight(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.lightsurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    newSurveyClimate(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.climatesurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    newSurveySampling(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.samplingsurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    newSurveyRefill(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.refillsurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    newSurveyDrawer(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.drawersurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    newSurveyClose(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.closesurvey}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }

    /**
     * move any drawer in external based on $from
     */
    toExternal(from): Observable<IResponse> {
        return this.http.get<IResponse>(
            `${environment.server.sendexternal}/${from}`,
            {
                responseType: 'json'
            }
        );
    }

    /*
    * Create new recipe
    * */
    postRecipe(value: any): Observable<IResponse> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post<IResponse>('http://192.168.60.3:8000/recipes', value, { withCredentials: false });
    }

    shutter(deck, direction): Observable<IResponse> {
        return this.http.get<IResponse>(
            `${environment.server.shutter}/${deck}/${direction}`,
            {
                responseType: 'json'
            }
        );
    }


    getShutter(): Observable<Shutter[]> {
        return this.http.get<Shutter[]>(
            `${environment.server.shutters}`,
            {
                responseType: 'json'
            }
        );
    }
    totalRefill(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.totalRefill}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    refillMeasure(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.refillMeasure}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    sprayroutine(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.sprayroutine}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    ebbAndFlow(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.ebbAndFlow}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    totalclean(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.totalclean}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    cleanfilter(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.cleanfilter}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    boot(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.boot}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    measuringtankclean(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.measuringtankclean}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    purge(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.purge}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    quantity(value) {
        return this.http.post(
            `${environment.server.quantity}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    cartserve(value) {
        return this.http.post(
            `${environment.server.cartserve}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    cartpurge(value) {
        return this.http.post(
            `${environment.server.cartpurge}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    cartadd(value) {
        return this.http.post(
            `${environment.server.cartadd}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    cartquantity() {
        return this.http.get(
            `${environment.server.cartquantity}`,
            {
                responseType: 'json'
            }
        );
    }

    settings(value) {
        return this.http.post(
            `${environment.server.settings}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    measure(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.measure}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    addwater(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.addwater}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    spray(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.spray}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    ozonated(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.ozonated}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    transfer(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.transfer}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    suction(value): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.suction}`,
            { ...value },
            {
                responseType: 'json'
            }
        );
    }
    deleterefill(drawer): Observable<IResponse> {
        return this.http.get<IResponse>(
            `${environment.server.deleterefill}/` + drawer,
            {
                responseType: 'json'
            }
        );
    }
    scheduledrefill(drawer): Observable<any> {
        return this.http.get<any>(
            `${environment.server.scheduledrefill}/` + drawer,
            {
                responseType: 'json'
            }
        );
    }
    demo(): Observable<any> {
        return this.http.get<any>(
            `${environment.server.demo}`
        );
    }


    /*
    * Return pictures
    * */
   images(): Observable<Blob> {
        return this.http.get(
            `${environment.server.images}`,
            {
                responseType: 'blob'
            }
        );
    }
    /*
    * Return complete info for every process
    * */
   infoprocess(): Observable<any> {
        return this.http.get<any>(`${environment.server.infoprocess}`, {
            withCredentials: true
            }
        );
    }

/**
 * GET image relative processID, type and page.
 * @param processID - process id
 * @param type - original | area | height
 * @param page - the image index
 */
    getImage(processID, type, page): Observable<Blob> {
        return this.http.get(
            `${environment.server.images}/${processID}/${type}/${page}`,
            {
                responseType: 'blob'
            }
        );
    }

/**
 * @param processID - Process to filter
 */
    getImagesMetadata(processID) {
        return this.http.get(
            `${environment.server.imagesmetadata}/${processID}`,
            {
                responseType: 'json'
            }
        );
    }

/**
 *
 * @param processID - Process id
 * @param Home - The new home to put: {'Home': new_home}
 */
    putProcessHome(processID: number, home: object): Observable<IResponse> {
        return this.http.put<IResponse>(
            `${environment.server.process}/${processID}`,
            {...home},
            {
                responseType: 'json',
                withCredentials: true
            }
        );

    }

/**
 *
 * @param data - object {Ph: number, Ec:number} sets new solution values
 */
    postSolutionCorrection(data: {Ph: number, Ec: number}): Observable<IResponse> {

        return this.http.post<IResponse>(
            `${environment.server.solutionCorrection}`,
            {...data},
            {
                responseType: 'json',
                withCredentials: true
            }
        );

    }


    SetPole(newPole): Observable<IResponse> {

        const pole = parseInt(newPole.pole, 10);

        return this.http.get<IResponse>(
            `${environment.server.pole}/${pole}`,
            {
                responseType: 'json',
                withCredentials: true
            }
        );
    }

    SetBelt(newBelt): Observable<IResponse> {

        const belt = parseInt(newBelt.belt, 10);

        return this.http.get<IResponse>(
            `${environment.server.belt}/${belt}`,
            {
                responseType: 'json',
                withCredentials: true
            }
        );
    }

    newOrder(order: IOrder): Observable<IResponse> {
        return this.http.post<IResponse>(
            `${environment.server.orders}`,
            {...order},
            {
                responseType: 'json',
                withCredentials: true
            }
        );
    }

}
