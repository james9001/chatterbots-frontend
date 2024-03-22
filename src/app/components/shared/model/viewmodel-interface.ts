export interface TableIdentifiable {
	[key: string]: string | number | boolean;
	id: number;
	createdTime: string;
	updatedTime: string;
}

export interface IdentifiableDto {
	id: number;
	createdTime: string;
	updatedTime: string;
}

export interface GenericDataTableConfiguration {
	storagePersistenceKey: string;
	columns: GenericDataTableColumn[];
	availableColumns: AvailableGenericDataTableColumn[];
	apiPath: string;
	pageSize: number;
}

export interface GenericDataTableColumn {
	name: string;
}

export interface AvailableGenericDataTableColumn {
	name: string;
	shown: boolean;
	realName: string;
}
