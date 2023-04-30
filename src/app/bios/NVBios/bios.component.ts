import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { Bios } from '../bios';
import { BiosConfig } from '../config';
import { Utils } from 'src/app/utils/NVUtils';

@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.css']
})
export class BiosComponent {
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle("Bios | Network Vision");
  }

  Utils = Utils;

  Bios = Bios
  BiosConfig = BiosConfig;

  ngOnDestroy(): void {
    Bios.reloadBios();
  }

  ngOnInit(): void {

    Bios.reloadBios();

    
    setInterval(() => {
      this.Bios = Bios
    }, 1000)

    Bios.BiosOptions.forEach(item => {
      Bios.BiosPages.push(item.navbar);
    });

    window.addEventListener("keydown", (e) => {
      if (this.router.url != "/bios") return;
      Bios.keyboardEvent(e.key, Bios.selected_item, Bios.selected_item, this.router);
    });

  }

  public runKeyboard(key: string) {
    if (this.router.url != "/bios") return;
    Bios.keyboardEvent(key, Bios.selected_item, Bios.selected_item, this.router);
  }
}
