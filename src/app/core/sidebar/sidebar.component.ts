import { Component } from '@angular/core';
import { IpcService } from '../../shared/ipc/ipc.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private readonly _ipc: IpcService) {}
  restart() {
    this._ipc.send('reload_app');
  }
}
