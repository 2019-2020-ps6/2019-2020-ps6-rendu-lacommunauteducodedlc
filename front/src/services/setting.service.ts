import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Setting } from '../models/setting.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {subscribeToIterable} from 'rxjs/internal-compatibility';
import { SettingComponent } from 'src/app/settings/setting/setting.component';

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
                    fontSizeButton : "font-size-basic-button"}
  }

  updateSettings(setting: Setting) {
    this.settings$.next(this.setting);
  }

  //argument : font-size-laMaladie
  changeFontSize(fontSize: String){

    let fontText:String = fontSize+"-text";
    let fontSubtitle:String = fontSize+"-subtitle";
    let fontTitle:String = fontSize+"-title";
    let fontButton:String = fontSize+"-button";
    
    this.setting.fontSizeText = fontText;
    this.setting.fontSizeSubtitle = fontSubtitle;
    this.setting.fontSizeTitle = fontTitle;
    this.setting.fontSizeButton = fontButton;

    this.updateSettings(this.setting);
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

  public getFontSizeButton() {
    return this.setting.fontSizeButton;
  }

}
