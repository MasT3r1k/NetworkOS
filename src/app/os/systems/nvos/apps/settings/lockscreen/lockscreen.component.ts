import { Component } from '@angular/core';
import { device } from '../../../system';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['../display/display.component.css', '../Settings.css']
})
export class LockscreenComponent {
  device = device

}
