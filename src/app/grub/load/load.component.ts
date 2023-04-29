import { Component, OnInit } from '@angular/core';
import { Grub } from '../grub';
import { SystemConfig } from 'src/app/utils/systemUtils';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("Grub | Network Vision");
  }

  systems: SystemConfig[] = [];


  ngOnInit(): void {
    Object.values(Grub.GetSystems()).forEach((os, index) => {
      //Todo: Check if system on booting disk
      this.systems.push(os);
    });
    if (this.systems.length == 1) {
      Grub.SelectSystem(this.systems[0].id)
    }
  }

}
