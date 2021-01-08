const API_HOST_URL = 'http://192.168.60.3:8000';

export const environment = {
    production: false,
    apiHost: `${API_HOST_URL}/`,
    server: {

        // login and user management
        login: `${API_HOST_URL}/login`,
        whoami: `${API_HOST_URL}/whoami`,
        refresh: `${API_HOST_URL}/refresh`,
        users: `${API_HOST_URL}/users`,
        profiles: `${API_HOST_URL}/profiles`,

        // system registries
        systemregistry: `${API_HOST_URL}/systemregistry`,
        modules: `${API_HOST_URL}/modules`,
        racks: `${API_HOST_URL}/racks`,
        slots: `${API_HOST_URL}/slots`,
        lamps: `${API_HOST_URL}/lamps`,

        // plants registries
        seeds: `${API_HOST_URL}/seeds`,
        fullseeds: `${API_HOST_URL}/fullseeds`,
        farmings: `${API_HOST_URL}/farmings`,
        plants: `${API_HOST_URL}/plants`,
        species: `${API_HOST_URL}/species`,
        solutions: `${API_HOST_URL}/solutions`,
        substrates: `${API_HOST_URL}/substrates`,

        // recipes

        recipes: `${API_HOST_URL}/recipes`,

        // system configuration
        managelamp: `${API_HOST_URL}/managelamp`,
        cronlamp: `${API_HOST_URL}/cronlamp`,
        newLamps: `${API_HOST_URL}/newLamps`,
        fulldrawers: `${API_HOST_URL}/fulldrawers`,
        sendtest: `${API_HOST_URL}/sendtest`,
        getclimate: `${API_HOST_URL}/getclimate`,
        climateonoff: `${API_HOST_URL}/climateonoff`,
        settemperature: `${API_HOST_URL}/settemperature`,
        sethumidity: `${API_HOST_URL}/sethumidity`,
        runningprocesses: `${API_HOST_URL}/runningprocesses`,
        resetparams: `${API_HOST_URL}/resetparams`,
        process: `${API_HOST_URL}/process`,
        climatesetpoints: `${API_HOST_URL}/climatesetpoints`,
        setfan: `${API_HOST_URL}/setfan`,
        estimated: `${API_HOST_URL}/estimated`,
        processAbort: `${API_HOST_URL}/processAbort`,
        orders: `${API_HOST_URL}/orders`,
        confirmorder: `${API_HOST_URL}/confirmorder`,
        ready: `${API_HOST_URL}/ready`,
        resetAlarms: `${API_HOST_URL}/resetAlarms`,
        aggregate: `${API_HOST_URL}/aggregate`,
        climatediagnostics: `${API_HOST_URL}/climatesnapshot`,
        drawersurvey: `${API_HOST_URL}/drawersurvey`,
        refillsurvey: `${API_HOST_URL}/refillsurvey`,
        samplingsurvey: `${API_HOST_URL}/samplingsurvey`,
        lightsurvey: `${API_HOST_URL}/lightsurvey`,
        climatesurvey: `${API_HOST_URL}/climatesurvey`,
        newsurvey: `${API_HOST_URL}/newsurvey`,
        survey: `${API_HOST_URL}/survey`,
        closesurvey: `${API_HOST_URL}/closesurvey`,
        sendexternal: `${API_HOST_URL}/sendexternal`,
        shutter: `${API_HOST_URL}/shutter`,
        shutters: `${API_HOST_URL}/shutters`,
        totalRefill: `${API_HOST_URL}/totalRefill`,
        refillMeasure: `${API_HOST_URL}/refillMeasure`,
        ebbAndFlow: `${API_HOST_URL}/ebbAndFlow`,
        suction: `${API_HOST_URL}/suction`,
        transfer: `${API_HOST_URL}/transfer`,
        addwater: `${API_HOST_URL}/addwater`,
        measure: `${API_HOST_URL}/measure`,
        purge: `${API_HOST_URL}/purge`,
        measuringtankclean: `${API_HOST_URL}/measuringtankclean`,
        cleanfilter: `${API_HOST_URL}/cleanfilter`,
        totalclean: `${API_HOST_URL}/totalclean`,
        deleterefill: `${API_HOST_URL}/deleterefill`,
        spray: `${API_HOST_URL}/spray`,
        ozonated: `${API_HOST_URL}/addozonatedwater`,
        boot: `${API_HOST_URL}/refillboot`,
        quantity: `${API_HOST_URL}/tankquantity`,
        settings: `${API_HOST_URL}/refillsettings`,
        cartadd: `${API_HOST_URL}/cartadd`,
        cartquantity: `${API_HOST_URL}/cartquantity`,
        cartpurge: `${API_HOST_URL}/cartpurge`,
        cartserve: `${API_HOST_URL}/cartserve`,
        sprayroutine: `${API_HOST_URL}/sprayroutine`,
        closeProcess: `${API_HOST_URL}/closeProcess`,
        scheduledrefill: `${API_HOST_URL}/scheduledrefill`,
        processnew: `${API_HOST_URL}/processnew`,
        solutionCorrection: `${API_HOST_URL}/correction`,
        infoprocess: `${API_HOST_URL}/infoprocesses`,
        imagesmetadata: `${API_HOST_URL}/imagesmetadata`,
        images: `${API_HOST_URL}/images`,
        demo: `${API_HOST_URL}/demo`,
        pole: `${API_HOST_URL}/poles`,
        belt: `${API_HOST_URL}/belt`,

    }
};
