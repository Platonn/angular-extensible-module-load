import { ModuleWithProviders, NgModule } from '@angular/core';
import { FOO } from './foo.token';

@NgModule()
export class BazModule {
  static withConfig(): ModuleWithProviders<BazModule> {
    return {
      ngModule: BazModule,
      providers: [
        {
          provide: FOO,
          useValue: 'baz',
        },
      ],
    };
  }
}
