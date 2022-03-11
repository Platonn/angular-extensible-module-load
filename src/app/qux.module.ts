import { NgModule } from '@angular/core';
import { FOO } from './foo.token';

@NgModule({
  providers: [
    {
      provide: FOO,
      useValue: 'qux',
    },
  ],
})
export class QuxModule {}
