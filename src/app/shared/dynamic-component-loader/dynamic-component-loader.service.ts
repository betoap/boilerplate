import {
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  NgModuleFactoryLoader,
  ViewContainerRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  } from '@angular/core';

import { Observable, throwError as ObservableThrow } from 'rxjs';
import { fromPromise as ObservableFromPromise } from 'rxjs/internal-compatibility';
import { DynamicComponent } from './dynamicComponent.utils';

import { DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_MANIFESTS, DynamicComponentManifest } from './dynamic-component-manifest';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoader {

  private _componentRef: any;

  constructor(
    @Inject(DYNAMIC_COMPONENT_MANIFESTS) private manifests: DynamicComponentManifest[],
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    private _appRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  attach( componentId: string, _element: ViewContainerRef, elementId?: string ) {

    return new Promise(( resolve, reject ) => {
      this
        .getComponentFactory<any>( componentId )
        .subscribe(componentFactory => {
          const ref = _element.createComponent( componentFactory );
          DynamicComponent.addElement( _element, ref, elementId );
          return resolve( { ref, elementId } );
        }, error => {
          return reject( error );
        });
    });
  }

  /** Retrieve a ComponentFactory, based on the specified componentId (defined in the DynamicComponentManifest array). */
  getComponentFactory<T>(componentId: string, injector?: Injector): Observable<ComponentFactory<T>> {
    const [ module, component ] = componentId.split('.');

    const manifest = this.manifests.find( _manifest => {
      const _cp = _manifest.componentsId.findIndex( ( cp ) => cp === component && _manifest.path === module );
      return ( _cp > -1 );
    });

    if (!manifest) {
      return ObservableThrow(`DynamicComponentLoader: Unknown componentId "${componentId}"`);
    }
    if (
      manifest &&
      manifest.hasOwnProperty('componentsId') &&
      manifest.hasOwnProperty('loadChildren') &&
      typeof manifest.loadChildren === 'string'
    ) {
      const p = this.loader.load(manifest.loadChildren)
      .then(ngModuleFactory => {
        const moduleRef = ngModuleFactory.create(injector || this.injector);
        const dynamicComponentType = moduleRef
          .injector
          .get(DYNAMIC_COMPONENT)
          .find( comp => comp.name === component );
        if (!dynamicComponentType) {
          throw new Error(
            `DynamicComponentLoader: Dynamic module for componentId "${componentId}" does not contain DYNAMIC_COMPONENT as a provider.`,
          );
        }
        return moduleRef.componentFactoryResolver.resolveComponentFactory<T>(dynamicComponentType);
      });
      return ObservableFromPromise(p);
    }
    throw new Error(
      `DynamicComponentLoader: Dynamic module for componentId "${componentId}" does not contain DYNAMIC_COMPONENT as a provider.`,
    );
  }

  appendComponentTo(component: any, to: Element, constructorObj?: any) {
    // Create a component reference from the component
    this._componentRef = this._componentFactoryResolver
      .resolveComponentFactory( component )
      .create(this.injector);

    if ( constructorObj ) {
      Object.keys( constructorObj ).forEach( constructorKey => {
        Object.keys(this._componentRef.instance).forEach( key => {
          if ( constructorKey === key ) {
            this._componentRef.instance[ key ] = constructorObj[ constructorKey];
          }
        });
      });
      this._componentRef.instance.cmpRef = this._componentRef;
    }

    // Attach component to the appRef so that it's inside the ng component tree
    this._appRef.attachView( this._componentRef.hostView);

    // Get DOM element from component
    const domElem = ( this._componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    to.appendChild(domElem);

    return { element: domElem, instance: this._componentRef.instance };
  }
}
