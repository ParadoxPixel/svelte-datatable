import type { ColumnSettings, FilterPredicate, FilterSettings } from './settings';
import { PartialPredicate } from './filter';
import TextColumn from '../components/TextColumn.svelte';
import TextFilter from '../components/filters/TextFilter.svelte';
import { evalAttribute } from './attribute';

/**
 * Initialize column settings
 * @param value string or column settings
 */
export function initColumnSettings(value: string | ColumnSettings): ColumnSettings {
	if (typeof value === 'string') {
		value = {
			label: ucFirst(value),
			attribute: value
		};
	}

	value.component ??= TextColumn;
	value.label ??= typeof value.attribute === 'string' ? ucFirst(value.attribute) : '';
	value.sortable ??= true;
	if (typeof value.filter === 'undefined') return value;
	if (typeof value.filter === 'boolean') value.filter = {};

	initFilterSettings(value, value.filter);
	return value;
}

/**
 * Initialize filter settings
 * @param column column settings
 * @param filter filter settings
 */
function initFilterSettings(column: ColumnSettings, filter: FilterSettings) {
	filter.component ??= TextFilter;
	filter.predicate ??= PartialPredicate;
	filter.placeholder ??= 'Search for ' + column.label?.toLowerCase();
}

/**
 * UpperCase First Character
 * @param str string
 */
function ucFirst(str: string): string {
	if (!str) return '';

	return (str.split('.').pop() ?? '')
		.split('_')
		.map((str) => str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase())
		.join(' ');
}

/**
 * Filter data based on column filters
 * @param data array of data
 * @param columns array of columns
 * @param filters array of filter values
 */
export function filter(data: any[], columns: ColumnSettings[], filters: any[]): any[] {
	return data
		.map((row) => {
			return columns.map((column) => evalAttribute(row, column.attribute ?? ''));
		})
		.filter((row) => {
			let column, filterValue;
			for (const index in columns) {
				column = columns[index];
				if (!column.filter) continue;

				filterValue = filters[index];
				if (
					filterValue &&
					!((column.filter as FilterSettings).predicate as FilterPredicate)(row[index], filterValue)
				)
					return false;
			}

			return true;
		});
}

/**
 * Sort data based on sortable columns
 * @param data array of data
 * @param columns array of columns
 * @param sorts array of sorting orders
 */
export function sort(data: any[], columns: ColumnSettings[], sorts: string[]): any[] {
	const nums: number[] = [];
	sorts.forEach((value, index) => {
		if (value === '0') return;

		nums[index] = parseInt(value);
	});

	return Array.from(data).sort((a, b) => {
		for (const index in columns) {
			if (!nums[index]) continue;

			if (a[index] > b[index]) return nums[index];
			if (a[index] < b[index]) return -1 * nums[index];
		}

		return 0;
	});
}

/**
 * Get subset of data with index and size
 * @param data array of data
 * @param index page index
 * @param size page size
 */
export function getPage(data: any[], index: number, size: number): any[] {
	if (index < 1) return [];

	const array = [];
	const start = (index - 1) * size;
	for (let i = start; i < start + size && i < data.length; i++) array.push(data[i]);

	return array;
}
