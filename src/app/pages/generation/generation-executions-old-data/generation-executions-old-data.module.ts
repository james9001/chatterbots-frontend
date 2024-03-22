import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GenerationExecutionsOldDataPageRoutingModule } from "./generation-executions-old-data-routing.module";

import { GenerationExecutionsOldDataPage } from "./generation-executions-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		GenerationExecutionsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [GenerationExecutionsOldDataPage],
})
export class GenerationExecutionsOldDataPageModule {}
