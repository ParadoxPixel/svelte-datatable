import type { Attribute } from './attribute';

export interface ColumnSettings {
	component?: any;
	label?: string;
	attribute?: Attribute;
	sortable?: boolean | string;
	filter?: boolean | FilterSettings;
}

export interface FilterSettings {
	component?: any;
	predicate?: FilterPredicate;
	placeholder?: string;
}

export type FilterPredicate = (obj: any, value: any) => boolean;

export interface ColumnData {
	filterValue: any;
	sortAscending: true;
}
