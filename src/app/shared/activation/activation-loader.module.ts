import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {ActivationService} from './activation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ActivationService,
    {
      provide: APP_INITIALIZER,
      useFactory: activationServiceFactory,
      deps: [
        ActivationService
      ],
      multi: true
    },
  ]
})
export class ActivationDetailLoaderModule { }


export function activationServiceFactory(activationService: ActivationService) {
  return () => activationService.loadActivationData();
}
