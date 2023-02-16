import type { Attribute } from './attribute';

export interface ColumnSettings {
	class?: any;
	label?: string;
	attribute?: Attribute;
	sortable?: boolean;
	filter?: boolean | FilterSettings;
}

export interface FilterSettings {
	class?: any;
	predicate?: FilterPredicate;
	placeholder?: string;
}

export type FilterPredicate = (obj: any, value: any) => boolean;

export interface ColumnData {
	filterValue: any;
	sortAscending: true;
}
