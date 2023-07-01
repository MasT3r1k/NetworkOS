import { Component } from '@angular/core';
import { sidebar } from './NetworkHome';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-networkhome',
  templateUrl: './networkhome.component.html',
  styleUrls: ['./networkhome.component.css', './main.css']
})
export class NetworkappsComponent {

  public active: number = 0;
  public sidebar = sidebar;
  SettingsComponent = SettingsComponent;

}
