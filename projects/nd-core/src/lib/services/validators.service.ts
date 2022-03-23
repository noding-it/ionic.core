import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {

  constructor() {
  }

  public atLeastOneHasValue = (fields: Array<string>) => {
    return (group: FormGroup) => {
      for (const fieldName of fields) {
        if (group.get(fieldName).value) {
          return null;
        }
      }
      return {externalIDRequired: true};
    };
  };

}
