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
	selector: "app-generation-executions",
	templateUrl: "./generation-executions-old-data.page.html",
	styleUrls: ["./generation-executions-old-data.page.scss"],
})
export class GenerationExecutionsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "generationexecutionsolddata",
				columns: [
					{ name: "Id" },
					{ name: "Generation Values Id" },
					{ name: "Status" },
					{ name: "Prompt" },
					{ name: "Result" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
					{ name: "Completed Time" },
					{ name: "Duration" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Generation Values Id", shown: true, realName: "generationValuesId" },
					{ name: "Status", shown: true, realName: "status" },
					{ name: "Prompt", shown: true, realName: "prompt" },
					{ name: "Result", shown: true, realName: "result" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
					{ name: "Completed Time", shown: true, realName: "completedTime" },
					{ name: "Duration", shown: true, realName: "duration" },
				],
				apiPath: "generation/execution",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableGenerationExecution): GenerationExecution {
		return {
			id: item.id,
			createdTime: "",
			updatedTime: "",
			generationValuesId: item.generationValuesId,
			prompt: item.prompt,
			status: item.status,
			result: item.result,
			completedTime: "",
			duration: item.duration,
		};
	}

	public mapIncoming(item: GenerationExecution): TableGenerationExecution {
		const completedTimePretty = item.completedTime
			? formatDate(item.completedTime, "yyyy-MM-dd h:mm a", "en-US")
			: "";
		return {
			id: item.id,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),

			generationValuesId: item.generationValuesId,
			prompt: item.prompt,
			status: item.status,
			result: item.result,
			completedTime: completedTimePretty,
			duration: "" + Math.round(+item.duration),
		};
	}

	public getNewTableIdentifiable(): TableGenerationExecution {
		return {
			id: -1,
			createdTime: "",
			updatedTime: "",
			generationValuesId: -1,
			prompt: "",
			status: "",
			result: "",
			completedTime: "",
			duration: "",
		};
	}
}

interface TableGenerationExecution extends TableIdentifiable {
	generationValuesId: number;
	prompt: string;
	status: string;
	result: string;
	completedTime: string;
	duration: string;
}

export interface GenerationExecution extends IdentifiableDto {
	generationValuesId: number;
	prompt: string;
	status: string;
	result: string;
	completedTime: string;
	duration: string;
}
