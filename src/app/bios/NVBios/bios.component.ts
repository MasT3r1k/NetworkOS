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

  declare BiosPage: number;
  declare BiosPages: string[];
  declare selected_item: number;
  declare editing_item: number | null;
  declare modal_item: string | number;
  declare animation: BiosSectionAnimation | null;

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

  public navigateTo() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.BiosPage = 0;
    this.BiosPages = [];
    this.selected_item = 0;
    this.editing_item = null;
    this.modal_item = 0;
    this.animation = null;
  }

  ngOnInit(): void {

    this.BiosPage = 0;
    this.BiosPages = [];
    this.selected_item = 0;
    this.editing_item = null;
    this.modal_item = 0;
    this.animation = null;

    
    setInterval(() => {
      this.Bios = Bios
    }, 1000)

    Bios.BiosOptions.forEach(item => {
      this.BiosPages.push(item.navbar);
    });

    window.addEventListener("keydown", (e) => {
      let lastItem: number = this.selected_item;
      let newItem: number = this.selected_item;
      if (this.router.url != "/bios") return;
      switch(e.key) {
        case "ArrowUp":
          if (this.editing_item == null) {
            while (Bios.BiosOptions[this.BiosPage].items[newItem - 1] && lastItem == this.selected_item) {
              newItem -= 1;
              this.selectItem(newItem);
            }
          }else{
            let item = this.modal_item;
            if (Bios.BiosOptions[this.BiosPage].items[this.editing_item].data.values?.[item as number - 1]) {
              this.modal_item = item as number - 1;
            }
          }
          break;
        case "ArrowDown":
          if (this.editing_item == null) {
            while (Bios.BiosOptions[this.BiosPage].items[newItem + 1] && lastItem == this.selected_item) {
              newItem += 1;
              this.selectItem(newItem);
            }
          }else {
            let item = this.modal_item;
            if (Bios.BiosOptions[this.BiosPage].items[this.editing_item].data.values?.[item as number + 1]) {
              this.modal_item = item as number + 1;
            }
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
          if (this.editing_item == null) {
            switch(item.type) {
              case "select":
                this.editing_item = this.selected_item;
                this.modal_item = item.data?.selected?.[0] as string | number;
                break;
              case "execute":
                Bios.BiosOptions[this.BiosPage].items[this.selected_item].execute?.forEach(func => {
                  console.log(func());
                  console.log(func)
                });
                if (Bios.BiosOptions[this.BiosPage].items[this.selected_item].exit == true) {
                  this.router.navigate(['/']);
                }
                break;
              default:
                console.error("Enter event is missing.");
                break;
            }
          }else{
            item.data.selected = [this.modal_item as number];
            Bios.data[item.data?.data as string] = this.modal_item as string;
            this.editing_item = null;
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
