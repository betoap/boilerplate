export class Date {

  public static formatDate(date){
    return `${date.substr(0, 10).split('-').reverse().join('/')}`;
  }

  public static formatDateHour(date){
    return `${date.substr(0, 10).split('-').reverse().join('/')} ${date.substr(11, 8)}`;
  }

}
