import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  icon(name?: keyof typeof fas | keyof typeof far, type: 'solid' | 'regular' = 'solid'): IconProp {
    switch (type) {
      case 'solid':
        return fas[name || 'faBug'];
      case 'regular':
        return far[name || 'faBug'];
    }
  }
}
