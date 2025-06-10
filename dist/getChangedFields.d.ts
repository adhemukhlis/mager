type PlainObject = Record<string, any>;
declare function getChangedFields<T extends PlainObject>(initial: T, changed: T, include?: string[]): Partial<T>;

export { getChangedFields };
