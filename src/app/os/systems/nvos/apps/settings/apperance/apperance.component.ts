import { Component } from '@angular/core';
import { device } from '../../../system';

interface taskbarTime {
  format: string;
  text: string;
}

@Component({
  selector: 'app-apperance',
  templateUrl: './apperance.component.html',
  styleUrls: ['./apperance.component.css', '../Settings.css']
})
export class ApperanceComponent {
  device = device;

  taskBarTimeOptions: taskbarTime[] = [{
    format: '%h:%m',
    text: 'Kratčí čas'
  }, {
    format: '%h:%m:%s',
    text: 'Delší čas'
  }, {
    format: '%h:%m \n %D.%M.%YY',
    text: 'Kratčí čas + datum'
  }, {
    format: '%h:%m:%s \n %D.%M.%YY',
    text: 'Delší čas + datum'
  }]

}
