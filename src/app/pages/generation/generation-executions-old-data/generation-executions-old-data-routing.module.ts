import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GenerationExecutionsOldDataPage } from "./generation-executions-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: GenerationExecutionsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GenerationExecutionsOldDataPageRoutingModule {}
