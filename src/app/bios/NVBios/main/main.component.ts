import { Component } from '@angular/core';

type BiosItemType = 'select' | 'input';
interface BiosItemSelect {
    selected: string[];
    values: string[];
}

interface BiosItemInput {
  selected: string[];
  values: string[];

}


interface BiosItem {
    text: string;
    type: BiosItemType;
    data: BiosItemSelect | BiosItemInput;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../../bios.css']
})
export class MainComponent {
  public items: BiosItem[] = [
    {
      text: 'System language',
      type: 'select',
      data: {
        selected: ['Czech'],
        values: ['Czech', 'English']
      }
    }];

}
