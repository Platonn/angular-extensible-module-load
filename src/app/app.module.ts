import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          Promise.all([
            import('./foo.module'),
            import('./bar.module'),
            import('./baz.module'),
            import('./qux.module'),
          ]).then(([foo, bar, baz, qux]) =>
            foo.FooModule.asChild({
              extensions: [
                bar.BarModule,
                baz.BazModule.withConfig(),
                qux.QuxModule,
              ],
            })
          ),
      },
    ]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
