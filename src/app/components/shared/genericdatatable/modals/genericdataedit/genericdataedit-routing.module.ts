import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GenericdataeditPage } from "./genericdataedit.page";

const routes: Routes = [
	{
		path: "",
		component: GenericdataeditPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GenericdataeditPageRoutingModule {}
