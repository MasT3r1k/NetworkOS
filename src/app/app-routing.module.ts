import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrubComponent } from './grub/grub.component';
import { BiosComponent } from './bios/NVBios/bios.component';
import { LoadComponent } from './grub/load/load.component';
import { OsComponent } from './os/os.component';

const routes: Routes = [{
  path: '', component: GrubComponent
}, {
  path: 'bios', component: BiosComponent
}, {
  path: 'grub', component: LoadComponent
}, {
  path: 'system/:system', component: OsComponent
}, {
  path: '**', redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
