import { Component, OnInit } from '@angular/core';
import { Processes } from '../../Process';
import { device } from '../../system';
import { NetworkLanguages } from '../../locale';
import { config } from './Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public active: number = 0;
  
  device = device;
  Processes = Processes;
  locale = NetworkLanguages;
  Settings = config;

  ngOnInit(): void {
    
  }

}
