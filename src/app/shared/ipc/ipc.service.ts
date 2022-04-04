import { IpcRenderer } from 'electron';
import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
@Injectable()
export class IpcService {

  public logOutSubject: Subject<any> = new Subject<any>();

  private _ipc: IpcRenderer | undefined;

  constructor() {
    if (window.require) {
        try {
          this._ipc = window.require('electron').ipcRenderer;
        } catch (e) {
          throw e;
        }
    } else {
        console.warn('Electron\'s IPC was not loaded');
    }
  }

  public on(channel: string, listener: Function): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
  }


}
