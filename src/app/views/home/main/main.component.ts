import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PopupService} from "src/app/shared/services/popup.service"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscribption: Subscription | null = null;

  constructor(private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.subscribption = this.popupService.showPopup$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscribption?.unsubscribe();
  }


}

