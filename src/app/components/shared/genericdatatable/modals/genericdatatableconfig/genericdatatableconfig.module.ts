import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GenericDataTableConfigPage } from "./genericdatatableconfig.page";
import { GenericDataTableConfigPageRoutingModule } from "./genericdatatableconfig-routing.module";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, GenericDataTableConfigPageRoutingModule],
	declarations: [GenericDataTableConfigPage],
})
export class GenericDataTableConfigPageModule {}
