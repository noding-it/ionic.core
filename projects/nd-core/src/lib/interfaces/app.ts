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
  id_fornitore?: number;
  id_agente?: number;
  nomeCliente?: string;
  nomeFornitore?: string;
  nomeAgente?: string;
  dataRegistrazione?: string;
  nomeUtente?: string;
  link?: string;
  propicIdStorage?: string; // TODO valutare se deprecare
  propicLink?: string;
  urlFirma?: string;
  referralLink?: string;
  referredLink?: string;
  booleanCargo: boolean;
  displayName: string;
  parentUsername?: string;
  percentualeProfilo?: number;
  idStorageFirma?: string;
  '4rya': boolean;
  '4rya_id': string;
  '4rya_pk': string;
}
