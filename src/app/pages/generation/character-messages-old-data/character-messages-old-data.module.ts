import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CharacterMessagesOldDataPageRoutingModule } from "./character-messages-old-data-routing.module";

import { CharacterMessagesOldDataPage } from "./character-messages-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CharacterMessagesOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [CharacterMessagesOldDataPage],
})
export class CharacterMessagesOldDataPageModule {}
