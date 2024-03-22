import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GenericDataTableConfigPage } from "./genericdatatableconfig.page";

const routes: Routes = [
	{
		path: "",
		component: GenericDataTableConfigPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GenericDataTableConfigPageRoutingModule {}
