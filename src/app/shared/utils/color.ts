import { String } from './string';

export class Color {

  static hexToRgba( hex, opacity: 1 ): string {
    hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const result =  hex
      ? {
        r: parseInt(hex[1], 16),
        g: parseInt(hex[2], 16),
        b: parseInt(hex[3], 16)
      }
      : null;
    return 'rgba(' + result.r + ',' + result.g + ',' + result.b + ',' + opacity / 100 + ')';
  }

  static rgbToHex( rgb ): string {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4)
      ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
      : null;
  }

  static rgbaToHex (rgba) {
      const parts = rgba.substring(rgba.indexOf('(')).split(','),
          r = parseInt( String.trim(parts[0].substring(1)), 10),
          g = parseInt( String.trim(parts[1]), 10),
          b = parseInt( String.trim(parts[2]), 10),
          a = Number( parseFloat( String.trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2) );
      return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + ( a * 255).toString(16).substring(0, 2));
  }

}
