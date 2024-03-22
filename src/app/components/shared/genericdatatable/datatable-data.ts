import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { GenericDataTableConfiguration } from "src/app/components/shared/model/viewmodel-interface";

@Injectable({
	providedIn: "root",
})
export class DatatableData {
	private _storage: Storage | null = null;
	constructor(private storage: Storage) {
		void this.init();
	}

	public async setGenericDataTableConfiguration(
		config: GenericDataTableConfiguration
	): Promise<void> {
		if (!this._storage) {
			await this.init();
		}
		return this._storage!.set(
			"GenericDataTableConfiguration_" + config.storagePersistenceKey,
			JSON.stringify(config)
		);
	}

	public async getGenericDataTableConfiguration(
		currentConf: GenericDataTableConfiguration
	): Promise<GenericDataTableConfiguration> {
		if (!this._storage) {
			await this.init();
		}
		return this._storage!.get("GenericDataTableConfiguration_" + currentConf.storagePersistenceKey)
			.then((storedData) => {
				return JSON.parse(storedData);
			})
			.then((savedConf: GenericDataTableConfiguration) => {
				if (savedConf) {
					currentConf.pageSize = savedConf.pageSize ? savedConf.pageSize : currentConf.pageSize;
					currentConf.columns = [];
					currentConf.availableColumns.forEach((currentColumn) => {
						savedConf.availableColumns.forEach((savedColumn) => {
							if (currentColumn.name === savedColumn.name) {
								currentColumn.shown = savedColumn.shown;
								if (savedColumn.shown) {
									currentConf.columns.push({ name: savedColumn.name });
								}
							}
						});
					});
				}
				return currentConf;
			});
	}

	private async init() {
		if (!this._storage) {
			// If using, define drivers here: await this.storage.defineDriver(/*...*/);
			const storage = await this.storage.create();
			this._storage = storage;
		}
	}
}
