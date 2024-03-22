import { Directive, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	TableIdentifiable,
	GenericDataTableConfiguration,
	IdentifiableDto,
} from "../model/viewmodel-interface";
import { ConnectionData } from "../../../service/connection-data";
import { DatatableData } from "../genericdatatable/datatable-data";
import { GenericDataTableComponent } from "../genericdatatable/genericdatatable.component";
import { InputCustomEvent, SelectCustomEvent } from "@ionic/angular";

@Directive()
export abstract class AbstractListingPage implements OnInit {
	constructor(
		protected dataTableData: DatatableData,
		public http: HttpClient,
		protected connectionData: ConnectionData
	) {}

	public async ngOnInit(): Promise<void> {
		this.state = this.createState();
		await this.dataTableData.getGenericDataTableConfiguration(this.state.dataTableConfiguration);
	}

	public state: PageState = this.createState();

	@ViewChild(GenericDataTableComponent)
	public dataTable!: GenericDataTableComponent;

	public abstract createState(): PageState;

	public async onClickOpenConfig() {
		await this.dataTable.openConfig();
	}

	public async onClickOpenExisting(clickedId: string) {
		const modelClicked = this.state.allModels.find((model) => model.id == parseInt(clickedId));
		await this.dataTable.openGenericDataEdit(modelClicked!);
	}

	public async onClickAddNew() {
		const newModel = this.getNewTableIdentifiable();
		await this.dataTable.openGenericDataEdit(newModel);
	}

	public async ionViewWillEnter() {
		this.state.isTableHidden = true;
	}

	public abstract mapOutgoing(item: TableIdentifiable): IdentifiableDto;

	public abstract mapIncoming(item: IdentifiableDto): TableIdentifiable;

	public abstract getNewTableIdentifiable(): TableIdentifiable;

	protected async loadData(): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const items = await this.http
			.get<IdentifiableDto[]>(baseUrl + "/api/data/" + this.state.dataTableConfiguration.apiPath, {})
			.toPromise();

		this.state.allModels = [];
		this.state.currentModels = [];
		for (const item of items) {
			this.state.allModels.push(this.mapIncoming(item));
			this.state.currentModels.push(this.mapIncoming(item));
		}
		this.state.isTableHidden = false;
	}

	public async ionViewDidEnter() {
		void this.loadData();
	}

	public updateFilter(field: string, isContains: boolean, _event: Event) {
		const event = _event as InputCustomEvent;
		const value = event.detail.value;
		if (isContains) {
			this.containsFilterMap.set(field, value!);
		} else {
			this.equalsFilterMap.set(field, value!);
		}
		this.triggerFiltering();
	}

	public containsFilterMap: Map<string, string> = new Map();
	public equalsFilterMap: Map<string, string> = new Map();
	public pageFilters: PageFilter[] = [];
	public newFilter: PageFilter = {
		name: "",
		realName: "",
		isContains: false,
	};

	public addNewFilter() {
		console.log(this.newFilter);
		if (this.newFilter.name && this.newFilter.realName) {
			this.pageFilters.push({
				name: this.newFilter.name,
				realName: this.newFilter.realName,
				isContains: this.newFilter.isContains,
			});
			this.newFilter = {
				name: "",
				realName: "",
				isContains: this.newFilter.isContains,
			};
		}
	}

	public toggleContains() {
		this.newFilter.isContains = !this.newFilter.isContains;
	}

	public pickColumn(_event: Event) {
		const event = _event as SelectCustomEvent;
		const value = event.detail.value;
		const availCol = this.state.dataTableConfiguration.availableColumns.filter(
			(col) => col.realName == value
		)[0];
		this.newFilter.name = availCol.name;
		this.newFilter.realName = availCol.realName;
	}

	protected triggerFiltering() {
		this.state.currentModels = [];
		let models = [];
		for (const model of this.state.allModels) {
			models.push(model);
		}
		for (const field of this.containsFilterMap.keys()) {
			models = models.filter((model) => {
				const modelField: string = "" + model[field];
				return modelField.indexOf(this.containsFilterMap.get(field)!) > -1;
			});
		}
		for (const field of this.equalsFilterMap.keys()) {
			models = models.filter((model) => {
				const modelField: string = "" + model[field];
				//Loosely equals, not ===
				return modelField == this.equalsFilterMap.get(field);
			});
		}
		this.state.currentModels = models;
	}
}

export interface PageState {
	allModels: TableIdentifiable[];
	currentModels: TableIdentifiable[];
	dataTableConfiguration: GenericDataTableConfiguration;
	isTableHidden: boolean;
	pageComponent: AbstractListingPage;
}

export interface PageFilter {
	name: string;
	realName: string;
	isContains: boolean;
}
