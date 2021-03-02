export class String {

  public static trim (str) {
    return str.replace(/^\s+|\s+$/gm, '');
  }

}

if ( ! String.prototype.hasOwnProperty('replaceAll')  ) {
  String.prototype['replaceAll'] = function(str1, str2, ignore) {
    return this
    .replace(
      new RegExp(
        str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'),
        (ignore ? 'gi' : 'g')), (typeof(str2) === 'string')
        ? str2.replace(/\$/g , '$$$$')
        : str2);
  };
}
