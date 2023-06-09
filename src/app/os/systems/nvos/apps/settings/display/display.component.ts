import { Component } from '@angular/core';
import { device } from '../../../system';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css', '../Settings.css']
})
export class DisplayComponent {
  device = device
}
