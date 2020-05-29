import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

// import {PhotoBlockComponent} from './components/photo-block/photo-block.component';
import { MatButtonModule } from '@angular/material';

import { UserResolver } from './user/user.resolver';
import { SocietyResolver } from './user/society.resolver';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    // PhotoBlockComponent,
  ],
  exports: [
    // PhotoBlockComponent,
   ],
  entryComponents: [
   ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    // UserResolver,
    // SocietyResolver
   ]
})
export class SharedModule { }
