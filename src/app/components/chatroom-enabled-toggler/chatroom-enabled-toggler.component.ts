import { Component, HostListener } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "src/app/service/connection-data";
import { ApplicationStateData } from "src/app/service/application-state-data";

@Component({
	selector: "app-chatroom-enabled-toggler",
	templateUrl: "./chatroom-enabled-toggler.component.html",
	styleUrls: ["./chatroom-enabled-toggler.component.scss"],
})
export class ChatroomEnabledTogglerComponent {
	public model: ChatroomEnabledToggleDto = {
		isChatroomEnabled: false,
	};

	private updatingToggle = false;

	constructor(
		private http: HttpClient,
		private applicationStateData: ApplicationStateData,
		private connectionData: ConnectionData
	) {}

	@HostListener("window:realtimestatus")
	public realTimeStatusUpdate = async () => {
		if (!this.updatingToggle) {
			const state = await this.applicationStateData.getCurrentState();
			this.model.isChatroomEnabled = state.isChatroomEnabled;
		}
	};

	public onClick = async (): Promise<void> => {
		this.updatingToggle = true;

		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;

		await this.http.put(baseUrl + "/api/chatroom-enabled-toggle/toggle", this.model, {}).toPromise();

		this.updatingToggle = false;
	};
}

interface ChatroomEnabledToggleDto {
	isChatroomEnabled: boolean;
}
