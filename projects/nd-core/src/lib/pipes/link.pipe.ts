import { Pipe, PipeTransform } from '@angular/core';
import Autolinker, { AutolinkerConfig } from 'autolinker';

@Pipe({ name: 'link' })

export class LinkPipe implements PipeTransform {
    transform(value: string, options?: AutolinkerConfig): string {
        return Autolinker.link(value, options);
    }
}
