import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GenericdataeditPageRoutingModule } from "./genericdataedit-routing.module";

import { GenericdataeditPage } from "./genericdataedit.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, GenericdataeditPageRoutingModule],
	declarations: [GenericdataeditPage],
})
export class GenericdataeditPageModule {}
