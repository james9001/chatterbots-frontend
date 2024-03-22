import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { PageState } from "src/app/components/shared/abstract-listing-page/abstract-listing-page";
import { ConnectionData } from "src/app/service/connection-data";
import {
	TableIdentifiable,
	IdentifiableDto,
} from "src/app/components/shared/model/viewmodel-interface";

@Component({
	selector: "app-genericdataedit",
	templateUrl: "./genericdataedit.page.html",
	styleUrls: ["./genericdataedit.page.scss"],
})
export class GenericdataeditPage {
	@Input() state!: PageState;
	@Input() model!: TableIdentifiable;
	@Input() undoCopy!: TableIdentifiable;

	constructor(
		private modalCtrl: ModalController,
		private toastController: ToastController,
		public http: HttpClient,
		private connectionData: ConnectionData
	) {}

	public async onClickSave() {
		if (this.model.id > -1) {
			try {
				await this.doUpdate();
				await this.modalCtrl.dismiss({
					dismissed: true,
				});
			} catch (err: unknown) {
				if (err instanceof HttpErrorResponse && err.status == 400) {
					await this.showToastMessage(
						"400 Bad Request while updating. Most likely you tried to change the ID (don't do that)"
					);
				} else {
					await this.showToastMessage("Unrecognised error while updating");
				}
			}
		}
	}

	public async onClickCreate() {
		try {
			await this.doCreate();
			await this.modalCtrl.dismiss({
				dismissed: true,
			});
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse && err.status == 400) {
				await this.showToastMessage("400 Bad Request while creating");
			} else {
				await this.showToastMessage("Unrecognised error while creating");
			}
		}
	}

	public async onClickClose() {
		await this.modalCtrl.dismiss({
			dismissed: true,
		});
	}

	private doUpdate = async (): Promise<void> => {
		const dto = this.state.pageComponent.mapOutgoing(this.model);
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		await this.http
			.put(baseUrl + "/api/data/" + this.state.dataTableConfiguration.apiPath, dto, {})
			.toPromise();
		const updated = await this.http
			.get<IdentifiableDto>(
				`${baseUrl}/api/data/${this.state.dataTableConfiguration.apiPath}/${dto.id}`,
				{}
			)
			.toPromise();
		const identifiableUpdated = this.state.pageComponent.mapIncoming(updated);
		this.state.allModels = this.state.allModels.filter(
			(aModel) => aModel.id !== identifiableUpdated.id
		);
		this.state.allModels.push(identifiableUpdated);
		if (this.state.currentModels.filter((aModel) => aModel.id === identifiableUpdated.id)) {
			this.state.currentModels = this.state.currentModels.filter(
				(aModel) => aModel.id !== identifiableUpdated.id
			);
			this.state.currentModels.push(identifiableUpdated);
		}
	};

	private doCreate = async (): Promise<void> => {
		//This must be where the datatable entity add/remove issue lies.
		const dto = this.state.pageComponent.mapOutgoing(this.model);
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const created = await this.http
			.post<IdentifiableDto>(
				baseUrl + "/api/data/" + this.state.dataTableConfiguration.apiPath,
				dto,
				{}
			)
			.toPromise();
		console.log(`All: ${this.state.allModels.length} Current: ${this.state.currentModels.length}`);
		const identifiableCreated = this.state.pageComponent.mapIncoming(created);
		this.state.allModels = [identifiableCreated, ...this.state.allModels];
		this.state.currentModels = [identifiableCreated, ...this.state.currentModels];
	};

	private doDelete = async (): Promise<void> => {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		await this.http
			.delete(
				baseUrl + "/api/data/" + this.state.dataTableConfiguration.apiPath + "/" + this.model.id,
				{}
			)
			.toPromise();
		this.state.allModels = this.state.allModels.filter((aModel) => aModel.id != this.model.id);
		this.state.currentModels = this.state.currentModels.filter(
			(aModel) => aModel.id != this.model.id
		);
	};

	public async onClickDelete() {
		try {
			await this.doDelete();
			await this.modalCtrl.dismiss({
				dismissed: true,
			});
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse && err.status == 400) {
				await this.showToastMessage(
					"400 Bad Request while deleting. Most likely this entity is still in use"
				);
			} else {
				await this.showToastMessage("Unrecognised error while deleting");
			}
		}
	}

	public async onClickUndo() {
		for (const availableColumn of this.state.dataTableConfiguration.availableColumns) {
			this.model[availableColumn.realName] = this.undoCopy[availableColumn.realName];
		}
	}

	public async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}
}
