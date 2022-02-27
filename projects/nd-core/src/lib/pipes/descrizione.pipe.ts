import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descrizione'
})
export class DescrizionePipe implements PipeTransform {

  transform(lista: any[], search: string, property?: string): any {
    if (lista.length > 0) {
      if (property) {
        return lista.filter(item => item[property].toString().toLowerCase().indexOf(search?.toLowerCase()) > -1);
      } else {
        return lista.filter(item => item?.descrizione.toString().toLowerCase().indexOf(search?.toLowerCase()) > -1);
      }
    } else {
      return lista;
    }
  }

}
