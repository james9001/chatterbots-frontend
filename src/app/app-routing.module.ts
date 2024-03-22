import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "home",
		loadChildren: () => import("./pages/home/home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "chatroom",
		loadChildren: () =>
			import("./pages/home/chatroom/chatroom.module").then((m) => m.ChatroomPageModule),
	},
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "generation-executions-old-data",
		loadChildren: () =>
			import(
				"./pages/generation/generation-executions-old-data/generation-executions-old-data.module"
			).then((m) => m.GenerationExecutionsOldDataPageModule),
	},
	{
		path: "generation-values-old-data",
		loadChildren: () =>
			import("./pages/generation/generation-values-old-data/generation-values-old-data.module").then(
				(m) => m.GenerationValuesOldDataPageModule
			),
	},
	{
		path: "character-messages",
		loadChildren: () =>
			import("./pages/generation/character-messages-old-data/character-messages-old-data.module").then(
				(m) => m.CharacterMessagesOldDataPageModule
			),
	},
	{
		path: "characters",
		loadChildren: () =>
			import("./pages/generation/characters-old-data/characters-old-data.module").then(
				(m) => m.CharactersOldDataPageModule
			),
	},
	{
		path: "settings",
		loadChildren: () =>
			import("./pages/home/settings/settings.module").then((m) => m.SettingsPageModule),
	},
	{
		path: "**",
		redirectTo: "home",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
