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
  role?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'Accueil',
    type: 'link',
    icon: 'home'
  },
  {
    state: 'poste',
    name: 'Postes',
    type: 'link',
    icon: 'desktop_windows'
  },
  {
    state: 'tarif',
    name: 'Tarifs',
    type: 'link',
    icon: 'attach_money'
  },
  {
    state: 'console',
    name: 'Console',
    type: 'link',
    icon: 'games'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
