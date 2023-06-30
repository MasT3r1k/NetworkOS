import { Component } from '@angular/core';
import { NDevice } from '../../../Main/Device';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css', '../Settings.css']
})
export class DisplayComponent {
  resolution = NDevice.System.getResolution();
  background = NDevice.System.getMainBackground();
}
