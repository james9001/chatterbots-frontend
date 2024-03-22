import { Component, OnInit } from "@angular/core";
import { ApplicationStateData, ApplicationState } from "src/app/service/application-state-data";

@Component({
	selector: "app-real-time-status",
	templateUrl: "./real-time-status.component.html",
	styleUrls: ["./real-time-status.component.scss"],
})
export class RealTimeStatusComponent implements OnInit {
	public mainStatus = "DISCONNECTED";
	public detailsText = "";
	public inErrorState = false;

	constructor(private applicationStateData: ApplicationStateData) {}

	ngOnInit() {
		setInterval(this.doStatusCheck, 1000);
	}

	private doStatusCheck = async (): Promise<void> => {
		const status = await this.applicationStateData.getFreshState();
		if (status._status != "DISCONNECTED") {
			await Promise.all([this.applicationStateData.getFreshGenerationExecution()]);
		}
		this.mainStatus = status._status;
		this.inErrorState = status.inErrorState;
		await this.doDetailsTextUpdate(status);
		window.dispatchEvent(new CustomEvent("realtimestatus"));
	};

	private doDetailsTextUpdate = async (status: ApplicationState): Promise<void> => {
		if (status._status == "FREE") {
			this.detailsText = "";
		}
		if (status._status == "DISCONNECTED") {
			this.detailsText = "";
		}
	};
}
