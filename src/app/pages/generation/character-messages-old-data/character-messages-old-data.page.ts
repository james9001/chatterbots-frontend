import { formatDate } from "@angular/common";
import { Component } from "@angular/core";
import {
	AbstractListingPage,
	PageState,
} from "src/app/components/shared/abstract-listing-page/abstract-listing-page";
import {
	IdentifiableDto,
	TableIdentifiable,
} from "src/app/components/shared/model/viewmodel-interface";

@Component({
	selector: "app-character-messages",
	templateUrl: "./character-messages-old-data.page.html",
	styleUrls: ["./character-messages-old-data.page.scss"],
})
export class CharacterMessagesOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "charactermessagesolddata",
				columns: [
					{ name: "Id" },
					{ name: "Created Time" },
					{ name: "Updated Time" },

					{ name: "Recipient Character Id" },
					{ name: "Sending Character Id" },
					{ name: "Message" },
					{ name: "Created Time Timestamp" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },

					{ name: "Recipient Character Id", shown: true, realName: "recipientCharacterId" },
					{ name: "Sending Character Id", shown: true, realName: "sendingCharacterId" },
					{ name: "Message", shown: true, realName: "message" },
					{ name: "Created Time Timestamp", shown: true, realName: "createdTimeTimestamp" },
				],
				apiPath: "character-messages/charactermessage",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableCharacterMessage): CharacterMessage {
		return {
			id: item.id,
			createdTime: "",
			updatedTime: "",

			recipientCharacterId: item.recipientCharacterId,
			sendingCharacterId: item.sendingCharacterId,
			message: item.message,
		};
	}

	public mapIncoming(item: CharacterMessage): TableCharacterMessage {
		return {
			id: item.id,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),

			recipientCharacterId: item.recipientCharacterId,
			sendingCharacterId: item.sendingCharacterId,
			message: item.message,
			createdTimeTimestamp: item.createdTime,
		};
	}

	public getNewTableIdentifiable(): TableCharacterMessage {
		return {
			id: -1,
			createdTime: "",
			updatedTime: "",

			recipientCharacterId: -1,
			sendingCharacterId: -1,
			message: "",
			createdTimeTimestamp: "",
		};
	}
}

interface TableCharacterMessage extends TableIdentifiable {
	recipientCharacterId: number;
	sendingCharacterId: number;
	message: string;
	createdTimeTimestamp: string;
}

export interface CharacterMessage extends IdentifiableDto {
	recipientCharacterId: number;
	sendingCharacterId: number;
	message: string;
}
