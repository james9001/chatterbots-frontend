import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
	providedIn: "root",
})
export class ConnectionData {
	private _storage: Storage | null = null;

	constructor(private storage: Storage) {
		void this.init();
	}

	public getConnection = async (): Promise<Connection> => {
		if (!this._storage) {
			await this.init();
		}
		let storedConnection: Connection = JSON.parse(await this._storage!.get("connection"));
		if (!storedConnection) {
			await this.setConnection({
				apiBaseUrl: "http://localhost:7009",
			});
			storedConnection = JSON.parse(await this._storage!.get("connection"));
		}
		return storedConnection;
	};

	public setConnection = async (data: Connection): Promise<void> => {
		if (!this._storage) {
			await this.init();
		}
		return this._storage!.set("connection", JSON.stringify(data));
	};

	private async init() {
		if (!this._storage) {
			const storage = await this.storage.create();
			this._storage = storage;
		}
	}
}

export interface Connection {
	apiBaseUrl: string;
}
