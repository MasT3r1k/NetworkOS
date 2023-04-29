import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { Bios } from '../bios';
import { BiosConfig } from '../config';
import { Calendar } from 'src/app/utils/calendarManager';
import { Utils } from 'src/app/utils/NVUtils';

type BiosItemType = 'select' | 'input' | 'info';
type BiosSectionAnimation = 'left' | 'right';
interface BiosItemSelect {
    selected?: string[] | number[];
    seperator?: string;
    values: string[];
    options?: {
      min: number;
      max: number;
      length?: number;
      step: number;
    }[];
}


interface BiosItem {
    text: string;
    type: BiosItemType;
    readonly?: boolean;
    data: BiosItemSelect;
}

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
  BiosPage: number = 0;
  BiosPages: string[] = [];

  selected_item: number = 0;
  editing_item: number | null = null;
  animation: BiosSectionAnimation | null = null;

  public moveTo(page: number) {
    if (this.editing_item != null) return;
    if (this.animation !== null) return;
    if (page == this.BiosPage) return;
    if (page == this.BiosPages.length) return;
    if (!this.BiosPages[page] || !Bios.BiosOptions[page]) return;
    let direction: BiosSectionAnimation = (page < this.BiosPage) ? 'left' : 'right';
    this.animation = direction;
    setTimeout(() => {
      this.BiosPage = page;
      this.selectItem(null);
      this.animation = null;
    }, 350)
  }

  public selectItem(id: number | null) {
    if (this.editing_item != null) return;
    if (id === null) {
      let newId = 0;
      while (Bios.BiosOptions[this.BiosPage].items[newId]) {
        if (Bios.BiosOptions[this.BiosPage].items[newId].readonly !== true) {
          this.selected_item = newId;
          return;
        }
        newId += 1;
      }
    }
    else if (Bios.BiosOptions[this.BiosPage].items[id as number]?.readonly !== true) {
      this.selected_item = id;
    }
  }



  ngOnInit(): void {

    setInterval(() => {
      this.Bios = Bios
    }, 1000)

    Bios.BiosOptions.forEach(item => {
      this.BiosPages.push(item.navbar);
    });

    window.addEventListener("keydown", (e) => {
      let lastItem: number = this.selected_item;
      let newItem: number = this.selected_item;
      switch(e.key) {
        case "ArrowUp":
          while (Bios.BiosOptions[this.BiosPage].items[newItem - 1] && lastItem == this.selected_item) {
            newItem -= 1;
            this.selectItem(newItem);
          }
          break;
        case "ArrowDown":
          while (Bios.BiosOptions[this.BiosPage].items[newItem + 1] && lastItem == this.selected_item) {
            newItem += 1;
            this.selectItem(newItem);
          }
          break;
        case "ArrowLeft":
          this.moveTo(this.BiosPage - 1);
          break;
        case "ArrowRight":
          this.moveTo(this.BiosPage + 1);
          break;
        case "Enter":
          let item = Bios.BiosOptions[this.BiosPage].items[this.selected_item];
          switch(item.type) {
            case "select":
              this.editing_item = this.selected_item;
              break;
          }
          break;
        case "Escape":
          if (this.editing_item != null) {
            this.editing_item = null;
          }
          break;
      }
    })

  }
}
