export interface Setting {
    type?: string;
    name?: string;

    fontSizeText: String;
    fontSizeSubtitle: String;
    fontSizeTitle: String;
    fontSizeButton: String;
    selectorSize: String;

    fontStyle: String;

    colorBackground: String;
    colorHeader: String;
    colorYes: String;
    colorNo: String;
    colorButton: String;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Hyperopia,
    Daltonism
}

