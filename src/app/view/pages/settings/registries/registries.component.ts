import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registries',
  templateUrl: './registries.component.html',
  styleUrls: ['./registries.component.scss']
})
export class RegistriesComponent implements OnInit {

  constructor() { }

  BUTTONLIST = [
    {
      id: 1,
      title: 'Farmings',
      icon: 'storefront',
      link: '/settings/registries/farmings'
    },
    {
      id: 2,
      title: 'Plants',
      icon: 'local_florist',
      link: '/settings/registries/plants'
    },
    {
      id: 3,
      title: 'Species',
      icon: 'style',
      link: '/settings/registries/species'
    },
    {
      id: 4,
      title: 'Solutions',
      icon: 'group_work',
      link: '/settings/registries/solutions'
    },
    {
      id: 5,
      title: 'Substrates',
      icon: 'calendar_view_day',
      link: '/settings/registries/substrates'
    },

  ];

  ngOnInit() {

  }

    
    
    
    

}
