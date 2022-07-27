import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {

  constructor() {
  }

  public atLeastOneHasValue = (fields: Array<string>) => {
    return (group: any) => {
      for (const fieldName of fields) {
        if (group.get(fieldName).value) {
          return null;
        }
      }
      return {externalIDRequired: true};
    };
  };

}
