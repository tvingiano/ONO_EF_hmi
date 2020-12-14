export enum PrivacyMapEntityType {
    PROFILE_NAME,
    PROFILE_PARAM,
}

export interface PrivacyMapEntity {
    type: PrivacyMapEntityType;
    value: any;
}

export const PrivacyMap = {
    /* Profile */
/*    'user/edit': [{type: PrivacyMapEntityType.PROFILE_NAME, value: 'Admin'}],*/

    /* System */
    'settings/system': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],
    'settings/system/module': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],
    'settings/system/rack': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],
    'settings/system/slot': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],

    /* Users */
    'settings/users': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],
    'settings/users/edit': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],
    'settings/users/create': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],

    /* Profiles */
    'settings/profiles/create': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],
    'settings/profiles/edit': [{type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'}],

    /* Registries */
    'settings/registries': [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'ProductionManaging'}
    ],
    'settings/registries/farmings': [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'ProductionManaging'}
    ],
    'settings/registries/plants': [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'ProductionManaging'}
    ],
    'settings/registries/species': [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'ProductionManaging'}
    ],
    'settings/registries/solutions': [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'ProductionManaging'}
    ],
    'settings/registries/substrates': [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'ProductionManaging'}
    ],

    // todo temp data for future implementation
    diagnostic: [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {
            type: PrivacyMapEntityType.PROFILE_PARAM,
            value: 'MaintainanceManaging'
        }
    ],
    maintenance: [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {
            type: PrivacyMapEntityType.PROFILE_PARAM,
            value: 'MaintainanceManaging'
        }
    ],
    connections: [
        {type: PrivacyMapEntityType.PROFILE_PARAM, value: 'SystemManaging'},
        {
            type: PrivacyMapEntityType.PROFILE_PARAM,
            value: 'SetupManaging'
        }
    ],
    * [Symbol.iterator]() {
        const properties = Object.keys(this);
        for (const i of properties) {
            yield [i, this[i]];
        }
    }
};
