import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';

export interface ArrayableWritable<T, S> extends Writable<S> {
	/**
	 * Get writable as array
	 */
	asArray(): T[];
}

export interface ArrayWritable<T> extends ArrayableWritable<T, T[]> {
	/**
	 * Add items to the array
	 * @param items array of items
	 */
	push(...items: T[]): void;

	/**
	 * Get value at index
	 * @param index index
	 */
	get(index: number): T | undefined;

	/**
	 * Remove first element from the array
	 * @param call callback
	 */
	shift(call: (val: T | undefined) => void): void;

	/**
	 * Remove last element from the array
	 * @param call callback
	 */
	pop(call: (val: T | undefined) => void): void;
}

export interface WritableMap<K, V> extends ArrayableWritable<V, Map<K, V>> {
	/**
	 * Put pair into map
	 * @param key identifier
	 * @param value value
	 */
	put(key: K, value: V): void;

	/**
	 * Delete pair from map
	 * @param key identifier
	 */
	delete(key: K): void;

	/**
	 * Get value from key
	 * @param key identifier
	 */
	get(key: K): V | undefined;
}

/**
 * Wrap a map in a writable
 * @param value map
 */
export function writableMap<K, V>(value: Map<K, V>): WritableMap<K, V> {
	const obj = writable(value) as WritableMap<K, V>;
	obj.asArray = () => Array.from(get(obj).values());
	obj.get = (key) => get(obj).get(key);

	obj.put = (key, value) => {
		obj.update((m) => {
			m.set(key, value);
			return m;
		});
	};

	obj.delete = (key) => {
		obj.update((m) => {
			m.delete(key);
			return m;
		});
	};

	return obj;
}

/**
 * Wrap an array in a writable
 * @param value array
 */
export function writableArray<T>(value: T[]): ArrayWritable<T> {
	const obj = writable(value) as ArrayWritable<T>;
	obj.asArray = () => Array.from(get(obj));

	obj.get = (index: number) => get(obj)[index];

	obj.push = (...items: T[]) => {
		obj.update((array) => {
			array.push(...items);
			return array;
		});
	};

	obj.shift = (call: (val: T | undefined) => void) => {
		obj.update((array) => {
			call(array.shift());
			return array;
		});
	};

	obj.pop = (call: (val: T | undefined) => void) => {
		obj.update((array) => {
			call(array.pop());
			return array;
		});
	};

	return obj;
}
