import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "./connection-data";

@Injectable({
	providedIn: "root",
})
export class ApplicationSettingsData {
	constructor(private http: HttpClient, private connectionData: ConnectionData) {}

	public async getApplicationSettings(): Promise<ApplicationSettingsDto> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		return this.http
			.get<ApplicationSettingsDto>(baseUrl + "/api/data/settings/settings", {})
			.toPromise();
	}

	public async putApplicationSettings(dto: ApplicationSettingsDto): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		await this.http.put(baseUrl + "/api/data/settings/settings", dto, {}).toPromise();
		window.dispatchEvent(new CustomEvent("settingschange"));
	}
}

export interface ApplicationSettingsDto {
	promptMaxTokens: string;
	openAiCompatibleEndpoint: string;
}
