export interface AppConfig {
    user: any;
    logged: boolean;
    settings: Impostazione[];
    ruotes: Ruote[];
    appPages: any[];
}


export interface Impostazione {
    id: number;
    descrizione: string;
    valore: string;
}

export interface Ruote {
    color?: string;
    guards?: string;
    icon: string;
    id_modulo: number;
    import: string;
    menu: boolean;
    dashboard: boolean;
    module: string;
    parent_path?: string;
    path: string;
    path_menu?: string;
    title?: string;
}
