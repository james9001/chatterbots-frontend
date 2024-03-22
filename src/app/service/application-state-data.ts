import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "./connection-data";
import { GenerationExecution } from "../pages/generation/generation-executions-old-data/generation-executions-old-data.page";

/*
TODO: Refactor
*/
@Injectable({
	providedIn: "root",
})
export class ApplicationStateData {
	private state?: ApplicationState;
	private currentGenerationExecution?: GenerationExecution;

	constructor(private http: HttpClient, private connectionData: ConnectionData) {}

	public getCurrentGenerationExecution = async (): Promise<GenerationExecution | undefined> => {
		return this.currentGenerationExecution;
	};

	public getFreshGenerationExecution = async (): Promise<GenerationExecution | undefined> => {
		if (!this.state || this.state.currentGenerationExecutionId < 1) {
			this.currentGenerationExecution = undefined;
			return this.currentGenerationExecution;
		}
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const currentGenerationExecution = await this.http
			.get<GenerationExecution>(
				baseUrl + "/api/data/generation/execution/" + this.state.currentGenerationExecutionId,
				{}
			)
			.toPromise();
		this.currentGenerationExecution = currentGenerationExecution;
		return currentGenerationExecution;
	};

	public getCurrentState = async (): Promise<ApplicationState> => {
		if (!this.state) {
			return this.getFreshState();
		}
		return this.state;
	};

	public getFreshState = async (): Promise<ApplicationState> => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const state = await this.http
				.get<ApplicationState>(baseUrl + "/api/data/state/state", {})
				.toPromise();
			this.state = state;
			return state;
		} catch {
			return {
				id: 0,
				_status: "DISCONNECTED",
				currentGenerationExecutionId: 0,
				inErrorState: false,
				isChatroomEnabled: false,
				charactersCurrentlyTyping: [],
			};
		}
	};
}

export interface ApplicationState {
	id: number;
	_status: string;
	currentGenerationExecutionId: number;
	inErrorState: boolean;
	isChatroomEnabled: boolean;
	charactersCurrentlyTyping: CharacterCurrentlyTyping[];
}

export interface CharacterCurrentlyTyping {
	characterId: number;
}
