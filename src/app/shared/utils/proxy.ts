export class Proxy {
  public static create (scope: any, method: Function, params?: any ): any {
      const aArgs: Array<any> = Array.prototype.slice.call(arguments, 2);
      return function () {
          return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
      };
  }
}
