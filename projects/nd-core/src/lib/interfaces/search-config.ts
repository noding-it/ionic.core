export interface SearchConfig {
    title: string;
    labelDesc: string;
    listProcess: string;
    labelSearch?: string;
    searchOnStartup?: boolean;
    customAdditionalsParams?: string;
    searchDebounce?: number;
    multiSelect?: boolean;
    removeToken?: boolean;
}
