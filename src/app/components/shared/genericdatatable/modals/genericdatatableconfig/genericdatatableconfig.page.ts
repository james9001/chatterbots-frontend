import { Component, Input } from "@angular/core";
import { CheckboxCustomEvent, ModalController } from "@ionic/angular";
import { PageState } from "src/app/components/shared/abstract-listing-page/abstract-listing-page";
import { AvailableGenericDataTableColumn } from "src/app/components/shared/model/viewmodel-interface";
import { DatatableData } from "../../datatable-data";

//This thing is bad. Needs rework.
@Component({
	selector: "genericdatatableconfig",
	templateUrl: "./genericdatatableconfig.page.html",
	styleUrls: ["./genericdatatableconfig.page.scss"],
})
export class GenericDataTableConfigPage {
	@Input() state!: PageState;

	constructor(private modalCtrl: ModalController, private dataTableData: DatatableData) {}

	public async dismiss() {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		await this.modalCtrl.dismiss({
			dismissed: true,
		});
	}

	public async onIonChangePageSize(): Promise<void> {
		await this.saveSettingsToStorage();
	}

	public async refreshColumns(aColumn: AvailableGenericDataTableColumn, _event: Event) {
		const event = _event as CheckboxCustomEvent;
		const isCheckedNow = event.target.checked;

		aColumn.shown = isCheckedNow;

		if (aColumn.shown) {
			this.state.dataTableConfiguration.columns = this.state.dataTableConfiguration.availableColumns
				.filter((aCol) => aCol.shown)
				.map((avCol) => {
					return { name: avCol.name };
				});
		} else {
			this.state.dataTableConfiguration.columns = this.state.dataTableConfiguration.columns.filter(
				(col) => {
					return col.name !== aColumn.name;
				}
			);
		}
		await this.saveSettingsToStorage();
	}

	private async saveSettingsToStorage(): Promise<void> {
		return await this.dataTableData.setGenericDataTableConfiguration(
			this.state.dataTableConfiguration
		);
	}
}
