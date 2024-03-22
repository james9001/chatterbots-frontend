import { Component, HostListener, OnInit } from "@angular/core";
import {
	ApplicationSettingsData,
	ApplicationSettingsDto,
} from "./service/application-settings-data";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
	public settings: ApplicationSettingsDto = {
		promptMaxTokens: "",
		openAiCompatibleEndpoint: "",
	};

	constructor(private appSettingsData: ApplicationSettingsData) {}

	public async ngOnInit(): Promise<void> {
		this.settings = await this.appSettingsData.getApplicationSettings();
	}

	@HostListener("window:settingschange")
	public async getSettingsAgain(): Promise<void> {
		this.settings = await this.appSettingsData.getApplicationSettings();
	}
}
