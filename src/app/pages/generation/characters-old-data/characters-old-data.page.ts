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
	selector: "app-characters",
	templateUrl: "./characters-old-data.page.html",
	styleUrls: ["./characters-old-data.page.scss"],
})
export class CharactersOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "charactersolddata",
				columns: [
					{ name: "Id" },
					{ name: "Created Time" },
					{ name: "Updated Time" },

					{ name: "Name" },
					{ name: "Persona" },
					{ name: "Greeting" },
					{ name: "World Scenario" },
					{ name: "Is Human" },
					{ name: "Is Enabled" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },

					{ name: "Name", shown: true, realName: "name" },
					{ name: "Persona", shown: true, realName: "persona" },
					{ name: "Greeting", shown: true, realName: "greeting" },
					{ name: "World Scenario", shown: true, realName: "worldScenario" },
					{ name: "Is Human", shown: true, realName: "isHuman" },
					{ name: "Is Enabled", shown: true, realName: "isEnabled" },
				],
				apiPath: "characters/character",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableCharacter): Character {
		return {
			id: item.id,
			createdTime: "",
			updatedTime: "",

			name: item.name,
			persona: item.persona,
			greeting: item.greeting,
			worldScenario: item.worldScenario,
			isHuman: item.isHuman,
			isEnabled: item.isEnabled,
		};
	}

	public mapIncoming(item: Character): TableCharacter {
		return {
			id: item.id,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),

			name: item.name,
			persona: item.persona,
			greeting: item.greeting,
			worldScenario: item.worldScenario,
			isHuman: item.isHuman,
			isEnabled: item.isEnabled,
		};
	}

	public getNewTableIdentifiable(): TableCharacter {
		return {
			id: -1,
			createdTime: "",
			updatedTime: "",

			name: "",
			persona: "",
			greeting: "",
			worldScenario: "",
			isHuman: false,
			isEnabled: false,
		};
	}
}

interface TableCharacter extends TableIdentifiable {
	name: string;
	persona: string;
	greeting: string;
	worldScenario: string;
	isHuman: boolean;
	isEnabled: boolean;
}

export interface Character extends IdentifiableDto {
	name: string;
	persona: string;
	greeting: string;
	worldScenario: string;
	isHuman: boolean;
	isEnabled: boolean;
}
