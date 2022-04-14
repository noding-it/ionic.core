export interface AppConfig {
    user: Utente;
    logged: boolean;
    settings: Impostazione[];
    ruotes: Ruote[];
    appPages: Modulo[];
    language?: string;
}

export interface Modulo {
  id: number;
  title: string;
  url: string;
  icon: string;
  color: string;
  mobile: boolean;
  subMenu: Modulo[];
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

export interface Utente {
  cod_u: number;
  username: string;
  email: string;
  cellulare: string;
  nome: string;
  cognome: string;
  nomeCompleto?: string;
  password?: string;
  tipo: number;
  ruolo?: number;
  nomeRuolo?: string;
  ruolodescrizione?: string;
  stato?: number;
  statodescrizione?: string;
  id_acquirente?: number;
  //
  id_cliente?: number;
  nomeCliente?: string;
  id_fornitore?: number;
  nomeFornitore?: string;
  id_agente?: number;
  nomeAgente?: string;
  dataRegistrazione?: string;
  nomeUtente?: string;
  link?: string;
  propicLink?: string;
  urlFirma?: string;
  referralLink?: string;
  referredLink?: string;
  booleanCargo: boolean;
  displayName: string;
  parentUsername?: string;
  percentualeProfilo?: number;
  '4rya': boolean;
  '4rya_id': string;
  '4rya_pk': string;
}
