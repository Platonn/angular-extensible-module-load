import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarModule } from './bar.module';
import { BazModule } from './baz.module';
import { FooModule } from './foo.module';
import { FOO } from './foo.token';
import { QuxModule } from './qux.module';

@Component({
  selector: 'app-foo',
  template: '{{ foo | json }} works!',
})
export class TestComponent {
  constructor(@Inject(FOO) public readonly foo: string) {}
}

@NgModule({
  imports: [
    FooModule.withOptions(),
    BarModule,
    BazModule.withConfig(),
    QuxModule,

    RouterModule.forChild([
      {
        path: '',
        component: TestComponent,
      },
    ]),
    CommonModule,
  ],
  declarations: [TestComponent],
})
export class WrapperModule {}
