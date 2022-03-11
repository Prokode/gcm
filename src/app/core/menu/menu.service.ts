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
    role: ['ADMIN', 'AGENT', 'ROOT']
  },
  {
    state: '',
    name: 'Vente',
    type: 'sub',
    icon: 'desktop_windows',
    children: [
      {state: '/vente', name: 'Créér'},
      {state: '/vente/current', name: 'Vente en cours'},
    ],
    role: ['ADMIN', 'AGENT', 'ROOT']
  },
  {
    state: 'user',
    name: 'Utilisateur',
    type: 'link',
    icon: 'portrait',
    role: ['ADMIN', 'ROOT']
  },
  {
    state: '',
    name: 'Configurations',
    type: 'sub',
    icon: 'settings_input_composite',
    children: [
      {state: '/poste', name: 'Postes'},
      {state: '/console', name: 'Consoles'},
      {state: '/tarif', name: 'Tarifs'},
      {state: '/licence', name: 'Licence'},
      {state: '/board', name: 'Cartes'},
      {state: '/save-config', name: 'Sauvegarder configuration' }
    ],
    role: ['ADMIN', 'ROOT']
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
    name: 'Rapports',
    type: 'link',
    icon: 'description',
    role: ['ADMIN', 'AGENT', 'ROOT']
  },
  {
    state: '',
    name: 'Paramètres',
    type: 'sub',
    icon: 'settings',
    children: [
      {state: '/password', name: 'Sécurité'},
      {state: '/information', name: 'Profile'},
    ],
    role: ['ADMIN', 'AGENT', 'ROOT']
  },
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    const currentUser: any = JSON.parse(window.localStorage.getItem('gcmUser'));
    // const role = 'ADMIN';
    return MENUITEMS.filter(
      (menu) => {
        if (menu.role) {
          return menu.role.includes(currentUser.role);
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
