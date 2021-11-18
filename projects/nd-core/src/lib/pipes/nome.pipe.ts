import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nome'
})
export class NomePipe implements PipeTransform {

  transform(lista: any[], search: string): any {
    if (lista.length > 0) {
      return lista.filter(item => item?.nome.toString().toLowerCase().indexOf(search.toLowerCase()) > -1);
    } else {
      return lista;
    }

  }

}
