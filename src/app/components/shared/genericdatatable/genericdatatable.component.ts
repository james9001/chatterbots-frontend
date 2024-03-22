import { HttpClient } from "@angular/common/http";
import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ConnectionData } from "src/app/service/connection-data";
import { TableIdentifiable } from "src/app/components/shared/model/viewmodel-interface";
import { PageState } from "../abstract-listing-page/abstract-listing-page";
import { GenericdataeditPage } from "./modals/genericdataedit/genericdataedit.page";
import { GenericDataTableConfigPage } from "./modals/genericdatatableconfig/genericdatatableconfig.page";
import { DatatableComponent, SortType } from "@swimlane/ngx-datatable";

@Component({
	selector: "generic-datatable",
	templateUrl: "./genericdatatable.component.html",
	styleUrls: ["./genericdatatable.component.scss"],
})
export class GenericDataTableComponent implements OnInit {
	//Eventually, experimental mode flag will be removed and all usages will use the new system
	//or not. idk anymore.
	//should remove it
	@Input() experimentalMode?: boolean;
	@Input() page?: SearchPage;
	//end experimental inputs

	@Input() state!: PageState;
	@Input() rows?: TableIdentifiable[];
	@Output() rowClicked = new EventEmitter<string>();
	@Output() setPageFired = new EventEmitter<void>();

	@ViewChild("myTable")
	public table!: DatatableComponent;
	@ViewChild("myGrid")
	public myGrid!: ElementRef;

	public sort: SortType = SortType.multi;

	constructor(
		private modalController: ModalController,
		public http: HttpClient,
		private connectionData: ConnectionData
	) {}

	public async openConfig() {
		const modal = await this.modalController.create({
			component: GenericDataTableConfigPage,
			componentProps: {
				state: this.state,
			},
		});
		void modal.present();
	}

	public async openGenericDataEdit(model: TableIdentifiable) {
		const undoCopy: TableIdentifiable = JSON.parse(JSON.stringify(model));

		const modal = await this.modalController.create({
			component: GenericdataeditPage,
			componentProps: {
				state: this.state,
				model: model,
				undoCopy: undoCopy,
			},
		});
		void modal.present();
	}

	public onActivate() {
		// Do nothing for now
	}

	public onClickOpenEdit(event: Event, row: TableIdentifiable) {
		this.rowClicked.emit(row.id + "");
	}

	public onClickExpand(event: Event, row: TableIdentifiable) {
		//this.rowClicked.emit(row.id + "");
		this.table.rowDetail.toggleExpandRow(row);
	}

	onDetailToggle() {
		//console.log('Detail Toggled', event);
	}

	// public getRowHeight(row: any){
	//   // eslint-disable-next-line @typescript-eslint/no-this-alias
	//   //const theController = this;
	//   console.log(row);
	//   //console.log(theController);

	//   //return that.myGrid.nativeElement.offsetHeight + 30;
	//   //return Promise.resolve(300);
	//   return 300;
	// }

	public ngOnInit() {
		if (this.experimentalMode) {
			void this.setPage({ offset: 0 });
		}
	}

	public async setPage(pageInfo: PageInfo) {
		this.page!.pageNumber = pageInfo.offset!;
		this.setPageFired.emit();
	}
}

export interface SearchCriteria {
	pageSize: number;
	pageNumber: number;
}

export interface SearchPage {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}

export interface SearchResponse<T> {
	data: Array<T>;
	page: SearchPage;
}

interface PageInfo {
	offset?: number;
	pageSize?: number;
	limit?: number;
	count?: number;
}
