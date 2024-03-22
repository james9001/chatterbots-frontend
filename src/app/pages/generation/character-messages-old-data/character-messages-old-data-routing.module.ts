import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CharacterMessagesOldDataPage } from "./character-messages-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: CharacterMessagesOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharacterMessagesOldDataPageRoutingModule {}
