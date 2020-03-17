export interface Setting {
    type?: string;
    name?: string;
    fontSize: number;
    fontType: string;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Daltonism
}

