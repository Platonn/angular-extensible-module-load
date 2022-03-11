import {
  createNgModuleRef,
  Injector,
  ModuleWithProviders,
  NgModuleFactory,
  NgModuleRef,
  StaticProvider,
  Type,
} from '@angular/core';

export class ExtensibleModuleFactory<T> extends NgModuleFactory<T> {
  get moduleType(): Type<T> {
    return this.moduleWithProviders.ngModule;
  }

  constructor(
    private moduleWithProviders: ModuleWithProviders<T>,
    private moduleExtensions: (Type<any> | ModuleWithProviders<T>)[] = []
  ) {
    super();
  }

  create(parentInjector: Injector | null): NgModuleRef<any> {
    const ngModuleOrModuleWithProviders = [
      ...this.moduleExtensions,
      this.moduleType,
    ];

    let moduleRef: NgModuleRef<any>;
    let injector = Injector.create({
      parent: parentInjector || Injector.NULL,
      providers: getStaticProviders(this.moduleWithProviders),
    });

    do {
      const moduleWithProviders = convertToModuleWithProviders(
        ngModuleOrModuleWithProviders.shift()!
      );
      injector = Injector.create({
        parent: injector,
        providers: getStaticProviders(moduleWithProviders),
      });

      moduleRef = createNgModuleRef(moduleWithProviders.ngModule, injector);
      injector = moduleRef.injector;
    } while (ngModuleOrModuleWithProviders.length > 0);

    return moduleRef;
  }
}

function getStaticProviders<T>(
  ngModuleOrModuleWithProvider: ModuleWithProviders<T>
): StaticProvider[] {
  return (ngModuleOrModuleWithProvider.providers as StaticProvider[]) || [];
}

function convertToModuleWithProviders<T>(
  ngModuleOrModuleWithProvider: ModuleWithProviders<T> | Type<T>
): ModuleWithProviders<T> {
  return 'ngModule' in ngModuleOrModuleWithProvider
    ? ngModuleOrModuleWithProvider
    : { ngModule: ngModuleOrModuleWithProvider };
}
