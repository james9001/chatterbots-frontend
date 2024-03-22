import { Component } from "@angular/core";
import { Connection, ConnectionData } from "src/app/service/connection-data";
import { ToastController } from "@ionic/angular";
import {
	ApplicationSettingsData,
	ApplicationSettingsDto,
} from "src/app/service/application-settings-data";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
})
export class SettingsPage {
	public connectionModel: Connection = {
		apiBaseUrl: "",
	};

	public applicationSettingsModel: ApplicationSettingsDto = {
		promptMaxTokens: "",
		openAiCompatibleEndpoint: "",
	};

	constructor(
		private connectionData: ConnectionData,
		private toastController: ToastController,
		private applicationSettingsData: ApplicationSettingsData
	) {}

	public async ionViewWillEnter() {
		const connection = await this.connectionData.getConnection();
		this.connectionModel = {
			apiBaseUrl: connection.apiBaseUrl,
		};
		this.applicationSettingsModel = await this.applicationSettingsData.getApplicationSettings();
	}

	private async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	public async onClickSaveMainSettings() {
		try {
			await this.applicationSettingsData.putApplicationSettings(this.applicationSettingsModel);
			await this.showToastMessage("Main Settings saved");
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}

	public async onClickSaveConnectionSettings() {
		try {
			await this.connectionData.setConnection({
				apiBaseUrl: this.connectionModel.apiBaseUrl,
			});
			await this.showToastMessage("Connection Settings saved");
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}
}
