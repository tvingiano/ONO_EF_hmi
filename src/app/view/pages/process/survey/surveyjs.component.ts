import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';
import * as Survey from 'survey-angular';
import { OnoApiService } from '../../../../service/ono-api.service';

@Component({
    selector: 'surveyjs-component',
    template: `<link href="https://surveyjs.azureedge.net/1.7.12/survey.css" type="text/css" rel="stylesheet" />
    <script src="https://surveyjs.azureedge.net/1.7.12/survey.angular.min.js"></script>
    
    <div id="surveyContainer"></div>`
})
export class SurveyjsComponent {
    editor: SurveyEditor.SurveyEditor;
    constructor(private onoApiService: OnoApiService) { }
    ngOnInit() {
        var me = this
        this.onoApiService
            .readSurveys()
            .subscribe(
                value => {
                    var processes = []
                    if (value) value.forEach(function (val) {
                        if (val.Status == "running") {
                            processes.push("Drawer:" + val.DrawerID + "-Tank:" + val.TankID + "-ID:" + val.ExpID)
                        }
                    })
                    var json = {
                        "locale": "it",
                        "pages": [
                            {
                                "name": "page1",
                                "elements": [
                                    {
                                        "type": "dropdown",
                                        "name": "Operation",
                                        "title": "Operazione da eseguire",
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "new",
                                                "text": "Aggiungi nuovo esperimento"
                                            },
                                            {
                                                "value": "light",
                                                "text": "Aggiorna trattamento luce"
                                            },
                                            {
                                                "value": "climate",
                                                "text": "Aggiorna trattamento clima"
                                            },
                                            {
                                                "value": "sampling",
                                                "text": "Aggiorna dati campionamento"
                                            },
                                            {
                                                "value": "refill",
                                                "text": "Aggiorna dati refill"
                                            },
                                            {
                                                "value": "drawer",
                                                "text": "Aggiorna cassetto/vasca"
                                            },
                                            {
                                                "value": "close",
                                                "text": {
                                                    "it": "Concludi esperimento"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "ExpID",
                                        "visibleIf": "{Operation} = 'sampling' or {Operation} = 'drawer' or {Operation} = 'close'",
                                        "title": "Selezionare esperimento",
                                        "isRequired": true,
                                        "choices": processes
                                    }
                                ],
                                "title": "Gestione esperimenti",
                                "description": "Aggiungi un nuovo esperimento o aggiorna i dati di un esperimento già inizializzato"
                            },
                            {
                                "name": "page2",
                                "elements": [
                                    {
                                        "type": "dropdown",
                                        "name": "DrawerID",
                                        "title": "ID cassetto",
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "1",
                                                "text": "1"
                                            },
                                            {
                                                "value": "2",
                                                "text": "2"
                                            },
                                            {
                                                "value": "3",
                                                "text": "3"
                                            },
                                            {
                                                "value": "4",
                                                "text": "4"
                                            },
                                            {
                                                "value": "5",
                                                "text": "5"
                                            },
                                            {
                                                "value": "6",
                                                "text": "6"
                                            },
                                            {
                                                "value": "7",
                                                "text": "7"
                                            },
                                            {
                                                "value": "8",
                                                "text": "8"
                                            },
                                            {
                                                "value": "9",
                                                "text": "9"
                                            },
                                            {
                                                "value": "10",
                                                "text": "10"
                                            },
                                            {
                                                "value": "11",
                                                "text": "11"
                                            },
                                            {
                                                "value": "12",
                                                "text": "12"
                                            },
                                            {
                                                "value": "13",
                                                "text": "13"
                                            },
                                            {
                                                "value": "14",
                                                "text": "14"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "Temperatures",
                                        "title": {
                                            "it": "Temperatura"
                                        },
                                        "isRequired": true
                                    },
                                    {
                                        "type": "text",
                                        "name": "Humiditys",
                                        "title": {
                                            "it": "Umidità"
                                        },
                                        "isRequired": true
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "Panel",
                                        "title": {
                                            "it": "ID pannello LED"
                                        },
                                        "choices": [
                                            {
                                                "value": "0",
                                                "text": {
                                                    "it": "0"
                                                }
                                            },
                                            {
                                                "value": "1",
                                                "text": {
                                                    "it": "1"
                                                }
                                            },
                                            {
                                                "value": "2",
                                                "text": {
                                                    "it": "2"
                                                }
                                            },
                                            {
                                                "value": "3",
                                                "text": {
                                                    "it": "3"
                                                }
                                            },
                                            {
                                                "value": "4",
                                                "text": {
                                                    "it": "4"
                                                }
                                            },
                                            {
                                                "value": "5",
                                                "text": {
                                                    "it": "5"
                                                }
                                            },
                                            {
                                                "value": "6",
                                                "text": {
                                                    "it": "6"
                                                }
                                            },
                                            {
                                                "value": "7",
                                                "text": {
                                                    "it": "7"
                                                }
                                            },
                                            {
                                                "value": "8",
                                                "text": {
                                                    "it": "8"
                                                }
                                            },
                                            {
                                                "value": "9",
                                                "text": {
                                                    "it": "9"
                                                }
                                            },
                                            {
                                                "value": "10",
                                                "text": {
                                                    "it": "10"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "Light",
                                        "title": {
                                            "it": "Ore luce su 24"
                                        }
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "Spectrum",
                                        "title": {
                                            "it": "Spettro luce"
                                        },
                                        "choices": [
                                            {
                                                "value": "None",
                                                "text": {
                                                    "it": "None"
                                                }
                                            },
                                            {
                                                "value": "Red+Blue",
                                                "text": {
                                                    "it": "Red+Blue"
                                                }
                                            },
                                            {
                                                "value": "White",
                                                "text": {
                                                    "it": "White"
                                                }
                                            },
                                            {
                                                "value": "Purple",
                                                "text": {
                                                    "it": "Purple"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "matrixdropdown",
                                        "name": "Intensitys",
                                        "title": {
                                            "it": "Intensità canali"
                                        },
                                        "columns": [
                                            {
                                                "name": "Par",
                                                "title": {
                                                    "it": "PAR"
                                                }
                                            }
                                        ],
                                        "cellType": "text",
                                        "rows": [
                                            "White",
                                            "Red",
                                            "Blue",
                                            "Purple"
                                        ]
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "LedDrawerDistances",
                                        "title": {
                                            "it": "Distanza cassetto - LED"
                                        },
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "0 cm",
                                                "text": {
                                                    "it": "0 cm"
                                                }
                                            },
                                            {
                                                "value": "10 cm",
                                                "text": {
                                                    "it": "10 cm"
                                                }
                                            },
                                            {
                                                "value": "20 cm",
                                                "text": {
                                                    "it": "20 cm"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "paneldynamic",
                                        "name": "Tanks",
                                        "title": {
                                            "it": "Nuova vasca"
                                        },
                                        "templateElements": [
                                            {
                                                "type": "checkbox",
                                                "name": "TankID",
                                                "title": {
                                                    "it": "Vasche"
                                                },
                                                "isRequired": true,
                                                "choices": [
                                                    {
                                                        "value": "1",
                                                        "text": {
                                                            "it": "1"
                                                        }
                                                    },
                                                    {
                                                        "value": "2",
                                                        "text": {
                                                            "it": "2"
                                                        }
                                                    },
                                                    {
                                                        "value": "3",
                                                        "text": {
                                                            "it": "3"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "dropdown",
                                                "name": "Solution",
                                                "title": {
                                                    "it": "Tipologia nutrienti"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Acqua",
                                                        "text": {
                                                            "it": "Acqua"
                                                        }
                                                    },
                                                    {
                                                        "value": "Hoagland",
                                                        "text": {
                                                            "it": "Hoagland"
                                                        }
                                                    },
                                                    {
                                                        "value": "Hakapos verde",
                                                        "text": {
                                                            "it": "Hakapos verde"
                                                        }
                                                    },
                                                    {
                                                        "value": "Baseplant orange",
                                                        "text": {
                                                            "it": "Baseplant orange"
                                                        }
                                                    },
                                                    {
                                                        "value": "Mirko",
                                                        "text": {
                                                            "it": "Mirko"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "name": "Waters",
                                                "title": {
                                                    "it": "Volume finale (L)"
                                                },
                                                "isRequired": true
                                            },
                                            {
                                                "type": "text",
                                                "name": "SolutionQuantity",
                                                "title": {
                                                    "it": "Quantità nutrienti (L)"
                                                }
                                            },
                                            {
                                                "type": "radiogroup",
                                                "name": "Ozon",
                                                "title": {
                                                    "it": "Ozono"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Si",
                                                        "text": {
                                                            "it": "Si"
                                                        }
                                                    },
                                                    {
                                                        "value": "No",
                                                        "text": {
                                                            "it": "No"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "radiogroup",
                                                "name": "Calciu",
                                                "title": {
                                                    "it": "Soluzione Calcio"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Si",
                                                        "text": {
                                                            "it": "Si"
                                                        }
                                                    },
                                                    {
                                                        "value": "No",
                                                        "text": {
                                                            "it": "No"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "radiogroup",
                                                "name": "Pota",
                                                "title": {
                                                    "it": "Soluzione Potassio"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Si",
                                                        "text": {
                                                            "it": "Si"
                                                        }
                                                    },
                                                    {
                                                        "value": "No",
                                                        "text": {
                                                            "it": "No"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "radiogroup",
                                                "name": "Ammonio",
                                                "title": {
                                                    "it": "Ammonio Molibdato"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Si",
                                                        "text": {
                                                            "it": "Si"
                                                        }
                                                    },
                                                    {
                                                        "value": "No",
                                                        "text": {
                                                            "it": "No"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "radiogroup",
                                                "name": "Perlite",
                                                "title": {
                                                    "it": "Perlite presente"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Si",
                                                        "text": {
                                                            "it": "Si"
                                                        }
                                                    },
                                                    {
                                                        "value": "No",
                                                        "text": {
                                                            "it": "No"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "paneldynamic",
                                                "name": "Experiments",
                                                "title": {
                                                    "it": "Nuovo esperimento"
                                                },
                                                "templateElements": [
                                                    {
                                                        "type": "dropdown",
                                                        "name": "Format",
                                                        "title": {
                                                            "it": "Formato"
                                                        },
                                                        "choices": [
                                                            {
                                                                "value": "Pianta",
                                                                "text": {
                                                                    "it": "Pianta"
                                                                }
                                                            },
                                                            {
                                                                "value": "Baby leaf",
                                                                "text": {
                                                                    "it": "Baby leaf"
                                                                }
                                                            },
                                                            {
                                                                "value": "Microgreens",
                                                                "text": {
                                                                    "it": "Microgreens"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "dropdown",
                                                        "name": "PlantType",
                                                        "title": {
                                                            "it": "Tipologia pianta"
                                                        },
                                                        "isRequired": true,
                                                        "choices": [
                                                            {
                                                                "value": "Basilico",
                                                                "text": {
                                                                    "it": "Basilico"
                                                                }
                                                            },
                                                            {
                                                                "value": "Rucola",
                                                                "text": {
                                                                    "it": "Rucola"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga",
                                                                "text": {
                                                                    "it": "Lattuga"
                                                                }
                                                            },
                                                            {
                                                                "value": "Pomodoro",
                                                                "text": {
                                                                    "it": "Pomodoro"
                                                                }
                                                            },
                                                            {
                                                                "value": "Tatsoi",
                                                                "text": {
                                                                    "it": "Tatsoi"
                                                                }
                                                            },
                                                            {
                                                                "value": "Bietola",
                                                                "text": {
                                                                    "it": "Bietola"
                                                                }
                                                            },
                                                            {
                                                                "value": "Senape Rossa",
                                                                "text": {
                                                                    "it": "Senape Rossa"
                                                                }
                                                            },
                                                            {
                                                                "value": "Girasole",
                                                                "text": {
                                                                    "it": "Girasole"
                                                                }
                                                            },
                                                            {
                                                                "value": "Radish",
                                                                "text": {
                                                                    "it": "Radish"
                                                                }
                                                            },
                                                            {
                                                                "value": "Cavolo",
                                                                "text": {
                                                                    "it": "Cavolo"
                                                                }
                                                            },
                                                            {
                                                                "value": "Quinoa",
                                                                "text": {
                                                                    "it": "Quinoa"
                                                                }
                                                            },
                                                            {
                                                                "value": "Broccolo",
                                                                "text": {
                                                                    "it": "Broccolo"
                                                                }
                                                            },
                                                            {
                                                                "value": "Coriandolo",
                                                                "text": {
                                                                    "it": "Coriandolo"
                                                                }
                                                            },
                            
                                                            
                                                            {
                                                                "value": "Ravanello",
                                                                "text": {
                                                                    "it": "Ravanello"
                                                                }
                                                            },
                                                            {
                                                                "value": "Komatsuna",
                                                                "text": {
                                                                    "it": "Komatsuna"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "dropdown",
                                                        "name": "Variety",
                                                        "title": {
                                                            "it": "Varietà"
                                                        },
                                                        "isRequired": true,
                                                        "choices": [
                                                            {
                                                                "value": "Basilico - Sweet Genovese",
                                                                "text": {
                                                                    "it": "Basilico - Sweet Genovese"
                                                                }
                                                            },
                                                            {
                                                                "value": "Basilico - Classico italiano",
                                                                "text": {
                                                                    "it": "Basilico - Classico italiano"
                                                                }
                                                            },
                                                            {
                                                                "value": "Basilico - Franchi",
                                                                "text": {
                                                                    "it": "Basilico - Franchi"
                                                                }
                                                            },
                                                            {
                                                                "value": "Rucola - Coltivata",
                                                                "text": {
                                                                    "it": "Rucola - Coltivata"
                                                                }
                                                            },
                                                            {
                                                                "value": "Rucola - Selvatica Atlanta",
                                                                "text": {
                                                                    "it": "Rucola - Selvatica Atlanta"
                                                                }
                                                            },
                                                            {
                                                                "value": "Rucola - Selvatica Dallas",
                                                                "text": {
                                                                    "it": "Rucola - Selvatica Dallas"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - FALSTAFF",
                                                                "text": {
                                                                    "it": "Lattuga - FALSTAFF"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Foglia liscia",
                                                                "text": {
                                                                    "it": "Lattuga - Foglia liscia"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Tirrena",
                                                                "text": {
                                                                    "it": "Lattuga - Tirrena"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Jessica",
                                                                "text": {
                                                                    "it": "Lattuga - Jessica"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Iceberg Donovan",
                                                                "text": {
                                                                    "it": "Lattuga - Iceberg Donovan"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Valeriana Paudium",
                                                                "text": {
                                                                    "it": "Lattuga - Valeriana Paudium"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Valeriana Elan",
                                                                "text": {
                                                                    "it": "Lattuga - Valeriana Elan"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Valeriana Frost",
                                                                "text": {
                                                                    "it": "Lattuga - Valeriana Frost"
                                                                }
                                                            },
                                                            {
                                                                "value": "Lattuga - Cassandra",
                                                                "text": {
                                                                    "it": "Lattuga - Cassandra"
                                                                }
                                                            },
                                                            {
                                                                "value": "Pomodoro - Perfect peel",
                                                                "text": {
                                                                    "it": "Pomodoro - Perfect peel"
                                                                }
                                                            },
                                                            {
                                                                "value": "Senape Rossa",
                                                                "text": {
                                                                    "it": "Senape Rossa"
                                                                }
                                                            },
                                                            {
                                                                "value": "Girasole",
                                                                "text": {
                                                                    "it": "Girasole"
                                                                }
                                                            },
                                                            {
                                                                "value": "Radish",
                                                                "text": {
                                                                    "it": "Radish"
                                                                }
                                                            },
                                                            {
                                                                "value": "Greenet",
                                                                "text": {
                                                                    "it": "Greenet"
                                                                }
                                                            },
                                                            {
                                                                "value": "Cavolo - Carbage Red",
                                                                "text": {
                                                                    "it": "Cavolo - Carbage Red"
                                                                }
                                                            },
                                                            {
                                                                "value": "Quinoa",
                                                                "text": {
                                                                    "it": "Quinoa"
                                                                }
                                                            },
                                                            {
                                                                "value": "Broccolo - Broccolo calabrese",
                                                                "text": {
                                                                    "it": "Broccolo - Broccolo calabrese"
                                                                }
                                                            },
                                                            {
                                                                "value": "Broccolo - Broccolo raab",
                                                                "text": {
                                                                    "it": "Broccolo - Broccolo raab"
                                                                }
                                                            },
                                                            {
                                                                "value": "Tatsoi - Oriental green tatsoi",
                                                                "text": {
                                                                    "it": "Tatsoi - Oriental green tatsoi"
                                                                }
                                                            },
                                                            {
                                                                "value": "Coriandolo - Coriandolo monogerme",
                                                                "text": {
                                                                    "it": "Coriandolo - Coriandolo monogerme"
                                                                }
                                                            },
                                                            {
                                                                "value": "Bietola - Bietola rhubarb",
                                                                "text": {
                                                                    "it": "Bietola - Bietola rhubarb"
                                                                }
                                                            },
                                                            {
                                                                "value": "Ravanello - Ravanello red coral",
                                                                "text": {
                                                                    "it": "Ravanello - Ravanello red coral"
                                                                }
                                                            },
                                                            {
                                                                "value": "Cavolo - Cavolo viola kohlrabi",
                                                                "text": {
                                                                    "it": "Cavolo - Cavolo viola kohlrabi"
                                                                }
                                                            },
                                                            {
                                                                "value": "Ravanello - Ravanello bianco daikon",
                                                                "text": {
                                                                    "it": "Ravanello - Ravanello bianco daikon"
                                                                }
                                                            },
                                                            {
                                                                "value": "Komatsuna - Oriental red komatsuna",
                                                                "text": {
                                                                    "it": "Komatsuna - Oriental red komatsuna"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "dropdown",
                                                        "name": "Holder",
                                                        "title": "Tipologia supporto",
                                                        "isRequired": true,
                                                        "choices": [
                                                            {
                                                                "value": "Radi",
                                                                "text": "Radi"
                                                            },
                                                            {
                                                                "value": "Medi",
                                                                "text": "Medi"
                                                            },
                                                            {
                                                                "value": "Fitti",
                                                                "text": "Fitti"
                                                            },
                                                            {
                                                                "value": "Griglia",
                                                                "text": "Griglia"
                                                            },
                                                            {
                                                                "value": "Plastic box",
                                                                "text": "Plastic box"
                                                            },
                                                            {
                                                                "value": "Supporto per torba",
                                                                "text": "Supporto per torba"
                                                            },
                                                            {
                                                                "value": "Supporto per unknown",
                                                                "text": "Supporto per unknown"
                                                            },
                                                            {
                                                                "value": "Black box",
                                                                "text": "Black box"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "dropdown",
                                                        "name": "Substrate",
                                                        "title": "Tipologia substrato",
                                                        "isRequired": true,
                                                        "choices": [
                                                            {
                                                                "value": "Lana di roccia",
                                                                "text": "Lana di roccia"
                                                            },
                                                            {
                                                                "value": "Fibra di cocco",
                                                                "text": {
                                                                    "it": "Fibra di cocco"
                                                                }
                                                            },
                                                            {
                                                                "value": "Polimero torba",
                                                                "text": {
                                                                    "it": "Polimero torba"
                                                                }
                                                            },
                                                            {
                                                                "value": "Inseromat 600",
                                                                "text": "Inseromat 600"
                                                            },
                                                            {
                                                                "value": "Inseromat 600 striscioline",
                                                                "text": "Inseromat 600 striscioline"
                                                            },
                                                            {
                                                                "value": "Inseromat 600 bicchierini",
                                                                "text": "Inseromat 600 bicchierini"
                                                            },
                                                            {
                                                                "value": "Growfoam",
                                                                "text": "Growfoam"
                                                            },
                                                            {
                                                                "value": "Torba",
                                                                "text": "Torba"
                                                            },
                                                            {
                                                                "value": "Torba + vermiculite",
                                                                "text": "Torba + vermiculite"
                                                            },
                                                            {
                                                                "value": "Unknown",
                                                                "text": "Unknown"
                                                            },
                                                            {
                                                                "value": "Unknown + Perlite",
                                                                "text": "Unknown + Perlite"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "text",
                                                        "name": "SeedsNumber",
                                                        "title": {
                                                            "it": "Numero semi per singolo substrato"
                                                        },
                                                        "inputType": "number"
                                                    },
                                                    {
                                                        "type": "dropdown",
                                                        "name": "Company",
                                                        "title": {
                                                            "it": "Fornitore semenza"
                                                        },
                                                        "choices": [
                                                            {
                                                                "value": "Franchi",
                                                                "text": {
                                                                    "it": "Franchi"
                                                                }
                                                            },
                                                            {
                                                                "value": "CN Seeds",
                                                                "text": {
                                                                    "it": "CN Seeds"
                                                                }
                                                            },
                                                            {
                                                                "value": "Cora Seeds",
                                                                "text": {
                                                                    "it": "Cora Seeds"
                                                                }
                                                            },
                                                            {
                                                                "value": "Isi",
                                                                "text": {
                                                                    "it": "ISI"
                                                                }
                                                            },
                                                            {
                                                                "value": "Monsanto",
                                                                "text": {
                                                                    "it": "Monsanto"
                                                                }
                                                            },
                                                            {
                                                                "value": "Flower",
                                                                "text": {
                                                                    "it": "Flower"
                                                                }
                                                            },
                                                            {
                                                                "value": "Suba (Ortus)",
                                                                "text": {
                                                                    "it": "Suba (Ortus)"
                                                                }
                                                            },
                                                            {
                                                                "value": "Enza",
                                                                "text": {
                                                                    "it": "Enza"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "text",
                                                        "name": "Refill",
                                                        "title": {
                                                            "it": "Fattore refill"
                                                        },
                                                        "inputType": "number"
                                                    },
                                                    {
                                                        "type": "text",
                                                        "name": "Samplin",
                                                        "title": {
                                                            "it": "Fattore campionamento"
                                                        },
                                                        "inputType": "number"
                                                    },
                                                    {
                                                        "type": "radiogroup",
                                                        "name": "Film",
                                                        "title": {
                                                            "it": "Pellicola in germinazione"
                                                        },
                                                        "choices": [
                                                            {
                                                                "value": "Si",
                                                                "text": {
                                                                    "it": "Si"
                                                                }
                                                            },
                                                            {
                                                                "value": "No",
                                                                "text": {
                                                                    "it": "No"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "text",
                                                        "name": "Note1",
                                                        "title": {
                                                            "it": "Note"
                                                        }
                                                    }
                                                ],
                                                "panelAddText": {
                                                    "it": "Aggiungi esperimento"
                                                },
                                                "panelRemoveText": {
                                                    "it": "Rimuovi esperimento"
                                                }
                                            }
                                        ],
                                        "panelAddText": {
                                            "it": "Aggiungi vasca"
                                        },
                                        "panelRemoveText": {
                                            "it": "Rimuovi vasca"
                                        }
                                    }
                                ],
                                "visibleIf": "{Operation} = 'new'",
                                "title": "Nuovo esperimento"
                            },
                            {
                                "name": "page3",
                                "elements": [
                                    {
                                        "type": "dropdown",
                                        "name": "DrawerID1",
                                        "title": {
                                            "it": "ID cassetto"
                                        },
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "1",
                                                "text": {
                                                    "it": "1"
                                                }
                                            },
                                            {
                                                "value": "2",
                                                "text": {
                                                    "it": "2"
                                                }
                                            },
                                            {
                                                "value": "3",
                                                "text": {
                                                    "it": "3"
                                                }
                                            },
                                            {
                                                "value": "4",
                                                "text": {
                                                    "it": "4"
                                                }
                                            },
                                            {
                                                "value": "5",
                                                "text": {
                                                    "it": "5"
                                                }
                                            },
                                            {
                                                "value": "6",
                                                "text": {
                                                    "it": "6"
                                                }
                                            },
                                            {
                                                "value": "7",
                                                "text": {
                                                    "it": "7"
                                                }
                                            },
                                            {
                                                "value": "8",
                                                "text": {
                                                    "it": "8"
                                                }
                                            },
                                            {
                                                "value": "9",
                                                "text": {
                                                    "it": "9"
                                                }
                                            },
                                            {
                                                "value": "10",
                                                "text": {
                                                    "it": "10"
                                                }
                                            },
                                            {
                                                "value": "11",
                                                "text": {
                                                    "it": "11"
                                                }
                                            },
                                            {
                                                "value": "12",
                                                "text": {
                                                    "it": "12"
                                                }
                                            },
                                            {
                                                "value": "13",
                                                "text": {
                                                    "it": "13"
                                                }
                                            },
                                            {
                                                "value": "14",
                                                "text": {
                                                    "it": "14"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "LightDrawerID",
                                        "title": {
                                            "default": "ID cassetto luce",
                                            "it": "ID pannello LED"
                                        },
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "0",
                                                "text": "0"
                                            },
                                            {
                                                "value": "1",
                                                "text": "1"
                                            },
                                            {
                                                "value": "2",
                                                "text": "2"
                                            },
                                            {
                                                "value": "3",
                                                "text": "3"
                                            },
                                            {
                                                "value": "4",
                                                "text": "4"
                                            },
                                            {
                                                "value": "5",
                                                "text": "5"
                                            },
                                            {
                                                "value": "6",
                                                "text": "6"
                                            },
                                            {
                                                "value": "7",
                                                "text": "7"
                                            },
                                            {
                                                "value": "8",
                                                "text": "8"
                                            },
                                            {
                                                "value": "9",
                                                "text": "9"
                                            },
                                            {
                                                "value": "10",
                                                "text": "10"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "LightHours",
                                        "title": "Ore luce su 24",
                                        "isRequired": true
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "LightSpectrum",
                                        "title": "Spettro",
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "None",
                                                "text": "None"
                                            },
                                            {
                                                "value": "White",
                                                "text": "White"
                                            },
                                            {
                                                "value": "Full White",
                                                "text": "Full White"
                                            },
                                            {
                                                "value": "Purple",
                                                "text": "Purple"
                                            },
                                            {
                                                "value": "Blue",
                                                "text": "Blue"
                                            },
                                            {
                                                "value": "Red",
                                                "text": "Red"
                                            },
                                            {
                                                "value": "Red+Blue",
                                                "text": "Red+Blue"
                                            },
                                            {
                                                "value": "Red+White",
                                                "text": "Red+White"
                                            },
                                            {
                                                "value": "Blue+White",
                                                "text": "Blue+White"
                                            },
                                            {
                                                "value": "Red+Blue+White",
                                                "text": "Red+Blue+White"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "matrixdropdown",
                                        "name": "Intensity",
                                        "title": "Intensità canali",
                                        "columns": [
                                            {
                                                "name": "Par",
                                                "title": {
                                                    "it": "PAR"
                                                },
                                                "cellType": "text"
                                            }
                                        ],
                                        "choices": [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5
                                        ],
                                        "rows": [
                                            "White",
                                            "Red",
                                            "Blue",
                                            "Purple"
                                        ]
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "LedDrawerDistance",
                                        "title": "Distanza cassetto - LED",
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "0 cm",
                                                "text": "0 cm"
                                            },
                                            {
                                                "value": "10 cm",
                                                "text": "10 cm"
                                            },
                                            {
                                                "value": "20 cm",
                                                "text": "20 cm"
                                            },
                                            {
                                                "value": "30 cm",
                                                "text": "30 cm"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "Note2",
                                        "title": {
                                            "it": "Note"
                                        }
                                    }
                                ],
                                "visibleIf": "({Operation} == light)",
                                "title": "Trattamento luce"
                            },
                            {
                                "name": "page4",
                                "elements": [
                                    {
                                        "type": "dropdown",
                                        "name": "DrawerIDs",
                                        "title": {
                                            "it": "ID cassetto"
                                        },
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "1",
                                                "text": {
                                                    "it": "1"
                                                }
                                            },
                                            {
                                                "value": "2",
                                                "text": {
                                                    "it": "2"
                                                }
                                            },
                                            {
                                                "value": "3",
                                                "text": {
                                                    "it": "3"
                                                }
                                            },
                                            {
                                                "value": "4",
                                                "text": {
                                                    "it": "4"
                                                }
                                            },
                                            {
                                                "value": "5",
                                                "text": {
                                                    "it": "5"
                                                }
                                            },
                                            {
                                                "value": "6",
                                                "text": {
                                                    "it": "6"
                                                }
                                            },
                                            {
                                                "value": "7",
                                                "text": {
                                                    "it": "7"
                                                }
                                            },
                                            {
                                                "value": "8",
                                                "text": {
                                                    "it": "8"
                                                }
                                            },
                                            {
                                                "value": "9",
                                                "text": {
                                                    "it": "9"
                                                }
                                            },
                                            {
                                                "value": "10",
                                                "text": {
                                                    "it": "10"
                                                }
                                            },
                                            {
                                                "value": "11",
                                                "text": {
                                                    "it": "11"
                                                }
                                            },
                                            {
                                                "value": "12",
                                                "text": {
                                                    "it": "12"
                                                }
                                            },
                                            {
                                                "value": "13",
                                                "text": {
                                                    "it": "13"
                                                }
                                            },
                                            {
                                                "value": "14",
                                                "text": {
                                                    "it": "14"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "Temperature",
                                        "title": "Temperatura",
                                        "isRequired": true
                                    },
                                    {
                                        "type": "text",
                                        "name": "RelativeHumidity",
                                        "title": "Umidità",
                                        "isRequired": true
                                    },
                                    {
                                        "type": "text",
                                        "name": "Note3",
                                        "title": {
                                            "it": "Note"
                                        }
                                    }
                                ],
                                "visibleIf": "({Operation} == climate)",
                                "title": "Trattamento clima"
                            },
                            {
                                "name": "page7",
                                "elements": [
                                    {
                                        "type": "paneldynamic",
                                        "name": "sampling",
                                        "title": {
                                            "it": "Dettagli campionamento"
                                        },
                                        "templateElements": [
                                            {
                                                "type": "dropdown",
                                                "name": "Type",
                                                "title": {
                                                    "it": "Tipologia campione"
                                                },
                                                "choices": [
                                                    {
                                                        "value": "Singola pianta",
                                                        "text": {
                                                            "it": "Singola pianta"
                                                        }
                                                    },
                                                    {
                                                        "value": "Area",
                                                        "text": {
                                                            "it": "Area"
                                                        }
                                                    },
                                                    {
                                                        "value": "Sfalcio",
                                                        "text": {
                                                            "it": "Sfalcio"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "name": "Germination",
                                                "title": {
                                                    "it": "Percentuale germinazione"
                                                }
                                            },
                                            {
                                                "type": "text",
                                                "name": "Area",
                                                "title": {
                                                    "default": "Area campione",
                                                    "it": "Numero aree campionate"
                                                }
                                            },
                                            {
                                                "type": "text",
                                                "name": "Number",
                                                "title": {
                                                    "default": "Numero piante campione",
                                                    "it": "Numero piante totali"
                                                }
                                            },
                                            {
                                                "type": "text",
                                                "name": "Phi2",
                                                "title": "Phi2"
                                            },
                                            {
                                                "type": "text",
                                                "name": "NPQt",
                                                "title": "NPQt"
                                            },
                                            {
                                                "type": "text",
                                                "name": "FvPFmP",
                                                "title": "FvP/FmP "
                                            },
                                            {
                                                "type": "text",
                                                "name": "LeafTempDifferential",
                                                "title": "Leaf Temperature Differential"
                                            },
                                            {
                                                "type": "text",
                                                "name": "RelativeChlorophyll",
                                                "title": "Relative Chlorophyll"
                                            },
                                            {
                                                "type": "text",
                                                "name": "PlantsHeight",
                                                "title": "Altezza (cm)"
                                            },
                                            {
                                                "type": "text",
                                                "name": "LeavesNumber",
                                                "title": "Numero foglie"
                                            },
                                            {
                                                "type": "text",
                                                "name": "FreshWeight",
                                                "title": "Peso fresco (g)"
                                            },
                                            {
                                                "type": "text",
                                                "name": "StemThickness",
                                                "title": "Spessore gambo (cm)"
                                            },
                                            {
                                                "type": "text",
                                                "name": "Note4",
                                                "title": {
                                                    "it": "Note"
                                                }
                                            }
                                        ],
                                        "panelAddText": {
                                            "it": "Aggiungi campione"
                                        },
                                        "panelRemoveText": {
                                            "it": "Rimuovi campione"
                                        }
                                    }
                                ],
                                "visibleIf": "{Operation} = 'sampling'",
                                "title": "Campionamento"
                            },
                            {
                                "name": "page6",
                                "elements": [
                                    {
                                        "type": "matrixdynamic",
                                        "name": "DrawerIDss",
                                        "title": {
                                            "it": "Cassetti e vasche"
                                        },
                                        "isRequired": true,
                                        "columns": [
                                            {
                                                "name": "Cassetto",
                                                "cellType": "dropdown"
                                            },
                                            {
                                                "name": "Vasca",
                                                "cellType": "checkbox",
                                                "choices": [
                                                    {
                                                        "value": "1",
                                                        "text": {
                                                            "it": "1"
                                                        }
                                                    },
                                                    {
                                                        "value": "2",
                                                        "text": {
                                                            "it": "2"
                                                        }
                                                    },
                                                    {
                                                        "value": "3",
                                                        "text": {
                                                            "it": "3"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "choices": [
                                            {
                                                "value": 1,
                                                "text": {
                                                    "it": "1"
                                                }
                                            },
                                            {
                                                "value": 2,
                                                "text": {
                                                    "it": "2"
                                                }
                                            },
                                            {
                                                "value": 3,
                                                "text": {
                                                    "it": "3"
                                                }
                                            },
                                            {
                                                "value": 4,
                                                "text": {
                                                    "it": "4"
                                                }
                                            },
                                            {
                                                "value": 5,
                                                "text": {
                                                    "it": "5"
                                                }
                                            },
                                            {
                                                "value": "6",
                                                "text": {
                                                    "it": "6"
                                                }
                                            },
                                            {
                                                "value": "7",
                                                "text": {
                                                    "it": "7"
                                                }
                                            },
                                            {
                                                "value": "8",
                                                "text": {
                                                    "it": "8"
                                                }
                                            },
                                            {
                                                "value": "9",
                                                "text": {
                                                    "it": "9"
                                                }
                                            },
                                            {
                                                "value": "10",
                                                "text": {
                                                    "it": "10"
                                                }
                                            },
                                            {
                                                "value": "11",
                                                "text": {
                                                    "it": "11"
                                                }
                                            },
                                            {
                                                "value": "12",
                                                "text": {
                                                    "it": "12"
                                                }
                                            },
                                            {
                                                "value": "13",
                                                "text": {
                                                    "it": "13"
                                                }
                                            },
                                            {
                                                "value": "14",
                                                "text": {
                                                    "it": "14"
                                                }
                                            }
                                        ],
                                        "rowCount": 1,
                                        "addRowText": {
                                            "it": "Aggiungi cassetto"
                                        },
                                        "removeRowText": {
                                            "it": "Rimuovi cassetto"
                                        }
                                    },
                                    {
                                        "type": "text",
                                        "name": "TotalInitialVolume",
                                        "title": "Volume iniziale (L)"
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "SolutionType",
                                        "title": {
                                            "it": "Tipologia nutrienti"
                                        },
                                        "choices": [
                                            {
                                                "value": "Acqua",
                                                "text": {
                                                    "it": "Acqua"
                                                }
                                            },
                                            {
                                                "value": "Hoagland",
                                                "text": {
                                                    "it": "Hoagland"
                                                }
                                            },
                                            {
                                                "value": "Hakapos verde",
                                                "text": {
                                                    "it": "Hakapos verde"
                                                }
                                            },
                                            {
                                                "value": "Baseplant orange",
                                                "text": {
                                                    "it": "Baseplant orange"
                                                }
                                            },
                                            {
                                                "value": "Mirko",
                                                "text": {
                                                    "it": "Mirko"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "NutrientSolution",
                                        "title": "Quantità nutrienti (L)"
                                    },
                                    {
                                        "type": "text",
                                        "name": "Water",
                                        "title": "Volume finale (L)"
                                    },
                                    {
                                        "type": "text",
                                        "name": "InitialEC",
                                        "title": "EC iniziale"
                                    },
                                    {
                                        "type": "text",
                                        "name": "FinalEC",
                                        "title": "EC finale"
                                    },
                                    {
                                        "type": "text",
                                        "name": "InitialpH",
                                        "title": "pH iniziale"
                                    },
                                    {
                                        "type": "text",
                                        "name": "FinalpH",
                                        "title": "pH finale"
                                    },
                                    {
                                        "type": "radiogroup",
                                        "name": "Ozone",
                                        "title": {
                                            "it": "Ozono presente"
                                        },
                                        "choices": [
                                            {
                                                "value": "Si",
                                                "text": {
                                                    "it": "Si"
                                                }
                                            },
                                            {
                                                "value": "No",
                                                "text": {
                                                    "it": "No"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "radiogroup",
                                        "name": "Calcium",
                                        "title": {
                                            "it": "Soluzione Calcio"
                                        },
                                        "choices": [
                                            {
                                                "value": "Si",
                                                "text": {
                                                    "it": "Si"
                                                }
                                            },
                                            {
                                                "value": "No",
                                                "text": {
                                                    "it": "No"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "radiogroup",
                                        "name": "Potassium",
                                        "title": {
                                            "it": "Soluzione Potassio"
                                        },
                                        "choices": [
                                            {
                                                "value": "Si",
                                                "text": {
                                                    "it": "Si"
                                                }
                                            },
                                            {
                                                "value": "No",
                                                "text": {
                                                    "it": "No"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "radiogroup",
                                        "name": "Ammon",
                                        "title": {
                                            "it": "Ammonio Molibdato"
                                        },
                                        "choices": [
                                            {
                                                "value": "Si",
                                                "text": {
                                                    "it": "Si"
                                                }
                                            },
                                            {
                                                "value": "No",
                                                "text": {
                                                    "it": "No"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "Note5",
                                        "title": {
                                            "it": "Note"
                                        }
                                    }
                                ],
                                "visibleIf": "({Operation} == refill)",
                                "title": "Refill"
                            },
                            {
                                "name": "page5",
                                "elements": [
                                    {
                                        "type": "dropdown",
                                        "name": "DrawerIDsss",
                                        "title": {
                                            "it": "ID Cassetto"
                                        },
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "1",
                                                "text": {
                                                    "it": "1"
                                                }
                                            },
                                            {
                                                "value": "2",
                                                "text": {
                                                    "it": "2"
                                                }
                                            },
                                            {
                                                "value": "3",
                                                "text": {
                                                    "it": "3"
                                                }
                                            },
                                            {
                                                "value": "4",
                                                "text": {
                                                    "it": "4"
                                                }
                                            },
                                            {
                                                "value": "5",
                                                "text": {
                                                    "it": "5"
                                                }
                                            },
                                            {
                                                "value": "6",
                                                "text": {
                                                    "it": "6"
                                                }
                                            },
                                            {
                                                "value": "7",
                                                "text": {
                                                    "it": "7"
                                                }
                                            },
                                            {
                                                "value": "8",
                                                "text": {
                                                    "it": "8"
                                                }
                                            },
                                            {
                                                "value": "9",
                                                "text": {
                                                    "it": "9"
                                                }
                                            },
                                            {
                                                "value": "10",
                                                "text": {
                                                    "it": "10"
                                                }
                                            },
                                            {
                                                "value": "11",
                                                "text": {
                                                    "it": "11"
                                                }
                                            },
                                            {
                                                "value": "12",
                                                "text": {
                                                    "it": "12"
                                                }
                                            },
                                            {
                                                "value": "13",
                                                "text": {
                                                    "it": "13"
                                                }
                                            },
                                            {
                                                "value": "14",
                                                "text": {
                                                    "it": "14"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "dropdown",
                                        "name": "TankIDsss",
                                        "title": {
                                            "it": "ID Vasca"
                                        },
                                        "isRequired": true,
                                        "choices": [
                                            {
                                                "value": "1",
                                                "text": {
                                                    "it": "1"
                                                }
                                            },
                                            {
                                                "value": "2",
                                                "text": {
                                                    "it": "2"
                                                }
                                            },
                                            {
                                                "value": "3",
                                                "text": {
                                                    "it": "3"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "type": "text",
                                        "name": "Note6",
                                        "title": {
                                            "it": "Note"
                                        }
                                    }
                                ],
                                "visibleIf": "{Operation} = 'drawer'",
                                "title": {
                                    "it": "Aggiorna cassetto o vasca"
                                }
                            },
                            {
                                "name": "page8",
                                "elements": [
                                    {
                                        "type": "radiogroup",
                                        "name": "question1",
                                        "title": {
                                            "it": "Sicuro di voler concludere l'esperimento?"
                                        },
                                        "choices": [
                                            {
                                                "value": "Si",
                                                "text": {
                                                    "it": "Si"
                                                }
                                            },
                                            {
                                                "value": "No",
                                                "text": {
                                                    "it": "No"
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "visibleIf": "{Operation} = 'close'",
                                "title": {
                                    "it": "Chiusura esperimento"
                                }
                            }
                        ]
                    }
                    var model = new Survey.Model(json);
                    model.onComplete.add(survey => {
                        // var t
                        // if (survey.Operation == "new") {
                        //     t = 0
                        //     survey.Tanks.forEach(function (val) {
                        //         t = t + val.TankID.length
                        //     })
                        // } else if (survey.Operation == "sampling") {
                        //     t = (survey.sampling).length
                        // } else if (survey.Operation == "refill") {
                        //     t = 0
                        //     for (var i = 0; i < survey.DrawerIDss.length; i++) {
                        //         t = t + survey.DrawerIDss[i].Vasca.length
                        //     }
                        // }
                        // setTimeout(function (val) {
                        //     window.location.reload();
                        // }, 1000 * (t + 1))
                        survey = survey.data
                        var rightNow = new Date();
                        if (survey.Operation == "new") {
                            var drawerID = parseInt(survey.DrawerID)
                            survey.Tanks.forEach(function (val) {
                                for (var i = 0; i < val.TankID.length; i++) {
                                    setTimeout(function () {

                                        var tankID = parseInt(val.TankID[i])
                                        val.Experiments.forEach(function (val2) {
                                            var dat = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
                                            var a = val.SolutionQuantity ? parseFloat(val.SolutionQuantity) : 0
                                            var b = val.Waters ? parseFloat(val.Waters) : 0
                                            var expid = dat + "_" + val2.Variety + "_" + val2.Company + "_" + val2.Holder + "_" + val2.Substrate + "_" + val2.SeedsNumber
                                            var exp = {
                                                "ExpID": expid,
                                                "DrawerID": drawerID,
                                                "TankID": tankID,
                                                "Format": val2.Format,
                                                "PlantType": val2.PlantType,
                                                "PlantVariety": val2.Variety,
                                                "Holder": val2.Holder,
                                                "Substrate": val2.Substrate,
                                                "SeedsNumber": val2.SeedsNumber,
                                                "Perlite": val2.Perlite ? val2.Perlite : "No",
                                                "RefillFactor": val2.Refill ? parseInt(val2.Refill) : 0,
                                                "SamplinFactor": val2.Samplin ? parseInt(val2.Samplin) : 0,
                                                "Company": val2.Company,
                                                "Status": "running",
                                                "Light": [{
                                                    "ExpID": expid,
                                                    "LightDrawerID": survey.Panel ? parseInt(survey.Panel) : 0,
                                                    "LightHours": survey.Light ? parseFloat(survey.Light) : 0,
                                                    "LightSpectrum": survey.Spectrum ? survey.Spectrum : "",
                                                    "RedIntensity": survey.Intensitys ? (survey.Intensitys.Red ? parseFloat(survey.Intensitys.Red.Par) : 0) : 0,
                                                    "BlueIntensity": survey.Intensitys ? (survey.Intensitys.Blue ? parseFloat(survey.Intensitys.Blue.Par) : 0) : 0,
                                                    "WhiteIntensity": survey.Intensitys ? (survey.Intensitys.White ? parseFloat(survey.Intensitys.White.Par) : 0) : 0,
                                                    "PurpleIntensity": survey.Intensitys ? (survey.Intensitys.Purple ? parseFloat(survey.Intensitys.Purple.Par) : 0) : 0,
                                                    "LedDrawerDistance": survey.LedDrawerDistances,
                                                    "Timestamp": rightNow
                                                }],
                                                "Climate": [{
                                                    "ExpID": expid,
                                                    "Temperature": parseFloat(survey.Temperatures),
                                                    "RelativeHumidity": parseFloat(survey.Humiditys),
                                                    "Timestamp": rightNow
                                                }],
                                                "Sampling": [],
                                                "Refill": [{
                                                    "ExpID": expid,
                                                    "TotalInitialVolume": 0,
                                                    "SolutionType": val.Solution ? val.Solution : "",
                                                    "NutrientSolution": a,
                                                    "Water": b - a,
                                                    "TotalFinalVolume": b,
                                                    "InitialEC": 0,
                                                    "FinalEC": 0,
                                                    "InitialpH": 0,
                                                    "FinalpH": 0,
                                                    "Ozone": val.Ozon ? val.Ozon : "No",
                                                    "Calcium": val.Calciu ? val.Calciu : "No",
                                                    "Potassium": val.Pota ? val.Pota : "No",
                                                    "Ammonio": val.Ammonio ? val.Ammonio : "No",
                                                    "Timestamp": rightNow
                                                }],
                                                "Position": [{
                                                    "ExpID": expid,
                                                    "DrawerID": drawerID,
                                                    "TankID": tankID,
                                                    "Timestamp": rightNow
                                                }],
                                                "Notes": val2.Note1,
                                                "StartTime": rightNow,
                                                "EndTime": ""
                                            }
                                            me.onoApiService.newSurveyProcess(exp).subscribe(
                                                value => {
                                                })
                                        }, i * 1000)
                                    })

                                }
                            })
                        } else if (survey.Operation == "light") {
                            value.forEach(function (vall) {
                                if (vall.Status == "running" && vall.DrawerID == parseInt(survey.DrawerID1)) {
                                    var light = {
                                        "ExpID": vall.ExpID,
                                        "DrawerID": parseInt(survey.DrawerID1),
                                        "LightDrawerID": parseInt(survey.LightDrawerID),
                                        "LightHours": survey.LightHours ? parseInt(survey.LightHours) : 0,
                                        "LightSpectrum": survey.LightSpectrum ? survey.LightSpectrum : "",
                                        "RedIntensity": survey.Intensity ? (survey.Intensity.Red ? parseFloat(survey.Intensity.Red.Par) : 0) : 0,
                                        "BlueIntensity": survey.Intensity ? (survey.Intensity.Blue ? parseFloat(survey.Intensity.Blue.Par) : 0) : 0,
                                        "WhiteIntensity": survey.Intensity ? (survey.Intensity.White ? parseFloat(survey.Intensity.White.Par) : 0) : 0,
                                        "PurpleIntensity": survey.Intensity ? (survey.Intensity.Purple ? parseFloat(survey.Intensity.Purple.Par) : 0) : 0,
                                        "LedDrawerDistance": survey.LedDrawerDistance,
                                        "Notes": survey.Note2,
                                        "Timestamp": rightNow
                                    }
                                    me.onoApiService.newSurveyLight(light).subscribe(
                                        value => {
                                        }
                                    );
                                }

                            })

                        } else if (survey.Operation == "climate") {
                            value.forEach(function (vall) {
                                if (vall.Status == "running" && vall.DrawerID == parseInt(survey.DrawerIDs)) {
                                    var climate = {
                                        "ExpID": vall.ExpID,
                                        "DrawerID": parseInt(survey.DrawerIDs),
                                        "Temperature": survey.Temperature ? parseFloat(survey.Temperature) : 0,
                                        "RelativeHumidity": survey.RelativeHumidity ? parseFloat(survey.RelativeHumidity) : 0,
                                        "Notes": survey.Note3,
                                        "Timestamp": rightNow
                                    }
                                    me.onoApiService.newSurveyClimate(climate).subscribe(
                                        value => {
                                        }
                                    );
                                }
                            })

                        } else if (survey.Operation == "sampling") {
                            var temp = (survey.ExpID).split(":");
                            var expID = temp[temp.length - 1]
                            survey.sampling.forEach(function (val, i) {
                                setTimeout(function () {
                                    var sampling = {
                                        "ExpID": expID,
                                        "Type": val.Type ? val.Type : "Singola pianta",
                                        "Germination": val.Germination ? parseFloat(val.Germination) : 0,
                                        "Area": val.Area ? parseFloat(val.Area) : 0,
                                        "Number": val.Number ? parseFloat(val.Number) : 1,
                                        "Phi2": val.Phi2 ? parseFloat(val.Phi2) : 0,
                                        "NPQt": val.NPQt ? parseFloat(val.NPQt) : 0,
                                        "FvPFmP": val.FvPFmP ? parseFloat(val.FvPFmP) : 0,
                                        "LeafTempDifferential": val.LeafTempDifferential ? parseFloat(val.LeafTempDifferential) : 0,
                                        "RelativeChlorophyll": val.RelativeChlorophyll ? parseFloat(val.RelativeChlorophyll) : 0,
                                        "PlantsHeight": val.PlantsHeight ? parseFloat(val.PlantsHeight) : 0,
                                        "LeavesNumber": val.LeavesNumber ? parseInt(val.LeavesNumber) : 0,
                                        "FreshWeight": val.FreshWeight ? parseFloat(val.FreshWeight) : 0,
                                        "StemThickness": val.StemThickness ? parseFloat(val.StemThickness) : 0,
                                        "Notes": val.Note4,
                                        "Timestamp": rightNow
                                    }
                                    me.onoApiService.newSurveySampling(sampling).subscribe(
                                        value => {
                                        }
                                    );
                                }, i * 1000)

                            })


                        } else if (survey.Operation == "refill") {
                            var c = 0
                            value.forEach(function (vall) {
                                var count = 0
                                for (var a = 0; a < survey.DrawerIDss.length; a++) {
                                    for (var b = 0; b < survey.DrawerIDss[a].Vasca.length; b++) {
                                        count = count + 1
                                    }
                                }
                                for (var i = 0; i < survey.DrawerIDss.length; i++) {
                                    for (var j = 0; j < survey.DrawerIDss[i].Vasca.length; j++) {
                                        var tankID = parseInt(survey.DrawerIDss[i].Vasca[j])
                                        var drawerID = parseInt(survey.DrawerIDss[i].Cassetto)
                                        if (vall.Status == "running" && vall.DrawerID == drawerID && vall.TankID == tankID) {
                                            me.update(survey, vall, i, j, c, count, rightNow)
                                            c++
                                        }
                                    }
                                }
                            })
                        } else if (survey.Operation == "drawer") {
                            var temp = (survey.ExpID).split(":");
                            var expID = temp[temp.length - 1]
                            var draw = {
                                "ExpID": expID,
                                "DrawerID": parseInt(survey.DrawerIDsss),
                                "TankID": parseInt(survey.TankIDsss),
                                "Notes": survey.Note6,
                                "Timestamp": rightNow
                            }
                            me.onoApiService.newSurveyDrawer(draw).subscribe(
                                value => {
                                }
                            );
                        } else if (survey.Operation == "close") {
                            var expid = survey.ExpID
                            expid = expid.split(":")
                            expid = expid[expid.length - 1]
                            me.onoApiService.newSurveyClose({ "ExpID": expid }).subscribe(
                                value => {
                                }
                            );
                        }
                    })
                    Survey.SurveyNG.render('surveyContainer', { model: model });
                }
            );

    }

    update(survey, vall, i, j, c, count, rightNow) {
        var me = this
        setTimeout(function () {
            var tankID = parseInt(survey.DrawerIDss[i].Vasca[j])
            var drawerID = parseInt(survey.DrawerIDss[i].Cassetto)
            var a = survey.NutrientSolution ? parseFloat(survey.NutrientSolution) : 0
            var b = survey.Water ? parseFloat(survey.Water) : 0
            var refill = {
                "ExpID": vall.ExpID,
                "DrawerID": drawerID,
                "TankID": tankID,
                "TotalInitialVolume": survey.TotalInitialVolume ? parseFloat(survey.TotalInitialVolume) : 0,
                "SolutionType": survey.SolutionType ? survey.SolutionType : "",
                "NutrientSolution": a / count,
                "Water": (b - a) / count,
                "TotalFinalVolume": b / count,
                "InitialEC": survey.InitialEC ? parseFloat(survey.InitialEC) : 0,
                "FinalEC": survey.FinalEC ? parseFloat(survey.FinalEC) : 0,
                "InitialpH": survey.InitialpH ? parseFloat(survey.InitialpH) : 0,
                "FinalpH": survey.FinalpH ? parseFloat(survey.FinalpH) : 0,
                "Ozone": survey.Ozone ? survey.Ozone : "No",
                "Calcium": survey.Calcium ? survey.Calcium : "No",
                "Potassium": survey.Potassium ? survey.Potassium : "No",
                "Ammonio": survey.Ammon ? survey.Ammon : "No",
                "Notes": survey.Note5,
                "Timestamp": rightNow
            }
            me.onoApiService.newSurveyRefill(refill).subscribe(
                value => {
                }
            );

        }, c * 1000)
    }
}