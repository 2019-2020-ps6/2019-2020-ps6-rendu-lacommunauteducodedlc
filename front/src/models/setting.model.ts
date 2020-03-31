export interface Setting {
    type?: string;
    name?: string;
    fontSizeText: String;
    fontSizeSubtitle: String;
    fontSizeTitle: String;
    fontSizeButton: String;
    fontType?: string;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Hyperopia,
    Daltonism
}

