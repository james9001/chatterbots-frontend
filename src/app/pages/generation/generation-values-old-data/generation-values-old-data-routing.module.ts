import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GenerationValuesOldDataPage } from "./generation-values-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: GenerationValuesOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GenerationValuesOldDataPageRoutingModule {}
