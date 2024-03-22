import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";
import { TimeagoModule } from "ngx-timeago";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ChatroomEnabledTogglerComponent } from "./components/chatroom-enabled-toggler/chatroom-enabled-toggler.component";
import { RealTimeStatusComponent } from "./components/real-time-status/real-time-status.component";

@NgModule({
	declarations: [AppComponent, RealTimeStatusComponent, ChatroomEnabledTogglerComponent],
	imports: [
		BrowserModule,
		TimeagoModule.forRoot(),
		HttpClientModule,
		IonicModule.forRoot(),
		IonicStorageModule.forRoot(),
		AppRoutingModule,
		FormsModule,
	],
	providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule {}
