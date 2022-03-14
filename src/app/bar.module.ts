import { NgModule } from '@angular/core';
import { FOO } from './foo.token';

@NgModule({
  providers: [
    {
      provide: FOO,
      useValue: 'bar',
      multi: true,
    },
  ],
})
export class BarModule {}
