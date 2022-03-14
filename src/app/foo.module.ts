import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExtensibleModuleFactory } from './extensible-module-factory';
import { FOO } from './foo.token';

@Component({
  selector: 'app-foo',
  template: '{{ foo | json }} works!',
})
export class FooComponent {
  constructor(@Inject(FOO) public readonly foo: string) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FooComponent,
      },
    ]),
  ],
  declarations: [FooComponent],
  exports: [FooComponent],
})
export class FooModule {
  static withOptions({ foo = 'foo' } = {}): ModuleWithProviders<FooModule> {
    return {
      ngModule: FooModule,
      providers: [
        {
          provide: FOO,
          useValue: foo,
          multi: true,
        },
      ],
    };
  }

  static asChild({ options = [], extensions = [] }: FooModuleOptions = {}) {
    return new ExtensibleModuleFactory(
      FooModule.withOptions(...options),
      extensions
    );
  }
}

export interface FooModuleOptions {
  options?: Parameters<typeof FooModule.withOptions>;
  extensions?: (Type<any> | ModuleWithProviders<any>)[];
}
