export function PartialPredicate(obj: any, value: any): boolean {
	const str1 = obj.toString().toLowerCase();
	const str2 = value.toString().toLowerCase();
	return str1.includes(str2);
}

export function FullPredicateText(obj: any, value: any): boolean {
	const str1 = obj.toString().toLowerCase();
	const str2 = value.toString().toLowerCase();
	return str1 === str2;
}

export function FullPredicateType(obj: any, value: any): boolean {
	return obj === value;
}

export function SelectPredicate(obj: any, value: any): boolean {
	if (typeof value === 'object') return InArrayPredicate(obj, value);

	return FullPredicateText(obj, value);
}

export function InArrayPredicate(obj: any, value: any): boolean {
	if (typeof value !== 'object') return false;

	return (value as any[]).indexOf(obj) !== -1;
}
