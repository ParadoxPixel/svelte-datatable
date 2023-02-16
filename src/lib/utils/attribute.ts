export type Attribute = string | ((value: any) => any);

/**
 * Get attribute at path from object
 * @param obj object
 * @param path dot-separated path
 * @returns object
 */
export function getAttribute(obj: any, path: string) {
	if (!obj || !path) return {};

	const parts = path.split('.');
	for (let i = 0; i < parts.length && obj; i++) obj = obj[parts[i]];

	return obj ?? {};
}

/**
 * Evaluate attribute for object
 * @param obj object
 * @param attribute dot-separated path or function
 * @returns object
 */
export function evalAttribute(obj: any, attribute: Attribute) {
	if (typeof attribute === 'string') return getAttribute(obj, attribute);
	if (typeof attribute === 'function') return attribute(obj);

	return {};
}
