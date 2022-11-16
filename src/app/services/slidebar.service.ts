import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlidebarService {

  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'candidat',
      icon: 'fa fa-user fa-2x',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'candidats',
          // badge: {
          //   text: 'Pro ',
          //   class: 'badge-success'
          // }
        },
        {
          title: 'dossiers'
        },
        {
          title: 'Dashboard 3'
        }
      ]
    },
    {
      title: 'Cours théoriques',
      icon: 'fa fa-book fa-2x',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'liste des cours',
        },
        {
          title: 'Ajouter un cours'
        },
        {
          title: 'liste des profs'
        },
        {
          title: 'Ajouter un prof'
        },
      ]
    }
    // {
    //   title: 'Components',
    //   icon: 'far fa-gem',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'General',
    //     },
    //     {
    //       title: 'Panels'
    //     },
    //     {
    //       title: 'Tables'
    //     },
    //     {
    //       title: 'Icons'
    //     },
    //     {
    //       title: 'Forms'
    //     }
    //   ]
    // },
    // {
    //   title: 'Charts',
    //   icon: 'fa fa-chart-line',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Pie chart',
    //     },
    //     {
    //       title: 'Line chart'
    //     },
    //     {
    //       title: 'Bar chart'
    //     },
    //     {
    //       title: 'Histogram'
    //     }
    //   ]
    // },
    // {
    //   title: 'Maps',
    //   icon: 'fa fa-globe',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Google maps',
    //     },
    //     {
    //       title: 'Open street map'
    //     }
    //   ]
    // },
    // {
    //   title: 'Extra',
    //   type: 'header'
    // },
    // {
    //   title: 'Documentation',
    //   icon: 'fa fa-book',
    //   active: false,
    //   type: 'simple',
    //   badge: {
    //     text: 'Beta',
    //     class: 'badge-primary'
    //   },
    // },
    // {
    //   title: 'Calendar',
    //   icon: 'fa fa-calendar',
    //   active: false,
    //   type: 'simple'
    // },
    // {
    //   title: 'Examples',
    //   icon: 'fa fa-folder',
    //   active: false,
    //   type: 'simple'
    // }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
