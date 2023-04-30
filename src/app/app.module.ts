import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrubComponent } from './grub/grub.component';
import { BiosComponent } from './bios/NVBios/bios.component';
import { OsComponent } from './os/os.component';
import { LoadComponent } from './grub/load/load.component';
import { NvosComponent } from './os/systems/nvos/nvos.component';
import { LoaderComponent } from './os/systems/nvos/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    GrubComponent,
    BiosComponent,
    OsComponent,
    LoadComponent,
    NvosComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
