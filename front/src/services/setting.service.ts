import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Setting } from '../models/setting.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {subscribeToIterable} from 'rxjs/internal-compatibility';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  }),
  responseType: 'blob' as 'json'
};

@Injectable({
  providedIn: 'root'
})

export class SettingService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private setting : Setting;

 // private url = 'http://localhost:9428/api';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public settings$: BehaviorSubject<Setting> = new BehaviorSubject(this.setting);

  constructor(private httpClient: HttpClient) {
    this.setting = {fontSizeText : "font-size-basic-text",
                    fontSizeSubtitle : "font-size-basic-subtitle",
                    fontSizeTitle : "font-size-basic-title",
                    fontSizeSubtext: "font-size-basic-subtext",
                    fontSizeButton : "font-size-basic-button",
                    fontStyle : "font-style-basic",
                    colorBackground : "color-basic-background",
                    colorHeader : "color-basic-header",
                    colorYes : "color-basic-yes",
                    colorNo : "color-basic-no",
                    colorButton : "color-basic-button",
                    colorCard : "color-basic-card",
                    selectorSize : "font-size-basic-selector",
                    radioRadius: "font-size-basic-radio",
                    questionNumber: 6,
                  };
    this.updateSettings(this.setting);
  }

  updateSettings(setting: Setting) {
    this.settings$.next(this.setting);
  }

  //argument : font-size-laMaladie
  changeFontSize(fontSize: String){

    let fontText:String = fontSize+"-text";
    let fontSubtitle:String = fontSize+"-subtitle";
    let fontTitle:String = fontSize+"-title";
    let fontSubtext:String = fontSize+"-subtext";
    let fontButton:String = fontSize+"-button";
    let fontSelector:String = fontSize+"-selector";
    let fontRadio:String = fontSize+"-radio";

    this.setting.fontSizeText = fontText;
    this.setting.fontSizeSubtitle = fontSubtitle;
    this.setting.fontSizeTitle = fontTitle;
    this.setting.fontSizeSubtext = fontSubtext;

    this.setting.fontSizeButton = fontButton;
    this.setting.radioRadius = fontRadio;
    this.setting.selectorSize = fontSelector;

    this.updateSettings(this.setting);
  }

  changeFontStyle(fontStyle : String) {
    this.setting.fontStyle = fontStyle;
    this.updateSettings(this.setting);
  }

  //argument : color-laMaladie
  changeColors(color: String){

    let colorBackground:String = color+"-background";
    let colorHeader:String = color+"-header";
    let colorYes:String = color+"-yes";
    let colorNo:String = color+"-no";
    let colorButton:String = color+"-button";
    let colorCard:String = color+"-card";

    this.setting.colorBackground = colorBackground;
    this.setting.colorHeader = colorHeader;
    this.setting.colorYes = colorYes;
    this.setting.colorNo = colorNo;
    this.setting.colorButton = colorButton;
    this.setting.colorCard = colorCard;

    this.updateSettings(this.setting);
  }

  setQuestionNumber(number: number) {
    this.setting.questionNumber = number;
  }

  public getQuestionNumber() {
    return this.setting.questionNumber;
  }


  //Les getters pour les fontSize
  public getFontSizeText() {
    return this.setting.fontSizeText;
  }

  public getFontSizeSubtitle() {
    return this.setting.fontSizeSubtitle;
  }

  public getFontSizeTitle() {
    return this.setting.fontSizeTitle;
  }

  public getFontSizeSubtext() {
    return this.setting.fontSizeSubtext;
  }

  public getFontSizeButton() {
    return this.setting.fontSizeButton;
  }

  public getSelectorSize() {
    return this.setting.selectorSize;
  }

  public getRadioRadius() {
    return this.setting.radioRadius;
  }

  //Getter pour la font style
  public getFontStyle(){
    return this.setting.fontStyle;
  }

  //Getters pour les couleurs
  public getColorBackground() {
    return this.setting.colorBackground;
  }

  public getColorHeader() {
    return this.setting.colorHeader;
  }

  public getColorYes() {
    return this.setting.colorYes;
  }

  public getColorNo() {
    return this.setting.colorNo;
  }

  public getColorButton() {
    return this.setting.colorButton;
  }

  public getColorCard(){
    return this.setting.colorCard;
  }

}
