export interface Setting {
    type?: string;
    name?: string;

    fontSizeText: String;
    fontSizeSubtitle: String;
    fontSizeTitle: String;
    fontSizeButton: String;
    selectorSize: String;

//taille de bouton
//couleur des cartes
//input size
//couleur des selector / saisie de texte

    fontStyle: String;

    colorBackground: String;
    colorHeader: String;
    colorYes: String;
    colorNo: String;
    colorButton: String;
    colorCard: String;
}

export enum SettingType {
    Myopia,
    Astigmatism,
    Presbyopia,
    Hyperopia,
    Daltonism
}

