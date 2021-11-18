import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyextension'
})
export class OnlyExtensionPipe implements PipeTransform {

    transform(value: string): any {
        if (value === undefined || value === null) {
            return '';
        } else if (value.indexOf('.') === -1){
            return value;
        }
        const splitString = value.split('.');
/*        splitString.splice(splitString.length + 1, -1);*/
        return splitString[splitString.length - 1];
    }

}
