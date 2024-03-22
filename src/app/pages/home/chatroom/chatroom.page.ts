import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ApplicationState, ApplicationStateData } from "src/app/service/application-state-data";
import { ConnectionData } from "src/app/service/connection-data";
import { CharacterMessage } from "../../generation/character-messages-old-data/character-messages-old-data.page";
import { Character } from "../../generation/characters-old-data/characters-old-data.page";

@Component({
	selector: "app-chatroom",
	templateUrl: "chatroom.page.html",
	styleUrls: ["chatroom.page.scss"],
})
export class ChatroomPage {
	public state: ChatroomState = {
		humanMessageEntry: "",
		messageIds: [],
		messageCache: new Map(),
		characterCache: new Map(),
		alreadyClickedLoadAllOlderMessages: false,
		humanCharacter: undefined,
		currentlyTypingCharacters: [],
		autoScrollEnabled: true,
	};

	private applicationState: ApplicationState | undefined;

	@ViewChild("chatArea")
	public chatArea!: ElementRef;

	constructor(
		public http: HttpClient,
		private applicationStateData: ApplicationStateData,
		private connectionData: ConnectionData,
		private toastController: ToastController
	) {}

	public getSendingCharacterName(messageIndicator: MessageIndicatorDto): string {
		return this.state.messageCache.has(messageIndicator.characterMessageId) &&
			this.state.characterCache.has(
				this.state.messageCache.get(messageIndicator.characterMessageId)!.sendingCharacterId
			)
			? this.state.characterCache.get(
					this.state.messageCache.get(messageIndicator.characterMessageId)!.sendingCharacterId
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )!.name
			: "";
	}

	public getCharacterNameFromId(characterId: number): string {
		return this.state.characterCache.has(characterId)
			? this.state.characterCache.get(characterId)!.name
			: "";
	}

	public getMessageText(messageIndicator: MessageIndicatorDto): string {
		return this.state.messageCache.has(messageIndicator.characterMessageId)
			? this.state.messageCache.get(messageIndicator.characterMessageId)!.message
			: "";
	}

	@HostListener("window:realtimestatus")
	public realTimeStatusUpdate = async () => {
		void this.getMessageIndicatorsForLastHour();
		this.applicationState = await this.applicationStateData.getCurrentState();
		this.state.currentlyTypingCharacters = this.applicationState.charactersCurrentlyTyping
			.filter((cctDto) => cctDto.characterId !== 0)
			.map((cctDto) => cctDto.characterId);
		this.state.currentlyTypingCharacters.forEach((characterId) => {
			if (!this.state.characterCache.has(characterId)) {
				void this.populateCharacterCacheForSingle(characterId);
			}
		});
	};

	public async sendHumanMessage(): Promise<void> {
		const messageToSend = this.state.humanMessageEntry;
		this.state.humanMessageEntry = "";

		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		await this.http
			.post(
				baseUrl + "/api/chatroom/humanmessage",
				{
					message: messageToSend,
				},
				{ responseType: "text" }
			)
			.toPromise()
			.catch((err) => {
				if (err.status == 400) {
					void this.showToastMessage(err.error);
				} else {
					void this.showToastMessage("Internal server error!");
				}
			});

		void this.getMessageIndicatorsForLastHour();
	}

	public async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	private async populateHumanCharacter(): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const humanCharacter = await this.http
			.get<Character>(baseUrl + `/api/chatroom/humancharacter`, {})
			.toPromise();
		this.state.humanCharacter = humanCharacter;
	}

	public getHumanName(): string {
		return this.state.humanCharacter ? this.state.humanCharacter.name : "";
	}

	public async ionViewDidEnter(): Promise<void> {
		void this.getMessageIndicatorsForLastHour();
		void this.populateHumanCharacter();
	}

	private async getMessageIndicatorsForLastHour(): Promise<void> {
		const oneHourAgoTimestamp = Date.now() - 60 * 60 * 1000 + "";
		const nowTimestamp = Date.now() + "";

		void this.processMessageIndicatorsForTimestampRange(oneHourAgoTimestamp, nowTimestamp);
	}

	private async processMessageIndicatorsForTimestampRange(from: string, to: string): Promise<void> {
		const messageIndicators = await this.getMessageIndicatorsForRange(from, to);

		const newMessageIndicators = messageIndicators.filter((messageIndicator) => {
			return !this.state.messageIds.find(
				(existingMessageIndicator) =>
					existingMessageIndicator.characterMessageId === messageIndicator.characterMessageId
			);
		});

		void this.populateMessageCache(newMessageIndicators);

		void this.updateStateMessageIndicators(newMessageIndicators);

		setTimeout(() => {
			this.scrollChatAreaToBottomImmediately(this.chatArea, this.state.autoScrollEnabled);
		}, 100);
	}

	private scrollChatAreaToBottomImmediately(chatArea: ElementRef, autoScrollEnabled: boolean) {
		if (autoScrollEnabled) {
			chatArea.nativeElement.scrollTo(0, chatArea.nativeElement.scrollHeight);
		}
	}

	private async updateStateMessageIndicators(
		newMessageIndicators: MessageIndicatorDto[]
	): Promise<void> {
		if (newMessageIndicators.length > 0) {
			this.state.messageIds = this.state.messageIds.concat(newMessageIndicators);
			//Assuming this sort is stable it should be ok
			this.state.messageIds.sort((a, b) => {
				const aa = BigInt(a.created);
				const bb = BigInt(b.created);
				if (aa > bb) {
					return 1;
				} else if (aa < bb) {
					return -1;
				} else {
					return 0;
				}
			});
		}
	}

	private async getMessageIndicatorsForRange(
		from: string,
		to: string
	): Promise<MessageIndicatorDto[]> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		return this.http
			.get<MessageIndicatorDto[]>(baseUrl + `/api/chatroom/messageids/${from}/${to}`, {})
			.toPromise();
	}

	private async populateMessageCache(newMessageIndicators: MessageIndicatorDto[]): Promise<void> {
		newMessageIndicators.forEach(async (newMessageIndicator) => {
			void this.populateMessageCacheForSingle(newMessageIndicator);
		});
	}

	private async populateMessageCacheForSingle(
		newMessageIndicator: MessageIndicatorDto
	): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const characterMessage = await this.http
			.get<CharacterMessage>(
				baseUrl +
					`/api/data/character-messages/charactermessage/${newMessageIndicator.characterMessageId}`,
				{}
			)
			.toPromise();
		this.state.messageCache.set(characterMessage.id, characterMessage);
		if (!this.state.characterCache.has(characterMessage.sendingCharacterId)) {
			void this.populateCharacterCacheForSingle(characterMessage.sendingCharacterId);
		}
	}

	private async populateCharacterCacheForSingle(characterId: number): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const character = await this.http
			.get<Character>(baseUrl + `/api/data/characters/character/${characterId}`, {})
			.toPromise();
		this.state.characterCache.set(characterId, character);
	}

	public async onHumanMessageEntryKeypress(event: KeyboardEvent): Promise<void> {
		if (event.keyCode == 13) {
			void this.sendHumanMessage();
		}
	}

	public async onClickLoadOlderMessages(): Promise<void> {
		this.state.alreadyClickedLoadAllOlderMessages = true;
		const epochZeroTimestamp = "0";
		const nowTimestamp = Date.now() + "";
		void this.processMessageIndicatorsForTimestampRange(epochZeroTimestamp, nowTimestamp);
	}

	public async onClickResetChat(): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const response = await this.http
			.post(baseUrl + "/api/chatroom/reset-chat", {}, { responseType: "text" })
			.toPromise()
			.catch((err) => {
				if (err.status == 400) {
					void this.showToastMessage(err.error);
				} else {
					void this.showToastMessage("Internal server error!");
				}
			});
		if (response) {
			void this.showToastMessage(response);
			this.state.messageIds = [];
		}
	}
}

interface ChatroomState {
	humanMessageEntry: string;
	messageIds: MessageIndicatorDto[];
	messageCache: Map<number, CharacterMessage>;
	characterCache: Map<number, Character>;
	alreadyClickedLoadAllOlderMessages: boolean;
	humanCharacter: Character | undefined;
	currentlyTypingCharacters: number[];
	autoScrollEnabled: boolean;
}

interface MessageIndicatorDto {
	characterMessageId: number;
	created: string; //timestamp
}
