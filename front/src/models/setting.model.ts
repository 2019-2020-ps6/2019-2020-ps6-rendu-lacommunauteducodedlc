export interface Setting {
    type?: string;
    name?: string;

    fontSizeText: String;
    fontSizeSubtitle: String;
    fontSizeTitle: String;
    fontSizeSubtext: String;
    fontSizeButton: String;
    selectorSize: String;
    radioRadius: String;

//taille de bouton
//input size
//couleur des selector / saisie de texte

    fontStyle: String;

    colorBackground: String;
    colorHeader: String;
    colorYes: String;
    colorNo: String;
    colorButton: String;
    colorCard: String;

    questionNumber: number;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Hyperopia,
    Daltonism
}

