import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ChatroomPage } from "./chatroom.page";

import { ChatroomPageRoutingModule } from "./chatroom-routing.module";
import { TimeagoModule } from "ngx-timeago";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ChatroomPageRoutingModule, TimeagoModule],
	declarations: [ChatroomPage],
})
export class ChatroomPageModule {}
