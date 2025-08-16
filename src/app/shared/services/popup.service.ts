import { Injectable } from '@angular/core';
import {map, Observable, tap, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private _showPopup: boolean = false;

  get showPopup$(): Observable<boolean> {
    return timer(10000).pipe(
      map(() => true),
      tap(()=> this._showPopup = true)
    );
  }

  get showPopup() {
    return this._showPopup;
  }

  hidePopup(): void {
    this._showPopup = false;
  }
}
