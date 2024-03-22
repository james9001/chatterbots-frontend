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
	selector: "app-generation-values",
	templateUrl: "./generation-values-old-data.page.html",
	styleUrls: ["./generation-values-old-data.page.scss"],
})
export class GenerationValuesOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "generationvaluesolddata",
				columns: [
					{ name: "Id" },
					{ name: "Name" },

					{ name: "Max New Tokens" },
					{ name: "Do Sample" },
					{ name: "Temperature" },
					{ name: "Top P" },
					{ name: "Typical P" },
					{ name: "Repetition Penalty" },
					{ name: "Top K" },
					{ name: "Min Length" },
					{ name: "No Repeat Ngram Size" },
					{ name: "Num Beams" },
					{ name: "Penalty Alpha" },
					{ name: "Length Penalty" },
					{ name: "Early Stopping" },
					{ name: "Seed" },
					{ name: "Add BOS Token" },
					{ name: "Truncation Length" },
					{ name: "Ban EOS Token" },
					{ name: "Skip Special Tokens" },

					{ name: "Created Time" },
					{ name: "Updated Time" },

					{ name: "Enabled" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Name", shown: true, realName: "name" },

					{ name: "Max New Tokens", shown: true, realName: "maxNewTokens" },
					{ name: "Do Sample", shown: true, realName: "doSample" },
					{ name: "Temperature", shown: true, realName: "temperature" },
					{ name: "Top P", shown: true, realName: "topP" },
					{ name: "Typical P", shown: true, realName: "typicalP" },
					{ name: "Repetition Penalty", shown: true, realName: "repetitionPenalty" },
					{ name: "Top K", shown: true, realName: "topK" },
					{ name: "Min Length", shown: true, realName: "minLength" },
					{ name: "No Repeat Ngram Size", shown: true, realName: "noRepeatNgramSize" },
					{ name: "Num Beams", shown: true, realName: "numBeams" },
					{ name: "Penalty Alpha", shown: true, realName: "penaltyAlpha" },
					{ name: "Length Penalty", shown: true, realName: "lengthPenalty" },
					{ name: "Early Stopping", shown: true, realName: "earlyStopping" },
					{ name: "Seed", shown: true, realName: "seed" },
					{ name: "Add BOS Token", shown: true, realName: "addBosToken" },
					{ name: "Truncation Length", shown: true, realName: "truncationLength" },
					{ name: "Ban EOS Token", shown: true, realName: "banEosToken" },
					{ name: "Skip Special Tokens", shown: true, realName: "skipSpecialTokens" },

					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },

					{ name: "Enabled", shown: true, realName: "enabled" },
				],
				apiPath: "generationvalues/values",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableGenerationValues): GenerationValues {
		return {
			id: item.id,
			name: item.name,

			maxNewTokens: item.maxNewTokens,
			doSample: item.doSample,
			temperature: item.temperature,
			topP: item.topP,
			typicalP: item.typicalP,
			repetitionPenalty: item.repetitionPenalty,
			topK: item.topK,
			minLength: item.minLength,
			noRepeatNgramSize: item.noRepeatNgramSize,
			numBeams: item.numBeams,
			penaltyAlpha: item.penaltyAlpha,
			lengthPenalty: item.lengthPenalty,
			earlyStopping: item.earlyStopping,
			seed: item.seed,
			addBosToken: item.addBosToken,
			truncationLength: item.truncationLength,
			banEosToken: item.banEosToken,
			skipSpecialTokens: item.skipSpecialTokens,

			createdTime: "",
			updatedTime: "",

			enabled: item.enabled,
		};
	}

	public mapIncoming(item: GenerationValues): TableGenerationValues {
		return {
			id: item.id,
			name: item.name,

			maxNewTokens: item.maxNewTokens,
			doSample: item.doSample,
			temperature: item.temperature,
			topP: item.topP,
			typicalP: item.typicalP,
			repetitionPenalty: item.repetitionPenalty,
			topK: item.topK,
			minLength: item.minLength,
			noRepeatNgramSize: item.noRepeatNgramSize,
			numBeams: item.numBeams,
			penaltyAlpha: item.penaltyAlpha,
			lengthPenalty: item.lengthPenalty,
			earlyStopping: item.earlyStopping,
			seed: item.seed,
			addBosToken: item.addBosToken,
			truncationLength: item.truncationLength,
			banEosToken: item.banEosToken,
			skipSpecialTokens: item.skipSpecialTokens,

			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),

			enabled: item.enabled,
		};
	}

	public getNewTableIdentifiable(): TableGenerationValues {
		return {
			id: -1,
			name: "",

			maxNewTokens: -1,
			doSample: true,
			temperature: "0.5",
			topP: "0.5",
			typicalP: "0.5",
			repetitionPenalty: "0.5",
			topK: -1,
			minLength: -1,
			noRepeatNgramSize: -1,
			numBeams: -1,
			penaltyAlpha: "0.5",
			lengthPenalty: "0.5",
			earlyStopping: false,
			seed: -1,
			addBosToken: true,
			truncationLength: 2048,
			banEosToken: false,
			skipSpecialTokens: true,

			createdTime: "",
			updatedTime: "",

			enabled: false,
		};
	}
}

interface TableGenerationValues extends TableIdentifiable {
	name: string;
	maxNewTokens: number;
	doSample: boolean;
	temperature: string;
	topP: string;
	typicalP: string;
	repetitionPenalty: string;
	topK: number;
	minLength: number;
	noRepeatNgramSize: number;
	numBeams: number;
	penaltyAlpha: string;
	lengthPenalty: string;
	earlyStopping: boolean;
	seed: number;
	addBosToken: boolean;
	truncationLength: number;
	banEosToken: boolean;
	skipSpecialTokens: boolean;
	enabled: boolean;
}

export interface GenerationValues extends IdentifiableDto {
	name: string;
	maxNewTokens: number;
	doSample: boolean;
	temperature: string;
	topP: string;
	typicalP: string;
	repetitionPenalty: string;
	topK: number;
	minLength: number;
	noRepeatNgramSize: number;
	numBeams: number;
	penaltyAlpha: string;
	lengthPenalty: string;
	earlyStopping: boolean;
	seed: number;
	addBosToken: boolean;
	truncationLength: number;
	banEosToken: boolean;
	skipSpecialTokens: boolean;
	enabled: boolean;
}
