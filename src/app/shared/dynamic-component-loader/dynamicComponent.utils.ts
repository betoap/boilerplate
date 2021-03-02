import { ViewContainerRef } from '@angular/core';

export class DynamicComponent {

  public static getComponents( routes: Array<any> ): Array<any> {
    return routes.filter (
      ( route ) =>  route.hasOwnProperty('componentsId')
    );
  }

  public static addElement( element: ViewContainerRef, component, componentId?: any): void {
    if ( componentId && ! component.location.nativeElement.hasOwnProperty('id') ) {
      component.location.nativeElement.setAttribute('id', componentId);
      component.location.nativeElement.setAttribute('name', componentId);
    }
    // component.changeDetectorRef.detectChanges();
    element.element.nativeElement.appendChild(component.location.nativeElement);
  }

}
