export interface Setting {
    type?: string;
    name?: string;
    fontSize: String;
    fontType?: string;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Daltonism
}

