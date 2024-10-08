import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatroomPage } from "./chatroom.page";

const routes: Routes = [
	{
		path: "",
		component: ChatroomPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ChatroomPageRoutingModule {}
