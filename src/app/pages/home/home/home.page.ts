import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { ToastController } from "@ionic/angular";
import {
	ApplicationSettingsDto,
	ApplicationSettingsData,
} from "src/app/service/application-settings-data";
import { ApplicationState, ApplicationStateData } from "src/app/service/application-state-data";
import { ConnectionData } from "src/app/service/connection-data";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	public state: ApplicationState = {
		id: 0,
		_status: "UNKNOWN",
		currentGenerationExecutionId: 0,
		inErrorState: false,
		isChatroomEnabled: false,
		charactersCurrentlyTyping: [],
	};
	public settings: ApplicationSettingsDto = {
		promptMaxTokens: "",
		openAiCompatibleEndpoint: "",
	};

	public terminateButtonAvailable = false;

	constructor(
		private toastController: ToastController,
		private applicationStateData: ApplicationStateData,
		public http: HttpClient,
		private connectionData: ConnectionData,
		private applicationSettingsData: ApplicationSettingsData
	) {}

	public async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	@HostListener("window:realtimestatus")
	public realTimeStatusUpdate = async () => {
		this.state = await this.applicationStateData.getCurrentState();
		this.terminateButtonAvailable =
			this.state._status == "DOING_BACKUP" ||
			this.state._status == "DOING_RESTORATION" ||
			(this.state._status == "DOING_UPLOAD" && this.state.currentGenerationExecutionId == -1);
		this.settings = await this.applicationSettingsData.getApplicationSettings();
	};

	public onClickTerminate = async () => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/terminate", {}, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	};
}
