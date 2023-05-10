import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public active: number = 0;
  
  public screenInfo: any = {
    width: 0,
    height: 0
  };

  ngOnInit(): void {
    function windowResize()
    {
      let html = document.querySelector("html");
      return {
        width: html?.clientWidth,
        height: html?.clientHeight
      }
    }
    this.screenInfo = windowResize();
    fromEvent(window, 'resize')
    .pipe(debounceTime(200))
    .subscribe(() => {
      this.screenInfo = windowResize();
    });
    
  }

}
