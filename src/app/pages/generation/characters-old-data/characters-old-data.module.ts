import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";
import { CharactersOldDataPageRoutingModule } from "./characters-old-data-routing.module";
import { CharactersOldDataPage } from "./characters-old-data.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CharactersOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [CharactersOldDataPage],
})
export class CharactersOldDataPageModule {}
