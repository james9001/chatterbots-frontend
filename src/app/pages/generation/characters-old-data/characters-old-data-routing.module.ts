import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CharactersOldDataPage } from "./characters-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: CharactersOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharactersOldDataPageRoutingModule {}
