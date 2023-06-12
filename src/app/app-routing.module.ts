import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GrubComponent } from './grub/grub.component';
import { BiosComponent } from './bios/NVBios/bios.component';
import { LoadComponent } from './grub/load/load.component';
import { OsComponent } from './os/os.component';

const routes: Routes = [{
  path: '', component: GrubComponent, data: { preload: true }
}, {
  path: 'bios', component: BiosComponent, data: { preload: true }
}, {
  path: 'grub', component: LoadComponent, data: { preload: true }
}, {
  path: 'system/:system', component: OsComponent, data: { preload: true }
}, {
  path: '**', redirectTo: '/'
}];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
