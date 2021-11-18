import {Injectable, RendererFactory2, Renderer2, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import * as Color from 'color';

const themes = {
    blueDark: {
        primary: '#0b3c5d',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#a0d4ad',
        success: '#0a3552',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    blueLight: {
        primary: '#46c6f3',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#033e11',
        success: '#3eaed6',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    blue: {
        primary: '#4585f6',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#a0d4ad',
        success: '#3d75d8',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    brown: {
        primary: '#72564a',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#ddb600',
        success: '#644c41',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    dark: {
        primary: '#1e1f24',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#ddb600',
        success: '#1a1b20',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    gray: {
        primary: '#9e9e9e',
        secondary: '#3dc2ff',
        tertiary: '#1e1f24',
        quaternary: '#a0d4ad',
        success: '#8b8b8b',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    greenDark: {
        primary: '#033e11',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#46c6f3',
        success: '#03370f',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    greenLight: {
        primary: '#a0d4ad',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#0b3c5d',
        success: '#8dbb98',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    green: {
        primary: '#2ecc71',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#0b3c5d',
        success: '#28b463',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    light: {
        primary: '#ccc2c2',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#a0d4ad',
        success: '#b4abab',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    orange: {
        primary: '#ea654f',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#ddb600',
        success: '#ce5946',
        warning: '#ddb600',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    redDark: {
        primary: '#98290e',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#46c6f3',
        success: '#86240c',
        warning: '#ddb600',
        danger: '#ea654f',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    redLight: {
        primary: '#ff6b6b',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#0b3c5d',
        success: '#e05e5e',
        warning: '#ddb600',
        danger: '#ea654f',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    red: {
        primary: '#e30025',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#0b3c5d',
        success: '#c80021',
        warning: '#ddb600',
        danger: '#ea654f',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    yellow: {
        primary: '#e8bf00',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#a0d4ad',
        success: '#c2a000',
        warning: '#ea654f',
        danger: '#e30025',
        dark: '#1e1f24',
        medium: '#92949c',
        light: '#ccc2c2'
    },
    upThere: {
        primary: '#048e8a'
    }

};

const contrastThemes = {
    blueDark: '#ffffff',
    blueLight: '#ffffff',
    blue: '#ffffff',
    brown: '#ffffff',
    dark: '#ffffff',
    gray: '#ffffff',
    greenDark: '#ffffff',
    greenLight: '#ffffff',
    green: '#ffffff',
    light: '#ffffff',
    orange: '#ffffff',
    redDark: '#ffffff',
    redLight: '#ffffff',
    red: '#ffffff',
    yellow: '#ffffff',
};

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private renderer: Renderer2;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    private _defaults = {
        primary: '#3880ff',
        secondary: '#3dc2ff',
        tertiary: '#949494',
        quaternary: '#949494',
        success: '#2dd36f',
        warning: '#ffc409',
        danger: '#eb445a',
        dark: '#222428',
        medium: '#92949c',
        light: '#f4f5f8'
    };

    private _contrast(color): any {
        // return Color(color).isDark() ? Color.rgb(255, 255, 255) : Color.rgb(0, 0, 0);
        return Color(contrastThemes[color]);
    }

    public contrastReal(color: string): any {
        return Color(color).isDark() ? Color.rgb(255, 255, 255) : Color.rgb(0, 0, 0);
    }

    private _setGlobalCSS(css: string): void {
        this.document.documentElement.style.cssText = css;
    }

    private _cSSTextGenerator(colors, theme): string {
        colors = {...this._defaults, ...colors};

        const {
            primary,
            secondary,
            tertiary,
            quaternary,
            success,
            warning,
            danger,
            dark,
            medium,
            light
        } = colors;

        const shadeRatio = 0.1;
        const tintRatio = 0.1;

        return `
            --ion-color-primary: ${primary};
            --ion-color-primary-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-primary-contrast: ${this._contrast(theme)};
            --ion-color-primary-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
            --ion-color-primary-tint:  ${Color(primary).darken(tintRatio)};

            --ion-color-secondary: ${secondary};
            --ion-color-secondary-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-secondary-contrast: ${this._contrast(theme)};
            --ion-color-secondary-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
            --ion-color-secondary-tint:  ${Color(secondary).darken(tintRatio)};

            --ion-color-tertiary: ${tertiary};
            --ion-color-tertiary-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-tertiary-contrast: ${this._contrast(theme)};
            --ion-color-tertiary-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-tertiary-shade:  ${Color(tertiary).darken(shadeRatio)};
            --ion-color-tertiary-tint:  ${Color(tertiary).darken(tintRatio)};

            --ion-color-quaternary: ${quaternary};
            --ion-color-quaternary-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-quaternary-contrast: ${this._contrast(theme)};
            --ion-color-quaternary-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-quaternary-shade:  ${Color(quaternary).darken(shadeRatio)};
            --ion-color-quaternary-tint:  ${Color(quaternary).darken(tintRatio)};

            --ion-color-success: ${success};
            --ion-color-success-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-success-contrast: ${this._contrast(theme)};
            --ion-color-success-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-success-shade:  ${Color(success).darken(shadeRatio)};
            --ion-color-success-tint:  ${Color(success).darken(tintRatio)};

            --ion-color-warning: ${warning};
            --ion-color-warning-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-warning-contrast: ${this._contrast(theme)};
            --ion-color-warning-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-warning-shade:  ${Color(warning).darken(shadeRatio)};
            --ion-color-warning-tint:  ${Color(warning).darken(tintRatio)};

            --ion-color-danger: ${danger};
            --ion-color-danger-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-danger-contrast: ${this._contrast(theme)};
            --ion-color-danger-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-danger-shade:  ${Color(danger).darken(shadeRatio)};
            --ion-color-danger-tint:  ${Color(danger).darken(tintRatio)};

            --ion-color-dark: ${dark};
            --ion-color-dark-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-dark-contrast: ${this._contrast(theme)};
            --ion-color-dark-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-dark-shade:  ${Color(dark).darken(shadeRatio)};
            --ion-color-dark-tint:  ${Color(dark).darken(tintRatio)};

            --ion-color-medium: ${medium};
            --ion-color-medium-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-medium-contrast: ${this._contrast(theme)};
            --ion-color-medium-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-medium-shade:  ${Color(medium).darken(shadeRatio)};
            --ion-color-medium-tint:  ${Color(medium).darken(tintRatio)};

            --ion-color-light: ${light};
            --ion-color-light-rgb: ${(this._contrast(theme)).rgb().array().join(',')};
            --ion-color-light-contrast: ${this._contrast(theme)};
            --ion-color-light-contrast-rgb: ${this._contrast(theme).rgb().array().join(',')};
            --ion-color-light-shade:  ${Color(light).darken(shadeRatio)};
            --ion-color-light-tint:  ${Color(light).darken(tintRatio)};
        `;
    }

    private _cSSVariableTextGenerator(variable: string, color: string): Array<{ name: string, value: string }> {

        const shadeRatio = 0.1;
        const tintRatio = 0.1;

        return [
            {name: `--ion-color-${variable}`, value: color},
            {name: `--ion-color-${variable}-rgb`, value: Color(color).rgb().array().join(',')},
            {name: `--ion-color-${variable}-contrast`, value: this._contrast(color).hex()},
            {name: `--ion-color-${variable}-contrast-rgb`, value: this._contrast(color).rgb().array().join(',')},
            {name: `--ion-color-${variable}-shade`, value: Color(color).darken(shadeRatio).hex()},
            {name: `--ion-color-${variable}-tint`, value: Color(color).lighten(tintRatio).hex()}
        ];
    }

    public setFolderClass(folderID, color): void {
        const folderClass = `
            #folderCard${folderID}{ background-color: ${color};}
            #folderCard${folderID}:before, #fileCard${folderID} span{ background-color: ${Color(color).lighten(0.2).hex()};}
            #folderCard${folderID}:after{ border-bottom-color: ${Color(color).lighten(0.2).hex()};}
            #folderCard${folderID} span{color: ${this.contrastReal(color).hex()};}
            #folderCard${folderID} i{color: ${Color(color).lighten(0.2).hex()};}
        `;
        const sheet = document.createElement('style');
        sheet.innerHTML = folderClass;
        document.body.appendChild(sheet);
    }

    // Override all global variables with a new theme
    public setTheme(theme) {
        const cssText = this._cSSTextGenerator(themes[theme], theme);
        this._setGlobalCSS(cssText);
    }

    // Define a single CSS variable
    public setVariable(name, value): void {
        const cssVariableTextArray = this._cSSVariableTextGenerator(name, value);
        cssVariableTextArray.forEach(item => {
            this.document.documentElement.style.setProperty(item.name, item.value);
        });
    }

    // Set an animation delay in seconds if you have set animate__animated class
    setAnimationDelay(sequence: number, multiplier: number): any {
        return {
            'animation-delay': `${sequence * multiplier}s`,
        };
    }
}
