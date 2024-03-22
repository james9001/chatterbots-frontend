import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GenerationValuesOldDataPageRoutingModule } from "./generation-values-old-data-routing.module";

import { GenerationValuesOldDataPage } from "./generation-values-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		GenerationValuesOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [GenerationValuesOldDataPage],
})
export class GenerationValuesOldDataPageModule {}
