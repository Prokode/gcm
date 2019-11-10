import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  role?: string[];
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: '/',
    name: 'Accueil',
    type: 'link',
    icon: 'home',
    role: ['ADMIN', 'AGENT']
  },
  {
    state: 'vente',
    name: 'Vente',
    type: 'link',
    icon: 'desktop_windows',
    role: ['ADMIN', 'AGENT']
  },
  {
    state: 'user',
    name: 'Utilisateur',
    type: 'link',
    icon: 'portrait',
    role: ['ADMIN']
  },
  {
    state: '',
    name: 'Paramètres',
    type: 'sub',
    icon: 'settings',
    children: [
      {state: 'poste', name: 'Postes'},
      {state: 'console', name: 'Consoles'},
      {state: 'tarif', name: 'Tarifs'},
    ],
    role: ['ADMIN']
  },
  // {
  //   state: 'poste',
  //   name: 'Postes',
  //   type: 'link',
  //   icon: 'desktop_windows',
  //   role: ['ADMIN']
  // },
  // {
  //   state: 'tarif',
  //   name: 'Tarifs',
  //   type: 'link',
  //   icon: 'attach_money',
  //   role: ['ADMIN']
  // },
  // {
  //   state: 'console',
  //   name: 'Console',
  //   type: 'link',
  //   icon: 'games',
  //   role: ['ADMIN']
  // },

  {
    state: 'raport',
    name: 'Raport',
    type: 'link',
    icon: 'games',
    role: ['ADMIN']
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    const currentUser: any = JSON.parse(window.localStorage.getItem('gcmUser'));
    const role = 'ADMIN';
    return MENUITEMS.filter(
      (menu) => {
        if (menu.role) {
          return menu.role.includes(role);
        } else {
          return menu;
        }
      }
    );
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
