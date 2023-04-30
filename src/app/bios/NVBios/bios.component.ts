import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { Bios } from '../bios';
import { BiosConfig } from '../config';
import { Utils } from 'src/app/utils/NVUtils';
import { BiosFlash } from '../biosFlash';

@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.css']
})
export class BiosComponent {
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle("Bios | Network Vision");
  }

  Utils = Utils;            // My own functions for better experience
  Bios = Bios               // Bios implement
  BiosConfig = BiosConfig;  // Bios config
  BiosFlash = BiosFlash;

  ngOnDestroy(): void {
    Bios.reloadBios();      // Reset bios cursor position
    window.removeEventListener("keydown", this.eventKeyboard, true)
  }

  ngOnInit(): void {
    Bios.reloadBios();

    setInterval(() => {
      this.Bios = Bios
    }, 1000)

    window.addEventListener("keydown", this.eventKeyboard, true)

  }

  public eventKeyboard = (e: KeyboardEvent): void => {
    this.runKeyboard(e.key)
  }

  public runKeyboard = (key: string) => {
    if (this.router.url != "/bios") return;
    Bios.keyboardEvent(key, this.router);
  }
}
