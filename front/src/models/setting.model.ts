export interface Setting {
    id?: number;
    name?: string;

    fontSizeText: String;
    fontSizeSubtitle: String;
    fontSizeTitle: String;
    fontSizeSubtext: String;
    fontSizeButton: String;
    selectorSize: String;
    radioRadius: String;
    scrollSize: String;

    fontStyle: String;

    colorBackground: String;
    colorHeader: String;
    colorYes: String;
    colorNo: String;
    colorButton: String;
    colorCard: String;
    colorScroll: String;

    questionNumber: number;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Hyperopia,
    Daltonism
}

