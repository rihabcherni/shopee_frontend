import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isMenuEnabled = new Subject<boolean>();

  constructor() { }
  setMenuState(enabled: boolean) {
    this.isMenuEnabled.next(enabled);
  }
  getMenuState(): Subject<boolean> {
    return this.isMenuEnabled;
  }
}
