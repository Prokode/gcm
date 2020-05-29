import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalService } from './local.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LocalService,
    {
      provide: APP_INITIALIZER,
      useFactory: localServiceFactory,
      deps: [
        LocalService
      ],
      multi: true
    },
  ]
})

export class LocalnDetailLoaderModule { }


export function localServiceFactory(localService: LocalService) {
  return () => localService.loadLocalConfigData();
}
