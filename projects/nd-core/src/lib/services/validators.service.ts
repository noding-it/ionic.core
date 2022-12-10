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
        // @ts-ignore
        if (group.get(fieldName).value) {
          return null;
        }
      }
      return {externalIDRequired: true};
    };
  };

  public latterIsRequiredOnlyIfFormer = (former: string, ...latter: string[]) => {
    return (group: FormGroup) => {
      if (!group.get(former)?.value) {
        return null
      } else {
        if (latter.reduce((invalid, fieldName) => !invalid || !group.get(fieldName)?.value, false)) {
          return {formerWithoutLatter: true}
        } else {
          return null
        }
      }
    }
  }

  public toggleRequiredFields = (toggle: string, ifTrue: Array<string> | string, ifFalse: Array<string> | string) => {
    return (group: FormGroup) => {
      if (group.get(toggle)?.value) {
        if ((Array.isArray(ifTrue) && ifTrue.reduce((invalid, fieldName) => !invalid || !group.get(fieldName)?.value, false)) || !ifTrue) {
          return {trueFieldsRequired: true}
        } else{
          return null
        }
      } else {
        if ((Array.isArray(ifFalse) && ifFalse.reduce((invalid, fieldName) => !invalid || !group.get(fieldName)?.value, false)) || !ifFalse) {
          return {falseFieldsRequired: true}
        } else {
          return null
        }
      }
    }
  }
}
